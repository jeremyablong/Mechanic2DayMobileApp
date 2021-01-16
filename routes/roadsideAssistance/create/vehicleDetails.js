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

        const { id, year, make, model, trim, transmission, passed_data_id, vehicle_color } = req.body;

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                for (let index = 0; index < user.roadside_assistance_listings.length; index++) {
                    const listing = user.roadside_assistance_listings[index];
                    if (listing.id === passed_data_id) {

                        listing.tow_vehicle_info = {
                            year: year.length > 0 ? year : null, 
                            make: make.length > 0 ? make : null, 
                            model: model.length > 0 ? model : null,  
                            trim: trim.length > 0 ? trim : null, 
                            transmission: transmission.length > 0 ? transmission : null, 
                            color: vehicle_color
                        };

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