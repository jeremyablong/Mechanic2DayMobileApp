const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require('axios');
const Order = require("../../../schemas/addToQueue.js");
const { v4: uuidv4 } = require('uuid');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("roadside-assistance-queue");

        const { initial_location, tow_required, tow_desination_information, tow_desination_street_address, requested_by, roadside_service_required } = req.body;

        const newOrder = new Order({
            initial_location, 
            tow_desination_information, 
            tow_desination_street_address, 
            requested_by,
            roadside_service_required,
            tow_required: tow_required,
            id: uuidv4()
        })
        
        newOrder.save((err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);

                res.json({
                    message: "Successfully added to queue!",
                    order: data
                })
            }
        })
    });
});

module.exports = router;