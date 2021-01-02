const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require('axios');
const SendBird = require('sendbird');

const sb = new SendBird({ appId: config.get("sendbird_app_id") });


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { other, starter, channel_name, chatMessage } = req.body;

        const configgg = {
            headers: {
                "Api-Token": config.get("sendbird_api_token"),
                'Content-Type': 'application/json'
            }
        }
        const data = {
            users: [other, starter]
        };

        sb.connect(starter, (user, error) => {
            if (error) {
                // Handle error.
                console.log("connect err", error);
            } else {
                sb.GroupChannel.createChannelWithUserIds(data.users, true, channel_name, (groupChannel, error) => {
                    if (error) {
                        // Handle error.
                        console.log(error);
                    } else {
                        console.log(groupChannel);
                        groupChannel.sendUserMessage(chatMessage, null, "MESG", (message, error) => {
                            if (error) {
                                // Handle error.    
                                console.log("send message err", error);
                            } else {
                                res.json({
                                    message: "Successfully opened channel and sent private message!"
                                })
                            }
                        });
                    }
                });        
            }
        });
    });
});

module.exports = router;