const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { id, location } = req.body;

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                const new_data = {
                    id: uuidv4(),
                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                    system_date: Date.now(),
                    location,
                    poster: id,
                    page: 2,
                    live: false
                }

                if (user.roadside_assistance_listings) {
                    user.roadside_assistance_listings.push(new_data);
                } else {
                    user["roadside_assistance_listings"] = [new_data];
                }

                collection.save(user);

                res.json({
                    message: "Successfully updated and generated roadside assistance listing!",
                    user
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