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

        const { id } = req.body;

        collection.findOne({ unique_id: id }).then(async (user) => {
            if (user) {

                if (user.accepted_jobs) {
                    
                    const accepted_job_array = [];

                    const promiseArray = [];

                    for (let index = 0; index < user.accepted_jobs.length; index++) {
                        const element = user.accepted_jobs[index];

                        promiseArray.push(new Promise((resolve, reject) => {
                            axios.post(`${config.get("ngrok_url")}/gather/accepted_jobs/details`, {
                                job: element
                            }).then((res) => {
                                if (res.data.message === "Success!") {
                                    console.log("MAjesticAL: ", res.data);
                                    
                                    element.vehicle_data = res.data.vehicle;
                                    
                                    accepted_job_array.push(element);
    
                                    resolve(element);
                                } 
                            }).catch((err) => {
                                console.log(err);
                            })
                        }))
                    };
                    await Promise.all(promiseArray).then((data) => {
                        console.log("dataaaaaaaaaaaaa", data);
    
                        res.json({
                            message: "Gathered active info!",
                            accepted_jobs: data
                        })
                    })
                } else {
                    res.json({
                        message: "Gathered active info!",
                        accepted_jobs: []
                    })
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