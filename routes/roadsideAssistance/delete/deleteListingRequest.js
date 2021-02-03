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

        const collection = database.collection("users");

        const { id } = req.body;

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                axios.post(`${config.get("ngrok_url")}/remove/from/queue`, {
                    id
                }).then((response) => {
                    if (response.data.message === "Deleted!") {

                        user.towing_services_start = {};

                        collection.save(user);

                        res.json({
                            message: "Deleted!",
                            user
                        })
                    } else {
                        console.log("ERR", res.data);
                    }
                }).catch((error) => {
                    console.log(error);
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