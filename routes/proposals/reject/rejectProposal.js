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

        const { 
            passedData,
            listing,
            id 
        } = req.body;

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                for (let index = 0; index < user.broken_vehicles_listings.length; index++) {
                    const listinggg = user.broken_vehicles_listings[index];
                    
                    if (listinggg.id === listing.id) {

                        for (let indexxxx = 0; indexxxx < listinggg.applicants_proposals.length; indexxxx++) {
                            const proposal = listinggg.applicants_proposals[indexxxx];
                            
                            if (proposal.id === passedData.id) {

                                listinggg.applicants_proposals.splice(indexxxx, 1);

                                axios.post(`${config.get("ngrok_url")}/notify/user/of/denial`, {
                                    notify_user_id: proposal.applicant,
                                    proposal,
                                    user_that_reject: id,
                                    fullName: user.fullName
                                }).then((res) => {
                                    if (res.data.message === "Successfully notified user!") {
                                        console.log(res.data);
                                    } else {
                                        console.log("Err", res.data);
                                    }
                                }).catch((err) => {
                                    console.log(err);
                                })

                                collection.save(user);

                                res.json({
                                    message: "Successfully deleted proposal!",
                                    user
                                })
                            }
                        }
                    }
                }
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