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

        const { id } = req.body;

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {
                
                if (user.boosts > 0) {
                    axios.post(`${config.get("ngrok_url")}/check/pending/boosted/profile/mechanic`, {
                        id: user.unique_id,
                        user
                    }).then((resolution) => {
                        if (resolution.data.message === "No existing boost and boost was activated!") {
                            console.log(resolution.data);
    
                            
    
                            rresponseeeee.json({
                                message: resolution.data.message
                            })
                        } else if (resolution.data.message === "User is ALREADY boosted and new boost is null and void!") {
    
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