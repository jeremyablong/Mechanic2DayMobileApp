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

        const { selected } = req.body;

        collection.remove({ id: selected.id }, (err, results) => {
            if (err) {

                console.log(err);

                res.json({
                    message: "Error occurred...",
                    err
                })
            } else {
                console.log("results", results);
            }
        })
    });
});

module.exports = router;