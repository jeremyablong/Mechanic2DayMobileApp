const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const { decrypt } = require("../../../crypto.js");
const axios = require('axios');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { id } = req.query;

        console.log(id);

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                console.log("user!!!!", user);

                axios.get(`${config.get("ngrok_url")}/address/${decrypt(user.blockchainCredentials.publicKey)}`).then((resolution) => {
                    console.log("resolution", resolution.data);

                    res.json({
                        message: "Gathered balance...!",
                        balance: resolution.data.addressData.addressBalance
                    })
                }).catch((err) => {
                    console.log(err);
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