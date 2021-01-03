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

        const { 
            listing,
            id, 
            category,
            description,
            title
        } = req.body;

        console.log("req.body", req.body);

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                for (let index = 0; index < user.broken_vehicles_listings.length; index++) {
                    
                    const listinggg = user.broken_vehicles_listings[index];

                    if (listinggg.id === listing.id) {

                        if (description !== listinggg.description) {
                            listinggg.description = description;
                        }
                        if (category.length > 0) {
                            listinggg.type_of_repair = category;
                        }
                        if (title !== listinggg.title) {
                            listinggg.title = title;
                        }

                        collection.save(user);

                        res.json({
                            message: "Successfully saved new data!",
                            listing: listinggg
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