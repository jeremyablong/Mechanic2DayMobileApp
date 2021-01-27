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

        const { id, passed_id, drivers } = req.body;

        console.log(req.body);

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                if (user.roadside_assistance_listings) {
                    for (let index = 0; index < user.roadside_assistance_listings.length; index++) {
                        const listinggg = user.roadside_assistance_listings[index];

                        console.log("listing", listinggg);

                        if (listinggg.id === passed_id) {

                            listinggg.drivers = drivers;
                            listinggg.page = 3;

                            collection.save(user);

                            res.json({
                                message: "Found user and updated DL info!",
                                listing: listinggg
                            })
                        }
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