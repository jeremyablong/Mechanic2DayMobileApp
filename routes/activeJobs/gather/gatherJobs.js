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

        const { job } = req.body;

        collection.findOne({ "broken_vehicles_listings.id": job.accepted_job_id }).then((user) => {
            if (user) {

                console.log("UUUUUU", user);

                const broken_vehicles = user.broken_vehicles_listings;

                for (let index = 0; index < broken_vehicles.length; index++) {
                    const broken = broken_vehicles[index];
                    
                    if (broken.id === job.accepted_job_id) {
                        console.log("broken listing", broken);

                        res.json({
                            message: "Success!",
                            vehicle: broken
                        })
                    }
                }
               
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