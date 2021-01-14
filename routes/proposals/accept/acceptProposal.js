const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require('axios');
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", async (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { 
            passedData,
            listing,
            id, 
            fullName,
            other_user
        } = req.body;

        collection.findOne({ unique_id: id }).then(async (user) => {
            if (user) {

                const promiseArray = [];

                for (let index = 0; index < user.broken_vehicles_listings.length; index++) {
                    const listinggg = user.broken_vehicles_listings[index];
                    
                    if (listinggg.id === listing.id) {
                        console.log("listinggg", listinggg);

                        for (let idxxx = 0; idxxx < listinggg.applicants_proposals.length; idxxx++) {
                            const proposal = listinggg.applicants_proposals[idxxx];
                            
                            if (proposal.id === passedData.id) {
                                console.log("proposal", proposal);

                                if (user.accepted_jobs) {
                                    user.accepted_jobs.push({
                                        id: uuidv4(),
                                        accepted_job_id: listinggg.id,
                                        agreement_date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                        agreement_system_date: Date.now(),
                                        agreed_amount: proposal.amount,
                                        currency: "$ - USD",
                                        initiator: id,
                                        other_user,
                                        other_user_agrees_completion: false,
                                        poster_agrees_completion: false
                                    })
                                } else {
                                    user["accepted_jobs"] = [{
                                        id: uuidv4(),
                                        accepted_job_id: listinggg.id,
                                        agreement_date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                        agreement_system_date: Date.now(),
                                        agreed_amount: proposal.amount,
                                        currency: "$ - USD",
                                        initiator: id,
                                        other_user,
                                        other_user_agrees_completion: false,
                                        poster_agrees_completion: false
                                    }]
                                }

                                collection.save(user);

                                // api request send acceptance to other user and signed in user
                                axios.post(`${config.get("ngrok_url")}/accept/proposal/individual`, {
                                    proposal,
                                    other: listinggg.poster,
                                    listinggg,
                                    other_user
                                }).then((res) => {
                                    if (res.data) {
                                        console.log(res.data);
                                    }
                                }).catch((err) => {
                                    console.log(err);
                                })
                            } else {
                                
                                // send notification of denial to all other users

                                promiseArray.push(new Promise((resolve, reject) => {
                                    axios.post(`${config.get("ngrok_url")}/denial/proposal/all/other/users`, {
                                        proposal,
                                        fullName,
                                        id
                                    }).then((res) => {
                                        console.log(res.data);
                                        if (res.data) {
                                            resolve();
                                        }
                                    }).catch((err) => {
                                        console.log(err);
                                    })
                                }))
                            }
                        }
                        listinggg.applicants_proposals = [];

                        listinggg.live = "active";

                        collection.save(user);

                        await Promise.all(promiseArray).then((data) => {
                            console.log("dataaaaaaaaaaaaa", data);
        
                            res.json({
                                message: "Succesfully notfied other un-selected users and notified selected user!"
                            })
                        })
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