const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require('axios');
const _ = require("lodash");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, rresponseeeee) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { id } = req.body;

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {
                
                if (user.boosts > 0) {

                    user.boosts -= 1;

                    collection.save(user);
                    
                    for (let index = 0; index < user.tow_truck_drivers.length; index++) {

                        const driver = user.tow_truck_drivers[index];
                        
                        if (driver.approved === true) {
                            axios.post(`${config.get("ngrok_url")}/promote/driver/temp/checked`, {
                                driver
                            }).then((resolution) => {
                                if (resolution.data.message === "Succcessfully promoted driver!") {
                                    console.log(resolution.data);

                                    if ((user.tow_truck_drivers.length - 1) === index) {
                                        rresponseeeee.json({
                                            message: "Successfully promoted applicable drivers!"
                                        })
                                    }
                                } else if (resolution.data.message === "User is ALREADY registered and boosted!") {
                                    console.log("err", resolution.data);

                                    if ((user.tow_truck_drivers.length - 1) === index) {
                                        rresponseeeee.json({
                                            message: "Successfully promoted applicable drivers!"
                                        })
                                    }
                                }
                            }).catch((errorrrrr) => {
                                console.log(errorrrrr);

                                if ((user.tow_truck_drivers.length - 1) === index) {
                                    rresponseeeee.json({
                                        message: "Successfully promoted applicable drivers!"
                                    })
                                }
                            })
                        } else {
                            console.log("user not approved yet", driver);
                        }
                    }
                } else {
                    rresponseeeee.json({
                        message: "You do not have any boosts to promote your account with, please purchase some and try again."
                    })
                }
            } else {
                rresponseeeee.json({
                    message: "Could not locate the appropriate user..."
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    });
});

module.exports = router;