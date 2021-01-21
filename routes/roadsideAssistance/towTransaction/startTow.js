const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');

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
                    dropoff_location: selected.tow_desination_information,
                    dropoff_location_street: selected.tow_desination_street_address,
                    requestee_picture: selected.profile_picture,
                    requesee_full_name: selected.fullName,
                    requestee_id: selected.requested_by
                };
                const promiseee = new Promise((resolve, reject) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // SIGNED-IN user...
                        if (user.unique_id === signed_in_user_id) {
                            if (user.active_roadside_assistance_job) {
                                user.active_roadside_assistance_job = additional_new_data;
                            } else {
                                user["active_roadside_assistance_jobs"] = additional_new_data;
                            }
    
                            console.log("------- This is the signed-in user (the tow truck driver user after updates) ------- ", user);
    
                            // collection.save(user);

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
                                    }
    
                                    // collection.save(user);
    
                                    console.log("------- This is the other user (the requesting party user after updates) ------- ", user);

                                    return;
                                }
                            }
                        }
                    }
                }).then((morePassedData) => {
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