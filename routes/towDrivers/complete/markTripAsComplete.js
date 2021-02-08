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
    router.post("/", (req, responseeee) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { id, fullName, other_user_id } = req.body;

        collection.find({ unique_id: { "$in": [ id, other_user_id ]}}).toArray((err, users) => {
            if (err) {

                console.log("err", err);

                responseeee.json({
                    err,
                    message: "critical error occurred..."
                })
            } else {

                const promiseee = new Promise((resolve, reject) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // other user - requestee
                        if (user.unique_id === other_user_id) {
                            const configgg = {
                                headers: {
                                    "Authorization": `key=${config.get("firebaseCloudMessagingServerKey")}`,
                                    "Content-Type": "application/json"
                                }
                            }
            
                            const nofitication_addition = {
                                id: uuidv4(),
                                system_date: Date.now(),
                                date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                data: {
                                    title: `The tow truck driver - ${fullName} - marked your trip as "complete".`,
                                    body: `Please confirm that the trip is complete and leave a review for your roadside assistance agent...`
                                },
                                from: id,
                                link: "notifications"
                            };
            
                            axios.post("https://fcm.googleapis.com/fcm/send", {
                                "to": user.firebasePushNotificationToken,
                                "notification": {
                                    "title": `The tow truck driver - ${fullName} - marked your trip as "complete".`,
                                    "body": `Please confirm that the trip is complete and leave a review for your roadside assistance agent...`,
                                    "mutable_content": true,
                                    "sound": "Tri-tone"
                                },
                            "data": {
                                    // use company logo 
                                    "url": `https://s3.us-west-1.wasabisys.com/${config.get("wasabiBucket")}/not-availiable.jpg`,
                                    "dl": "notifications"
                                    // use company logo ^^^^^^^^^^^^^^^^^^^^^^^^^
                                }
                            }, configgg).then((res) => {
            
                                if (user.notifications) {
                                    user.notifications.push(nofitication_addition);
                                } else {
                                    user["notifications"] = [nofitication_addition];
                                }
                                
                                collection.save(user);
            
                                resolve();

                            }).catch((err) => {
                                console.log(err);
                            })
                        }
                    }
                })
                promiseee.then(() => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // tow truck driver - signed in user
                        if (user.unique_id === id) {
                            
                            // user.active_roadside_assistance_job.agree_job_completed = true;
                            user.active_roadside_assistance_job.current_page = "final-manage-dropoff";
    
                            collection.save(user);

                            responseeee.json({
                                message: "Updated account and marked trip as complete for tow truck driver and notifed other user!",
                                user
                            })
                        }
                    }
                })
            }
        })
    });
});

module.exports = router;