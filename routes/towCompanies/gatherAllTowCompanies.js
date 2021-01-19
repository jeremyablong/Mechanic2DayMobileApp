const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const _ = require("lodash");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        collection.distinct("roadside_assistance_listings", (err, results) => {
            if (err) {
                console.log(err);

                res.json({
                    message: "An error occurred...",
                    err
                })
            } else {
                console.log("results", results);

                const new_results = results.filter((item) => {
                    if (item.live === true && item.page === "COMPLETE") {
                        return item;
                    }
                })

                res.json({
                    message: "Successfully gathered all businesses - towing!", 
                    businesses: new_results
                })
            }
        })
    });
});

module.exports = router;