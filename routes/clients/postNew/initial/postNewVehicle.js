const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { id, olderThan81, selectedVehicle, vin, odemeter } = req.body;

        const { make, model, year, fuelType, body, trim, transmission, vehicleType, selectedEngine } = selectedVehicle;

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                const listing = {
                    id: uuidv4(),
                    odemeter,
                    vin: vin.length > 0 ? vin : "None-Provided",
                    poster: id,
                    model, 
                    olderThan81: olderThan81 === true ? "YES" : "NO",
                    year,
                    make, 
                    fuelType, 
                    body, 
                    trim: trim !== null && typeof trim !== "undefined" && trim.length > 0 ? trim : "unknown", 
                    transmission: transmission !== null && typeof transmission !== "undefined" && transmission.length > 0 ? transmission : "unknown", 
                    vehicleType, 
                    selectedEngine,
                    page: 2
                };

                if (user.broken_vehicles_listings) {
                    user.broken_vehicles_listings.push(listing);
                } else {
                    user["broken_vehicles_listings"] = [listing]
                }
                // console.log("AFTER: ", user);
                collection.save(user);

                res.json({
                    message: "Successfully posted new information to DB!",
                    user,
                    listing
                })
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