const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const request = require('request');
const axios = require('axios');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, ressssss) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { id, vehicle, agreement, paypal_access_token, reference_id, transaction_id, other_user_id } = req.body;

        collection.find({ unique_id: { "$in" : [ id, other_user_id ]}}).toArray((err, users) => {
            if (err) {
                console.log("err", err);
            } else {
                for (let indexxxxxxx = 0; indexxxxxxx < users.length; indexxxxxxx++) {
                    const user = users[indexxxxxxx];

                    if (user.unique_id === id) {
                        // logged in user
                        for (let index = 0; index < user.accepted_jobs.length; index++) {
                            const accepted_job = user.accepted_jobs[index];

                            if (accepted_job.accepted_job_id === vehicle.id) {
        
                                accepted_job.other_user_agrees_completion = true;
        
                                collection.save(user);
        
                                console.log("accepted", accepted_job);
        
                                if (accepted_job.other_user_agrees_completion === true && accepted_job.poster_agrees_completion === true) {
                                    // run logic to RELEASE FUNDS.
                                    const configgg = {
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${paypal_access_token}`
                                        }
                                    }
            
                                    axios.get(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${accepted_job.paypal_order_id}`, configgg).then((res) => {
                                        console.log(res.data);
            
                                        const headers = {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${paypal_access_token}`
                                        };
                                        
                                        const dataString = `{}`;
                                        
                                        const options = {
                                            url: `https://api-m.sandbox.paypal.com/v2/checkout/orders/order_id/capture`,
                                            method: 'POST',
                                            headers: headers,
                                            body: dataString
                                        };
                                        
                                        const callback = (error, response, body) => {
                                            if (!error) {
                                                const parsed = JSON.parse(body);
                                
                                                console.log("FINAL STEP WORKED!", parsed);
        
                                                if ((users.length - 1) === indexxxxxxx) {
                                                    ressssss.json({
                                                        message: "Successfully updated one half of agreement!",
                                                        item: accepted_job
                                                    })
                                                }
                                            } else {
                                                console.log(error);
                                            }
                                        }
                                        
                                        request(options, callback); 
                                    }).catch((err) => {
                                        console.log(err);
                                    })
                                } else {
                                    if ((users.length - 1) === indexxxxxxx) {
                                        ressssss.json({
                                            message: "Successfully updated one half of agreement!",
                                            item: accepted_job
                                        })
                                    }
                                }
                            }
                        }
                    }
                    if (user.unique_id === other_user_id) {
                        // other user
                        for (let index = 0; index < user.accepted_jobs.length; index++) {
                            const accepted_job = user.accepted_jobs[index];

                            if (accepted_job.accepted_job_id === vehicle.id) {
        
                                accepted_job.other_user_agrees_completion = true;

                                collection.save(user);

                                console.log("accepted", accepted_job);

                                if ((users.length - 1) === indexxxxxxx) {
                                    ressssss.json({
                                        message: "Successfully updated one half of agreement!",
                                        item: accepted_job
                                    })
                                }
                            }
                        }
                    }
                }
            }
        })
    });
});

module.exports = router;