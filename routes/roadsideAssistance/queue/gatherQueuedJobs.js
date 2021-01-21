const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require('axios');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("roadside-assistance-queues");

        collection.find({}).toArray((err, results) => {
            if (err) {

                res.json({
                    message: "Critical error occurred...",
                    err
                })
            } else {
                res.json({
                    message: "Gathered all items in queue!",
                    results
                })
            }
        });
    });
});

module.exports = router;