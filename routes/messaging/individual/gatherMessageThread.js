const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require('axios');



mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const { channel } = req.query;

        console.log("channel", JSON.parse(channel));

        const parsed = JSON.parse(channel);

        const configgg = {
            headers: {
                "Api-Token": config.get("sendbird_api_token"),
                'Content-Type': 'application/json'
            },
            params: {
                message_ts: Date.now()
            }
        }
        axios.get(`https://api-59615BD6-4F78-4B10-BF4A-587E1403BBD9.sendbird.com/v3/group_channels/${parsed.channel_url}/messages`, configgg).then((resolution) => {
            if (resolution.data) {
                console.log(resolution.data);

                res.json({
                    message: "Successfully gathered thread!",
                    messages: resolution.data
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