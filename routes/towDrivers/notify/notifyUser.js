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
    router.post("/", (req, responseeeeeeeeee) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { id, fullName, profilePic, other_user_id } = req.body;

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                console.log("This is the NOTFIEEEEE user....:", user); 

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
                        title: `Your tow roadside assistance driver - ${fullName} - has arrived at your location!`,
                        body: `Your roadside assistance agent has arrived! If you can't find them - give them a call or message them...`
                    },
                    from: other_user_id,
                    link: "notifications"
                }

                axios.post("https://fcm.googleapis.com/fcm/send", {
                    "to": user.firebasePushNotificationToken,
                    "notification": {
                        "title": `Your tow roadside assistance driver - ${fullName} - has arrived at your location!`,
                        "body": `Your roadside assistance agent has arrived! If you can't find them - give them a call or message them...`,
                        "mutable_content": true,
                        "sound": "Tri-tone"
                    },
                "data": {
                        "url": profilePic !== null ? profilePic : `https://s3.us-west-1.wasabisys.com/${config.get("wasabiBucket")}/not-availiable.jpg`,
                        "dl": "notifications"
                    }
                }, configgg).then((res) => {
                    console.log(res.data);

                    if (user.notifications) {
                        user.notifications.push(nofitication_addition);
                    } else {
                        user["notifications"] = [nofitication_addition];
                    }

                    // user.towing_services_start.order_status = "on-site";
                    // user.towing_services_start.payment_recieved = false;
                    // user.towing_services_start.confirmed_onsite = false;
                    user.towing_services_start.agree_job_completed = false;
                    
                    collection.save(user, (err, data) => {
                        responseeeeeeeeee.json({
                            message: "Notified!",
                            other_user: user
                        })
                    });
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                responseeeeeeeeee.json({
                    message: "Could not locate the appropriate user..."
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    });
});

module.exports = router;