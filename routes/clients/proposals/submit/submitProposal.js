const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require('axios');
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        console.log("req.body", req.body);

        const { other_user_id, signed_in_user_id, bid, cover_letter, listing, fullName, selectedTime } = req.body;

        collection.find({ unique_id: { $in: [ other_user_id, signed_in_user_id ]}}).toArray((err, users) => {
            if (err) {

                console.log("err", err);

                res.json({
                    message: "Could not locate the desired users..",
                    err
                })
            } else {

                const new_data = {
                    id: uuidv4(),
                    system_date: Date.now(),
                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                    data: {
                        title: `${fullName} submitted a proposal for $${bid}! 🤑`,
                        body: `${fullName} said: ${cover_letter.slice(0, 50)}${cover_letter.length > 50 ? "..." : ""}` 
                    },
                    from: signed_in_user_id,
                    link: "notifications"
                };

                const promiseee = new Promise((resolve, reject) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // logic with OTHER USER
                        if (user.unique_id === other_user_id) {
    
                            for (let indexxxxx = 0; indexxxxx < user.broken_vehicles_listings.length; indexxxxx++) {
                                const vehicle = user.broken_vehicles_listings[indexxxxx];
                                
                                if (vehicle.id === listing.id) {
    
                                    const applied_data = {
                                        id: uuidv4(),
                                        date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                        system_date: Date.now(),
                                        applicant: signed_in_user_id,
                                        type: "proposal",
                                        amount: Number(bid),
                                        description: cover_letter,
                                        related: listing.id,
                                        denied: false,
                                        selected_time: selectedTime
                                    }
    
                                    if (user.notifications) {
                                        user.notifications.push(new_data);
                                    } else {
                                        user["notifications"] = [new_data];
                                    };
    
                                    if (vehicle.applicants_proposals) {
                                        vehicle.applicants_proposals.push(applied_data);
                                    } else {
                                        vehicle["applicants_proposals"] = [applied_data];
                                    }
                                }
                            }
                            
                            const configgg = {
                                headers: {
                                    "Authorization": "key=AAAA9zUSz2E:APA91bGvAIR1QhFku2iMGYp_nh6z6nDPRFiwqD6ORRo2vOkYBq8zs61RBFFPxOdVAdqJao98bIu4Y_I8enD-DNY05kyb5Jza1UlHJ4D73aUQuzhEsZ37LNaUgYrW3r8LFpsvdhDMPCMs",
                                    "Content-Type": "application/json"
                                }
                            }
    
                            axios.post("https://fcm.googleapis.com/fcm/send", {
                                "to": user.firebasePushNotificationToken,
                                "notification": {
                                    "title": `${user.fullName} submitted a proposal for $${bid}! 🤑`,
                                    "body": `${user.fullName} said: ${cover_letter.slice(0, 50)}${cover_letter.length > 50 ? "..." : ""}`,
                                    "mutable_content": true,
                                    "sound": "Tri-tone"
                                },
                            "data": {
                                    "url": "https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/7004ba5d-c0ff-4ce7-a02b-47f1aa18a840",
                                    "dl": "notifications"
                                }
                            }, configgg).then((res) => {
                                console.log(res.data);

                                collection.save(user);

                                setTimeout(() => {
                                    resolve();
                                }, 750);
                            }).catch((err) => {
                                console.log(err);
                            })
                        }
                    }
                })

                promiseee.then(() => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // logic with SIGNED-IN user
                        if (user.unique_id === signed_in_user_id) {
    
                            const applied_data = {
                                applied_job_id: listing.id,
                                id: uuidv4(),
                                date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                system_date: Date.now(),
                                other_user_id,
                                type: "proposal",
                                amount: Number(bid),
                                description: cover_letter,
                                accepted: null,
                                selected_time: selectedTime
                            }
    
                            if (user.applied_jobs) {
                                user.applied_jobs.push(applied_data);
                            } else {
                                user["applied_jobs"] = [applied_data];
                            }
    
    
                            collection.save(user);

                            console.log("Saved");
    
                            return;
                        }
                    }
                }).then(() => {
                    console.log("finale");

                    res.json({
                        message: "Successfully submitted the proposal!",
                        users
                    })
                })
            }
        })
    });
});

module.exports = router;