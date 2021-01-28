const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, responseee) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { id, tow_driver_id } = req.body;

        collection.find({ unique_id: { "$in" : [ id, tow_driver_id ]}}).toArray((err, users) => {
            if (err) {

                console.log(err);

                responseee.json({
                    err, 
                    message: "Critical error occurred while processing request..."
                })

            } else {

                const promiseee = new Promise((resolve, reject) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // signed in user (client)
                        if (user.unique_id === id) {
                            
                            user.towing_services_start.agree_job_completed = true;
                            user.towing_services_start.page = "finale-review";

                            resolve(true);

                            collection.save(user);
                        }
                    }
                })

                promiseee.then((passedData) => {
                    console.log("resolved.");

                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // tow truck driver - roadside associate
                        if (user.unique_id === tow_driver_id) {
                            if (passedData === true && user.active_roadside_assistance_job.agree_job_completed === true) {
                                responseee.json({
                                    message: "Both users have agreed the job is complete!"
                                });
                            } else {
                                responseee.json({
                                    message: "Marked as complete!"
                                })
                            }
                        }
                    }
                })
            }
        })
    });
});

module.exports = router;