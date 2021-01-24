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

        const { company_id } = req.query;

        collection.findOne({ unique_id: company_id }).then((user) => {
            if (user) {

                console.log("EMPLOYED BY THIS COMPANY ----- ", user);

                res.json({
                    message: "Gathered company information!",
                    company: user.roadside_assistance_listings[0]
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