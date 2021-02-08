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

        const { id, gas_delivery_cost, jumpstart_cost, unlock_locked_door_cost, change_tire_cost, remove_stuck_vehicle, price_tier, passed_listing_id } = req.body;

        const { towPrice, tier, perMileFee } = price_tier;

        collection.findOne({ unique_id: id }).then(async (user) => {
            if (user) {

                for (let index = 0; index < user.roadside_assistance_listings.length; index++) {
                    const listing = user.roadside_assistance_listings[index];
                    if (listing.id === passed_listing_id) {

                        listing.services = {
                            gas_delivery_cost, 
                            jumpstart_cost, 
                            unlock_locked_door_cost, 
                            change_tire_cost, 
                            remove_stuck_vehicle,
                        }
                        listing.standard_tow_fees = {
                            tow_price: towPrice, 
                            tier, 
                            currency: "USD",
                            per_mile_fee: perMileFee
                        }
                        listing.page = 6;
                        listing.live = true;

                        await collection.save(user);

                        setTimeout(() => {
                            res.json({
                                message: "Successfully updated listing pricing information!",
                                listing
                            })
                        }, 1000);
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