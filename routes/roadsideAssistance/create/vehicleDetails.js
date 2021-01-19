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

        const { id, vehicle_list, passed_data_id } = req.body;

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                for (let index = 0; index < user.roadside_assistance_listings.length; index++) {
                    const listing = user.roadside_assistance_listings[index];
                    if (listing.id === passed_data_id) {

                        listing.tow_trucks_information = vehicle_list;

                        listing.page = "COMPLETE";

                        collection.save(user);

                        res.json({
                            message: "Successfully updated listing vehicle information!",
                            listing
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