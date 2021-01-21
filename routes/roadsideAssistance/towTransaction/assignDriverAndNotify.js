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

        collection.find({}).toArray((err, results) => {
            if (err) {

                console.log(err);

                res.json({
                    message: "Error occurred...",
                    err
                })
            } else {

                console.log("results", results);

                const removedArray = results.filter((item) => {
                    if (item.id !== selected.id) {
                        return item;
                    }
                });

                axios.post(`${config.get("ngrok_url")}/update/both/users/start/tow`, {
                    signed_in_user_id: id,
                    other_user_id: selected.requested_by,
                    selected
                }).then((res) => {
                    if (res.data.message === "Successfully executed logic!") {
                        // don't console log - cluttering server console
                    } else {
                        console.log("err", res.data);
                    }
                }).catch((err) => {
                    console.log(err);
                })

                console.log("after array", removedArray);


                res.json({
                    message: "Updated both users and started transaction!",
                    results
                })
            }
        })
    });
});

module.exports = router;