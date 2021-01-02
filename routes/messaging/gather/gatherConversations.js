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
    router.get("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { other, starter, channel_name, chatMessage } = req.body;

        const configgg = {
            headers: {
                "Api-Token": config.get("sendbird_api_token"),
                'Content-Type': 'application/json'
            }
        }
        axios.get("https://api-59615BD6-4F78-4B10-BF4A-587E1403BBD9.sendbird.com/v3/group_channels", configgg).then((resolution) => {
            if (resolution.data) {
                console.log(resolution.data);

                res.json({
                    message: "Successfully gathered channels!",
                    channels: resolution.data.channels
                })
            } else {
                console.log("Err", resolution.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    });
});

module.exports = router;