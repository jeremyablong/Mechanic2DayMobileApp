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
    router.post("/", (req, responseeeeeeee) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { id, company_id, profile_pic, fullName } = req.body;

        collection.findOne({ unique_id: company_id }).then((user) => {
            if (user) {

                // this is the COMPANY user
                const configgg = {
                    headers: {
                        "Authorization": `key=${config.get("firebaseCloudMessagingServerKey")}`,
                        "Content-Type": "application/json"
                    }
                }

                const notification_data = {
                    id: uuidv4(),
                    system_date: Date.now(),
                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                    data: {
                        title: `${fullName} is requesting that you approve their account so they can start driving for your tow/roadside assistance company!`,
                        body: `${fullName} wants to be approved to drive for your company. Please manage this request.`
                    },
                    from: id,
                    link: "notifications"
                };

                axios.post("https://fcm.googleapis.com/fcm/send", {
                    "to": user.firebasePushNotificationToken,
                    "notification": {
                        "title": `${fullName} is requesting that you approve their account so they can start driving for your tow/roadside assistance company!`,
                        "body": `${fullName} wants to be approved to drive for your company. Please manage this request.`,
                        "mutable_content": true,
                        "sound": "Tri-tone"
                    },
                "data": {
                        "url": profile_pic !== null ? profile_pic : `https://s3.us-west-1.wasabisys.com/${config.get("wasabiBucket")}/not-availiable.jpg`,
                        "dl": "notifications"
                    }
                }, configgg).then((res) => {

                    console.log(res.data);

                    if (user.notifications) {
                        user.notifications.push(notification_data);
                    } else {
                        user["notifications"] = [notification_data];
                    }

                    collection.save(user);

                    responseeeeeeee.json({
                        message: "Successfully notified employer!"
                    })
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                responseeeeeeee.json({
                    message: "Could not locate the appropriate user..."
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    });
});

module.exports = router;