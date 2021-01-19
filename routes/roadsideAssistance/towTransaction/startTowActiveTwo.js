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

        const { initial_location, id, roadside_service_required } = req.body;

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                const new_data = {
                    initial_location, 
                    initiator: id, 
                    roadside_service_required,
                    tow_required: false
                }

                if (user.towing_services_start) {
                    user.towing_services_start = new_data;
                } else {
                    user["towing_services_start"] = new_data;
                }

                console.log("user.towing_services_start", user.towing_services_start);
                
                collection.save(user);

                res.json({
                    message: "Started tow process!",
                    tow_services: user.towing_services_start
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