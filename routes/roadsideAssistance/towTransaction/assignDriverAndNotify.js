const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require('axios');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("roadside-assistance-queues");

        const { id, selected } = req.body;

        console.log("REQUEST BODY,", req.body);

        collection.remove({ id: selected.id }, (err, results) => {
            if (err) {

                console.log(err);

                res.json({
                    message: "Error occurred...",
                    err
                })
            } else {

                console.log("results", results);

                axios.post(`${config.get("ngrok_url")}/update/both/users/start/tow`, {
                    signed_in_user_id: id,
                    other_user_id: selected.requested_by,
                    selected
                }).then((responseeeee) => {
                    if (responseeeee.data.message === "Successfully executed logic!") {
                        // don't console log - cluttering server console
                        res.json({
                            message: "Updated both users and started transaction!",
                            results
                        })
                    } else {
                        console.log("err", responseeeee.data);
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        })
    });
});

module.exports = router;