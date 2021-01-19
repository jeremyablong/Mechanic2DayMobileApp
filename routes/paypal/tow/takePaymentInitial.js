const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require('axios');
const request = require('request');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { amount, vehicle, paypal_access_token, email, accepted_id, other_user_paypal_email } = req.body;

        console.log("req.body", req.body);
        
        const database = db.db("<dbname>");

        const collection = database.collection("users");

        collection.findOne({ "broken_vehicles_listings.id": vehicle.id }).then((user) => {
            if (user) {

                if (!user.paypal_payment_address) {
                    res.json({
                        message: "The other user must complete their paypal before proceeding..."
                    })
                } else {
                    const headers = {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${paypal_access_token}`,
                        'Prefer': 'return=representation'
                    };
                    
                    const dataString = `{
                        "intent": "CAPTURE",
                        "purchase_units": [{
                            "amount": {
                                "currency_code": "USD",
                                "value": "${amount.toFixed(2).toString()}"
                            },
                            "payee": {
                                "email_address": "${other_user_paypal_email.toString()}"
                            },
                            "payment_instruction": {
                                "disbursement_mode": "DELAYED"
                            }
                        }],
                        "payer": {
                            "email_address": "${email.toLowerCase()}"
                        },
                        "application_context": {
                            "return_url": "https://www.google.com"
                        }
                    }`;
                    
                    const options = {
                        url: 'https://api.sandbox.paypal.com/v2/checkout/orders',
                        method: 'POST',
                        headers: headers,
                        body: dataString
                    };
                    
                    const callback = (error, response, body) => {
                        if (!error) {
                            const parsed = JSON.parse(body);
    
                            console.log("MAJIC HAPPENED!!!!!!: ", parsed);

                            res.json({
                                message: "Successfully executed paypal logic!",
                                links: parsed.links,
                                data: parsed
                            })
                        } else {
                            console.log(error);
                        }
                    }
                    
                    request(options, callback);
                }
    
            } else {
                res.json({
                    message: "Could not locate the appropriate user..."
                })
            }
        }).catch((err) => {
            console.log(err);
        });
    });
});

module.exports = router;