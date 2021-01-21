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

        const { initial_location, tow_desination_information, tow_desination_street_address, id, roadside_service_required, tow_required } = req.body;

        console.log("req.,body!!!: ", req.body);

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                user.towing_services_start.order_status = "pending";
                user.towing_services_start.page = "waiting-room";
                
                axios.post(`${config.get("ngrok_url")}/add/to/queue`, {
                    initial_location, 
                    tow_desination_information,
                    tow_desination_street_address,
                    requested_by: id,
                    roadside_service_required,
                    tow_required
                }).then((response) => {
                    console.log(response.data);

                    const { order } = response.data;

                    console.log("user.towing_services_start", user.towing_services_start);

                    collection.save(user);
 
                    res.json({
                        message: "Successfully executed logic!",
                        updated_order: user.towing_services_start
                    })
                }).catch((err) => {
                    console.log(err);
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