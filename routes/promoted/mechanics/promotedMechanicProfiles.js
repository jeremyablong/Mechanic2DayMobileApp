const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("promoted-mechanic-profiles");

        collection.find({}).toArray((err, users) => {
            if (err) {

                res.json({
                    err,
                    message: "Err occurred while gathered promoted tow drivers..."
                })
            } else {
                res.json({
                    message: "Successfully gathered users!",
                    users
                })
            }
        });
    });
});

module.exports = router;