const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require('axios');
const request = require('request');
const stripe = require('stripe')(config.get("stripeSecretKey"));


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { amount, vehicle, email, signed_in_user_id, other_user } = req.body;

        console.log("req.body", req.body);
        
        const database = db.db("<dbname>");

        const collection = database.collection("users");

        collection.find({ unique_id: { "$in" : [ signed_in_user_id, other_user ]}}).toArray(async (err, users) => {
            if (err) {

                console.log(err);

                res.json({
                    err,
                    message: "critical errorrrrrrr"
                })
                  
            } else {

                const promiseee = new Promise((resolve, reject) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];

                        // signed in user - client
                        if (signed_in_user_id === user.unique_id) {
                            
                            resolve(user);
                        } 
                    }
                })

                promiseee.then(async (passedData) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        

                        // mechanic user...
                        if (other_user === user.unique_id) {
    
                            const paymentIntent = await stripe.paymentIntents.create({
                                amount: amount - (amount * 0.20),
                                currency: 'usd',
                                payment_method_types: ['card'],
                                customer: passedData.stripe_customer_account.id,
                                on_behalf_of: user.stripe_connect_account.id,
                                application_fee_amount: amount * 0.20
                            }, (errorrrrrrr, payment_intent) => {
                                if (errorrrrrrr) {
                                    console.log(errorrrrrrr);
                                } else {
                                    console.log("payment_intent", payment_intent);

                                   
                                    
                                    res.json({
                                        message: "Successfully executed paypal logic!"
                                    })
                                }
                            });
                        }
                    }
                })
            }
        })
    });
});

module.exports = router;