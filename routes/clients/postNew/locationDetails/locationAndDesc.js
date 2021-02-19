const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require('axios');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { id, title, description, listing, location, manual_entry } = req.body;

        collection.findOne({ unique_id: id }).then(async (user) => {
            if (user) {

                if (user.broken_vehicles_listings) {
                    for (let index = 0; index < user.broken_vehicles_listings.length; index++) {
                        const vehicle_listing = user.broken_vehicles_listings[index];
                        
                        if (vehicle_listing.id === listing.id) {

                            vehicle_listing["title"] = title;
                            vehicle_listing["description"] = description;
                            vehicle_listing["location"] = location;
                            vehicle_listing.page = 3;
                            vehicle_listing["location_manual_entry"] = manual_entry;

                            if (manual_entry === true) {
                                // reverse geocode

                                const headers = {
                                    params: {
                                        key: config.get("mapquest_api"),
                                        street: location.street, 
                                        city: location.city, 
                                        state: location.state,
                                        postalCode: location.zipCode
                                    }
                                };
            
                                axios.get("http://www.mapquestapi.com/geocoding/v1/address", headers).then(async (resolution) => {
                                    console.log(resolution.data);
        
                                    if (resolution.data.results) {

                                        vehicle_listing["location_coordinates"] = {
                                            latitude: resolution.data.results[0].locations[0].latLng.lat,
                                            longitude: resolution.data.results[0].locations[0].latLng.lng
                                        }
                                        vehicle_listing["lookup_coordinates"] = {
                                            id: uuidv4(),
                                            type: "Point",
                                            loc: [resolution.data.results[0].locations[0].latLng.lon, resolution.data.results[0].locations[0].latLng.lat]
                                        }

                                        await collection.save(user);

                                        setTimeout(() => {
                                            res.json({
                                                message: "Successfully added new data to your post!",
                                                listing: vehicle_listing
                                            })
                                        }, 1250);
                                    }
                                }).catch((err) => {
                                    console.log(err);
                                })
                            } else {
                                await collection.save(user);

                                setTimeout(() => {
                                    res.json({
                                        message: "Successfully added new data to your post!",
                                        listing: vehicle_listing
                                    })
                                }, 1250);
                            }

                            console.log("vehicle_listing", vehicle_listing);
                        } 
                    }
                } else {
                    res.json({
                        message: "Could not locate the appropriate listing..."
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