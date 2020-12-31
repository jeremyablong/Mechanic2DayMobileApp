const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { poster_id } = req.body;

        collection.findOne({ "broken_vehicles_listings.poster": poster_id }).then((user) => {
            if (user) {

                delete user.password;
                delete user.email;
                delete user.phoneNumber;
                delete user.wholeAddress;

                res.json({
                    message: "Gathered user!",
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