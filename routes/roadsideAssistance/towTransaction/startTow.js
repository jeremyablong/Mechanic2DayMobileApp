const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { signed_in_user_id, other_user_id, selected } = req.body;

        console.log("------------------------------------------------");

        console.log("req.body", req.body);

        collection.find({ unique_id: {"$in" : [signed_in_user_id, other_user_id]}}).toArray((err, users) => {
            if (err) {

                res.json({
                    message: "Critical Error occurred...",
                    err
                })
            } else {

                const additional_new_data = {
                    id: uuidv4(),
                    start_system_date: Date.now(),
                    start_date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                    pickup_location: selected.initial_location,
                    dropoff_location: selected.tow_desination_information ? selected.tow_desination_information : "tow-not-required",
                    dropoff_location_street: selected.tow_desination_street_address ? selected.tow_desination_street_address : "tow-not-required",
                    requestee_picture: selected.profile_picture,
                    requesee_full_name: selected.fullName,
                    requestee_id: selected.requested_by,
                    active: true
                };
                const promiseee = new Promise((resolve, reject) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // SIGNED-IN user...
                        if (user.unique_id === signed_in_user_id) {
                            if (user.active_roadside_assistance_job) {
                                user.active_roadside_assistance_job = additional_new_data;
                            } else {
                                user["active_roadside_assistance_job"] = additional_new_data;
                            }
    
                            console.log("------- This is the signed-in user (the tow truck driver user after updates) ------- ", user);
    
                            collection.save(user);

                            resolve();
                        }
                    }
                })

                promiseee.then((passedData) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // RECIPEINT USER... other user aka... transaction starter
                        if (user.unique_id === other_user_id) {
                            user.towing_services_start.order_status = "in-progress";
                            user.towing_services_start.page = "mapview-in-progress";
                            
                            for (let indxxxxxx = 0; indxxxxxx < users.length; indxxxxxx++) {
                                const userrr = users[indxxxxxx];
                                if (userrr.unique_id === signed_in_user_id) {
                                    user.towing_services_start.tow_driver_infomation = {
                                        full_name: userrr.fullName,
                                        gender: userrr.gender,
                                        unique_id: userrr.unique_id,
                                        birthdate: userrr.birthdate,
                                        starting_location: userrr.current_location
                                    };

                                    user.towing_services_start.assigned_company = userrr.company_name;

                                    const custom_notification = {
                                        id: uuidv4(),
                                        system_date: Date.now(),
                                        date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                        data: {
                                            title: `${userrr.fullName} has accepted your request and is now on their way to your location!`,
                                            body: `${userrr.fullName} is now headed to your location to assist you with your tow and/or roadside assistance request...`
                                        },
                                        from: signed_in_user_id,
                                        link: "notifications"
                                    };

                                    const configgg = {
                                        headers: {
                                            "Authorization": `key=${config.get("firebaseCloudMessagingServerKey")}`,
                                            "Content-Type": "application/json"
                                        }
                                    }
                    
                                    axios.post("https://fcm.googleapis.com/fcm/send", {
                                        "to": user.firebasePushNotificationToken,
                                        "notification": {
                                            "title": `${userrr.fullName} has accepted your request and is now on their way to your location!`,
                                            "body": `${userrr.fullName} is now headed to your location to assist you with your tow and/or roadside assistance request...`,
                                            "mutable_content": true,
                                            "sound": "Tri-tone"
                                        },
                                    "data": {
                                            "url": userrr.profilePics.length > 0 ? userrr.profilePics[userrr.profilePics.length - 1].full_url : `https://s3.us-west-1.wasabisys.com/${config.get("wasabiBucket")}/not-availiable.jpg`,
                                            "dl": "notifications"
                                        }
                                    }, configgg).then((responseeeeee) => {
                                        console.log(responseeeeee.data);

                                        if (user.notifications) {
                                            user.notifications.push(custom_notification);
                                        } else {
                                            user["notifications"] = [custom_notification];
                                        }
                    
                                        collection.save(user);

                                        console.log("------- This is the other user (the requesting party user after updates) ------- ", user);

                                        return;
                                    }).catch((errorrrrrrr) => {
                                        console.log(errorrrrrrr);
                                    })
                                }
                            }
                        }
                    }
                }).then(() => {
                    console.log("DONE!");

                    res.json({
                        message: "Successfully executed logic!",
                        users
                    })
                })
            }
        })
    });
});

module.exports = router;