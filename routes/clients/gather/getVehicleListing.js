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

        const { listing } = req.body;

        collection.findOne({ "broken_vehicles_listings.id": listing.id }).then((user) => {
            if (user) {
                
                console.log("userrrrrrrrrrrrr", user);

                for (let index = 0; index < user.broken_vehicles_listings.length; index++) {
                    const listingggg = user.broken_vehicles_listings[index];
                    
                    if (listingggg.id === listing.id) {
                        res.json({
                            message: "Successfully gathered listing!",
                            listing: listingggg
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