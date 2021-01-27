const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        collection.distinct("roadside_assistance_listings", (err, listings) => {
            if (err) {

                res.json({
                    message: "Critical error occurred...",
                    err
                })
            } else {
                res.json({
                    message: "Found all the desired listings!",
                    listings
                })
            }
        })
    });
});

module.exports = router;