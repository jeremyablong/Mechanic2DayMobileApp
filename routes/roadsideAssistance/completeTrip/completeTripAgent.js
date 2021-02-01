const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const stripe = require('stripe')(config.get("stripeSecretKey"));

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, responseee) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { id, requestee_id } = req.body;

        collection.find({ unique_id: { "$in" : [ id, requestee_id ]}}).toArray((err, users) => {
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
                            
                            user.active_roadside_assistance_job.agree_job_completed = true;
                            user.active_roadside_assistance_job.current_page = "finale-review";

                            collection.save(user);

                            resolve(true);
                        }
                    }
                })

                promiseee.then(async (passedData) => {
                    console.log("resolved.");

                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // tow truck driver - roadside associate
                        if (user.unique_id === requestee_id) {
                            if (passedData === true && user.towing_services_start.agree_job_completed === true) {

                                const charge = await stripe.charges.capture(
                                    user.towing_services_start.charge.id
                                );

                                setTimeout(() => {
                                    responseee.json({
                                        message: "Both users have agreed the job is complete!"
                                    });
                                }, 1500);
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