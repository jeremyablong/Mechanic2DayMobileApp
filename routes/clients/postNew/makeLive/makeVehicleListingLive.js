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

        const { 
            selected,
            repair_timespan,
            min_reviews,
            listing,
            id,
            type_of_repair
        } = req.body;

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                for (let index = 0; index < user.broken_vehicles_listings.length; index++) {
                    const vehicle_listing = user.broken_vehicles_listings[index];
                    
                    if (vehicle_listing.id === listing.id) {
                        
                        vehicle_listing["budget"] = {
                            amount: selected,
                            translation: `${selected} USD`
                        };
                        vehicle_listing["repair_timespan"] = {
                            days: repair_timespan,
                            translation: `Completed within ${repair_timespan} days`
                        };

                        vehicle_listing["min_reviews_to_apply"] = {
                            min: min_reviews,
                            translation: `${min_reviews} Reviews to apply`
                        };
                        vehicle_listing["type_of_repair"] = type_of_repair;

                        vehicle_listing.live = true;

                        collection.save(user);

                        res.json({
                            message: "Successfully posted item, listing is now public!",
                            listing: vehicle_listing
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