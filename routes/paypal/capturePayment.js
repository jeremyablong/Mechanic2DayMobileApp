const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const request = require('request');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { id, paypal_access_token, order_id, job_id, other_user_id } = req.body;

        console.log("req.body", req.body);

        collection.find({ unique_id: { "$in" : [ id, other_user_id ]}}).toArray((err, users) => {
            if (err) {
                console.log("err", err);
                
                res.json({
                    message: "Critical error occurred...Could not locate either user."
                })
            } else {
                const promiseee = new Promise((resolve, reject) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // logged-in user
                        if (user.unique_id === id) {
    
                            const headers = {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${paypal_access_token}`
                            };
                            
                            const dataString = `{}`;
                            
                            const options = {
                                url: `https://api.sandbox.paypal.com/v2/checkout/orders/${order_id}/capture`,
                                method: 'POST',
                                headers: headers,
                                body: dataString
                            };
                            
                            const callback = (error, response, body) => {
                                if (!error) {
                                    const parsed = JSON.parse(body);
                    
                                    console.log("IT ACTUALLY WORKED!!~!", parsed);
            
                                    for (let idxxxxx = 0; idxxxxx < user.accepted_jobs.length; idxxxxx++) {
                                        const accept = user.accepted_jobs[idxxxxx];
                                        
                                        if (accept.accepted_job_id === job_id) {
                                            accept.paypal_order_id = order_id;
                                            accept.processed = true;
                                            accept.reference_id = parsed.purchase_units[0].reference_id;

                                            collection.save(user);
    
                                            resolve(parsed);
                                        }
                                    }
                                } else {
                                    console.log(error);
                                }
                            }
                            
                            request(options, callback);        
                        }
                    }
                })
 
                promiseee.then((passedValues) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        
                        // other user - NOT signed in user
                        if (user.unique_id === other_user_id) {
    
                            for (let indxxxx = 0; indxxxx < user.accepted_jobs.length; indxxxx++) {
                                const accept = user.accepted_jobs[indxxxx];
                                
                                if (accept.accepted_job_id === job_id) {
                                    accept.paypal_order_id = order_id;
                                    accept.processed = true;
    
                                    collection.save(user);
    
                                    console.log("ACCEPTO", accept);
                                    
                                    res.json({
                                        message: "Successfully added paypal order id to each users approved jobs...!",
                                        approved: passedValues.approve,
                                        item: accept
                                    })
                                }
                            }
                        }
                    }
                })
            }
        });
    });
});

module.exports = router;