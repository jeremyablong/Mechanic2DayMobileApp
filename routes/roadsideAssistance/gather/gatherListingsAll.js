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

        const listings_array = [];

        collection.find({ "roadside_assistance_listings": { $exists: true, $ne: null } }).limit(30).toArray((err, users) => {
            if (err) {

                res.json({
                    err
                })
            } else {

                for (let index = 0; index < users.length; index++) {
                    const user = users[index];
                    
                    for (let indexxxxxx = 0; indexxxxxx < user.roadside_assistance_listings.length; indexxxxxx++) {
                        const listing = user.roadside_assistance_listings[indexxxxxx];
                        
                        if (listing.live === true) {
                            listings_array.push(listing);
                        }

                        if (((users.length - 1) === index) && ((user.roadside_assistance_listings.length - 1) === indexxxxxx)) {
                            res.json({
                                message: "Successfully gathered roadside listings!",
                                listings: listings_array
                            })
                        }
                    }
                }
            }
        })
    });
});

module.exports = router;