const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require('axios');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, rresponseeeee) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { id, boost } = req.body;

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {
                
                switch (boost) {
                    case "1-boost":

                        if (user.boosts) {
                            user.boosts += 0;
                        } else {
                            user["boosts"] = 0;
                        }

                        collection.save(user);

                        const promiseee = new Promise((resolve, reject) => {
                            for (let index = 0; index < user.tow_truck_drivers.length; index++) {
                                const driver = user.tow_truck_drivers[index];
                                
                                if (driver.approved === true) {
                                    axios.post(`${config.get("ngrok_url")}/promote/driver/temp`, {
                                        driver
                                    }).then((resolution) => {
                                        if (resolution.data.message === "Succcessfully promoted driver!") {
                                            console.log(resolution.data);

                                            if ((user.tow_truck_drivers.length - 1) === index) {
                                                resolve();
                                            }
                                        } else {
                                            console.log("err", resolution.data);

                                            if ((user.tow_truck_drivers.length - 1) === index) {
                                                resolve();
                                            }
                                        }
                                    }).catch((errorrrrr) => {
                                        console.log(errorrrrr);

                                        if ((user.tow_truck_drivers.length - 1) === index) {
                                            resolve();
                                        }
                                    })
                                } else {
                                    console.log("user not approved yet", driver);
                                }
                            }
                        })
                        promiseee.then((passedData) => {
                            console.log("RESOLVED");

                            rresponseeeee.json({
                                message: "Completed logic!",
                                user
                            })
                        })
                        break;
                    case "2-boosts":
                        
                        if (user.boosts) {
                            user.boosts += 1;
                        } else {
                            user["boosts"] = 1;
                        }

                        collection.save(user);

                        const promiseeeTwo = new Promise((resolve, reject) => {
                            for (let index = 0; index < user.tow_truck_drivers.length; index++) {
                                const driver = user.tow_truck_drivers[index];
                                
                                if (driver.approved === true) {
                                    axios.post(`${config.get("ngrok_url")}/promote/driver/temp`, {
                                        driver
                                    }).then((resolution) => {
                                        if (resolution.data.message === "Succcessfully promoted driver!") {
                                            console.log(resolution.data);

                                            if ((user.tow_truck_drivers.length - 1) === index) {
                                                resolve();
                                            }
                                        } else {
                                            console.log("err", resolution.data);

                                            if ((user.tow_truck_drivers.length - 1) === index) {
                                                resolve();
                                            }
                                        }
                                    }).catch((errorrrrr) => {
                                        console.log(errorrrrr);

                                        if ((user.tow_truck_drivers.length - 1) === index) {
                                            resolve();
                                        }
                                    })
                                } else {
                                    console.log("user not approved yet", driver);
                                }
                            }
                        })
                        promiseeeTwo.then((passedData) => {
                            console.log("RESOLVED");

                            rresponseeeee.json({
                                message: "Completed logic!",
                                user
                            })
                        })
                        break;
                    case "3-boosts":

                        if (user.boosts) {
                            user.boosts += 2;
                        } else {
                            user["boosts"] = 2;
                        };

                        collection.save(user);

                        const promiseeeThree = new Promise((resolve, reject) => {
                            for (let index = 0; index < user.tow_truck_drivers.length; index++) {
                                const driver = user.tow_truck_drivers[index];
                                
                                if (driver.approved === true) {
                                    axios.post(`${config.get("ngrok_url")}/promote/driver/temp`, {
                                        driver
                                    }).then((resolution) => {
                                        if (resolution.data.message === "Succcessfully promoted driver!") {
                                            console.log(resolution.data);

                                            if ((user.tow_truck_drivers.length - 1) === index) {
                                                resolve();
                                            }
                                        } else {
                                            console.log("err", resolution.data);

                                            if ((user.tow_truck_drivers.length - 1) === index) {
                                                resolve();
                                            }
                                        }
                                    }).catch((errorrrrr) => {
                                        console.log(errorrrrr);

                                        if ((user.tow_truck_drivers.length - 1) === index) {
                                            resolve();
                                        }
                                    })
                                } else {
                                    console.log("user not approved yet", driver);
                                }
                            }
                        })
                        promiseeeThree.then((passedData) => {
                            console.log("RESOLVED");

                            rresponseeeee.json({
                                message: "Completed logic!",
                                user
                            })
                        })
                        break;
                    default:
                        break;
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