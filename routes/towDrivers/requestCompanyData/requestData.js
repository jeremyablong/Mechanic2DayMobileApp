const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require('axios');
const _ = require("lodash");
const fetch = require('node-fetch');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, responseeee) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { id, selected, company_id, company_name } = req.body;

        console.log("CHECK:", req.body);

        collection.findOne({ unique_id: company_id }).then((user) => {
            if (user) {

                for (let index = 0; index < user.roadside_assistance_listings.length; index++) {
                    const listing = user.roadside_assistance_listings[index];
                    
                    if (listing.company_name === company_name) {
                        console.log("company --------- :", listing);
                        
                        if (selected.tow_required === true) {
                            if (_.has(selected.initial_location, "accuracy")) {

                                const body = {};
 
                                fetch(`https://api.tomtom.com/routing/1/calculateRoute/${selected.initial_location.latitude},${selected.initial_location.longitude}:${selected.tow_desination_information.position.lat},${selected.tow_desination_information.position.lon}/json?key=${config.get("tomtomApiKey")}`, {
                                    method: 'get',
                                    headers: { 'Content-Type': 'application/json' },
                                })
                                .then(res => res.json())
                                .then(json => {
                                    console.log(json.routes[0].summary.lengthInMeters);

                                    responseeee.json({
                                        message: "Gathered company info!",
                                        listing,
                                        lengthInMeters: json.routes[0].summary.lengthInMeters
                                    })
                                });
                            } else if (_.has(selected.initial_location, "position")) {

                                const body = {};
 
                                fetch(`https://api.tomtom.com/routing/1/calculateRoute/${selected.initial_location.position.lat},${selected.initial_location.position.lon}:${selected.tow_desination_information.position.lat},${selected.tow_desination_information.position.lon}/json?key=${config.get("tomtomApiKey")}`, {
                                    method: 'get',
                                    headers: { 'Content-Type': 'application/json' },
                                })
                                .then(res => res.json())
                                .then(json => {
                                    console.log(json.routes[0].summary.lengthInMeters);

                                    responseeee.json({
                                        message: "Gathered company info!",
                                        listing,
                                        lengthInMeters: json.routes[0].summary.lengthInMeters
                                    })
                                });
                            }
                        }
                    }
                }
            } else {
                responseeee.json({
                    message: "Could not locate the appropriate user..."
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    });
});

module.exports = router;