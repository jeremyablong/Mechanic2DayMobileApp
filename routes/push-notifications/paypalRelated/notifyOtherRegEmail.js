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

        const { id, fullName, other_user_id, profile_pic } = req.body;

        collection.findOne({ unique_id: other_user_id }).then((user) => {
            if (user) {

                if (user.firebasePushNotificationToken) {
                    const configgg = {
                        headers: {
                            "Authorization": "key=AAAA9zUSz2E:APA91bGvAIR1QhFku2iMGYp_nh6z6nDPRFiwqD6ORRo2vOkYBq8zs61RBFFPxOdVAdqJao98bIu4Y_I8enD-DNY05kyb5Jza1UlHJ4D73aUQuzhEsZ37LNaUgYrW3r8LFpsvdhDMPCMs",
                            "Content-Type": "application/json"
                        }
                    }
    
                    axios.post("https://fcm.googleapis.com/fcm/send", {
                        "to": user.firebasePushNotificationToken,
                        "notification": {
                            "title": `${fullName} is trying to send you a payment but you have not registered a PayPal email yet...`,
                            "body": `Please register a PayPal email before continuing with the payment for a repair you're involved with. Adding a PayPal account is instantanious.`,
                            "mutable_content": true,
                            "sound": "Tri-tone"
                        },
                    "data": {
                            "url": profile_pic !== null ? profile_pic : "https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/not-availiable.jpg",
                            "dl": "notifications"
                        }
                    }, configgg).then((res) => {
                        console.log(res.data);
    
                        res.json({
                            message: "Notified User!"
                        })
                    }).catch((err) => {
                        console.log(err);
                    })
                } else {
                    const new_data_modify = {
                        id: uuidv4(),
                        system_date: Date.now(),
                        date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                        data: {
                            title: `${fullName} is trying to send you a payment but you have not registered a PayPal email yet...`,
                            body: `Please register a PayPal email before continuing with the payment for a repair you're involved with. Adding a PayPal account is instantanious.`
                        },
                        from: id,
                        link: "notifications"
                    };
                    if (user.notifications) {
                        user.notifications.push(new_data_modify)
                    } else {
                        user["notifications"] = [new_data_modify];
                    }

                    collection.save(user);

                    res.json({
                        message: "Notified User!"
                    })
                }
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