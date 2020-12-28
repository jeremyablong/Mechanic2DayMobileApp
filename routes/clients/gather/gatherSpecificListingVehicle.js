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

        const { listing_id, id } = req.body;

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                if (user.broken_vehicles_listings) {
                    for (let index = 0; index < user.broken_vehicles_listings.length; index++) {
                        const listing = user.broken_vehicles_listings[index];

                        if (listing.id === listing_id) {
                            console.log("listing", listing);

                            res.json({
                                message: "Successfully gathered listing!",
                                listing
                            })
                        }
                        
                    }
                } else {
                    res.json({
                        message: "Could not locate, broken vehcile array doesnt exist!"
                    })
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