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
                        "Authorization": "key=AAAA9zUSz2E:APA91bGvAIR1QhFku2iMGYp_nh6z6nDPRFiwqD6ORRo2vOkYBq8zs61RBFFPxOdVAdqJao98bIu4Y_I8enD-DNY05kyb5Jza1UlHJ4D73aUQuzhEsZ37LNaUgYrW3r8LFpsvdhDMPCMs",
                        "Content-Type": "application/json"
                    }
                }

                const nofitication_addition = {
                    id: uuidv4(),
                    system_date: Date.now(),
                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                    data: {
                        title: null,
                        body: null
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
                        "url": profilePic !== null ? profilePic : "https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/not-availiable.jpg",
                        "dl": "notifications"
                    }
                }, configgg).then((res) => {
                    console.log(res.data);

                    if (user.notifications) {
                        user.notifications.push(nofitication_addition);
                    } else {
                        user["notifications"] = [nofitication_addition];
                    }

                    // collection.save(user);

                    responseeeeeeeeee.json({
                        message: "Notified!"
                    })
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