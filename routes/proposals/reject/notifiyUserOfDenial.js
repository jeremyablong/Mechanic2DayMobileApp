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

        const { proposal, notify_user_id, user_that_reject, fullName } = req.body;

        collection.findOne({ unique_id: notify_user_id }).then((user) => {
            if (user) {

                const notify_obj = {
                    id: uuidv4(),
                    system_date: Date.now(),
                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                    data: {
                        title: `${fullName} rejected your proposal to a job you applied for 😖`,
                        body: `${fullName} rejected your application/proposal to fix their vehicle. This could be for many different reasons, good luck on your future proposals!`
                    },
                    from: user_that_reject,
                    link: "proposals"
                }

                if (user.notifications) {
                    user.notifications.push(notify_obj)
                } else {
                    user["notifications"] = [notify_obj];
                }

                const configgg = {
                    headers: {
                        "Authorization": `key=${config.get("firebaseCloudMessagingServerKey")}`,
                        "Content-Type": "application/json"
                    }
                }

                axios.post("https://fcm.googleapis.com/fcm/send", {
                    "to": user.firebasePushNotificationToken,
                    "notification": {
                        "title": `${fullName} rejected your proposal to a job you applied for 😖`,
                        "body": `${fullName} rejected your application/proposal to fix their vehicle. This could be for many different reasons, good luck on your future proposals!`,
                        "mutable_content": true,
                        "sound": "Tri-tone"
                    },
                   "data": {
                        "url": proposal.profilePic ? proposal.profilePic : `https://s3.us-west-1.wasabisys.com/${config.get("wasabiBucket")}/not-availiable.jpg`,
                        "dl": "notifications"
                    }
                }, configgg).then((res) => {
                    console.log(res.data);
                }).catch((err) => {
                    console.log(err);
                })

                console.log("user.notifications", user.notifications);

                collection.save(user);

                res.json({
                    message: "Successfully notified user!",
                    user
                })
            } else {
                res.json({
                    message: "Could not locate the appropriate user..."
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    });
});

module.exports = router;