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

        // id === logged in users ID
        // listing === current selected listing
        // updatedLocation === new location

        const { listing, id, updated_location } = req.body;

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                for (let index = 0; index < user.broken_vehicles_listings.length; index++) {
                    
                    const broken_listing = user.broken_vehicles_listings[index];

                    if (broken_listing.id === listing.id) {

                        console.log("broken_listing", broken_listing);

                        broken_listing.location = updated_location;

                        collection.save(user);

                        res.json({
                            message: "Successfully updated listing location!",
                            broken_listing
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