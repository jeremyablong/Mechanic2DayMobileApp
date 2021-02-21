const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const _ = require("lodash");
const geodist = require("geodist");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { current_location } = req.body;

        // { "broken_vehicles_listings.live": true }
        collection.ensureIndex({
            "broken_vehicles_listings.lookup_coordinates.loc": "2dsphere"
        });

        // collection.dropIndexes();

        collection.find({ "broken_vehicles_listings.lookup_coordinates.loc": { $near: { $geometry: { type: "Point" , coordinates: [current_location.longitude, current_location.latitude] }, $maxDistance: 5000 }}}).toArray((err, results) => {
            if (err) {
                console.log(err);

                res.json({
                    message: "An error occurred...",
                    err
                })
            } else {
                console.log("results", results);

                const listing_array = [];

                const shuffled = _.shuffle(results);

                const promiseeee = new Promise((resolve, reject) => {
                    if (shuffled.length > 0) {
                        for (let index = 0; index < shuffled.length; index++) {
                            const element = shuffled[index];
    
                            for (let indexxxx = 0; indexxxx < element.broken_vehicles_listings.length; indexxxx++) {
                                const list = element.broken_vehicles_listings[indexxxx];
                                
                                if (list.live === true) {
                                    listing_array.push(list);
    
                                    if ((shuffled.length - 1) === index) {
                                        resolve(listing_array);
                                    }
                                } else {
                                    if ((shuffled.length - 1) === index) {
                                        resolve(listing_array);
                                    }
                                }
                            }
                        }
                    } else {
                        resolve([]);
                    }
                })

                promiseeee.then((dataaa) => {
                    res.json({
                        message: "Successfully gathered the desired listings!", 
                        listings: dataaa
                    })
                })
            }
        })
    });
});

module.exports = router;