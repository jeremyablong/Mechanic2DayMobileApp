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

                        axios.post(`${config.get("ngrok_url")}/check/pending/boosted/profile/mechanic`, {
                            id: user.unique_id
                        }).then((resolution) => {
                            if (resolution.data.message === "No existing boost and boost was activated!") {
                                console.log(resolution.data);

                                if (user.boosts) {
                                    user.boosts += 0;
                                } else {
                                    user["boosts"] = 0;
                                }
        
                                collection.save(user);

                                rresponseeeee.json({
                                    message: resolution.data.message
                                })
                            } else if (resolution.data.message === "User is ALREADY boosted and new boost is null and void!") {

                                if (user.boosts) {
                                    user.boosts += 1;
                                } else {
                                    user["boosts"] = 1;
                                }
        
                                collection.save(user);

                                rresponseeeee.json({
                                    message: "User account is already boosted and you cannot double boost!"
                                })
                            } else {
                                console.log("err", resolution.data);

                                rresponseeeee.json({
                                    message: resolution.data.message,
                                    error: "Critical error..."
                                })
                            }
                        }).catch((errorrrr) => {
                            console.log(errorrrr);
                        })
                        break;
                    case "3-boosts":
                        
                        axios.post(`${config.get("ngrok_url")}/check/pending/boosted/profile/mechanic`, {
                            id: user.unique_id
                        }).then((resolution) => {
                            if (resolution.data.message === "No existing boost and boost was activated!") {
                                console.log(resolution.data);

                                if (user.boosts) {
                                    user.boosts += 2;
                                } else {
                                    user["boosts"] = 2;
                                }
        
                                collection.save(user);

                                rresponseeeee.json({
                                    message: resolution.data.message
                                })
                            } else if (resolution.data.message === "User is ALREADY boosted and new boost is null and void!") {

                                if (user.boosts) {
                                    user.boosts += 3;
                                } else {
                                    user["boosts"] = 3;
                                }
        
                                collection.save(user);

                                rresponseeeee.json({
                                    message: "User account is already boosted and you cannot double boost!"
                                })
                            } else {
                                console.log("err", resolution.data);

                                rresponseeeee.json({
                                    message: resolution.data.message,
                                    error: "Critical error..."
                                })
                            }
                        }).catch((errorrrr) => {
                            console.log(errorrrr);
                        })
                        break;
                    case "5-boosts":

                        axios.post(`${config.get("ngrok_url")}/check/pending/boosted/profile/mechanic`, {
                            id: user.unique_id
                        }).then((resolution) => {
                            if (resolution.data.message === "No existing boost and boost was activated!") {
                                console.log(resolution.data);

                                if (user.boosts) {
                                    user.boosts += 4;
                                } else {
                                    user["boosts"] = 4;
                                }
        
                                collection.save(user);

                                rresponseeeee.json({
                                    message: resolution.data.message
                                })
                            } else if (resolution.data.message === "User is ALREADY boosted and new boost is null and void!") {

                                if (user.boosts) {
                                    user.boosts += 5;
                                } else {
                                    user["boosts"] = 5;
                                }
        
                                collection.save(user);

                                rresponseeeee.json({
                                    message: "User account is already boosted and you cannot double boost!"
                                })
                            } else {
                                console.log("err", resolution.data);

                                rresponseeeee.json({
                                    message: resolution.data.message,
                                    error: "Critical error..."
                                })
                            }
                        }).catch((errorrrr) => {
                            console.log(errorrrr);
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