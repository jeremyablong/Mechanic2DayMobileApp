const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const stripe = require('stripe')(config.get("stripeSecretKey"));
const { decrypt } = require("../../../crypto.js");


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
                       
                        if (user.unique_id === requestee_id) {
                            if (passedData === true && user.towing_services_start.agree_job_completed === true) {

                                for (let idxxxxxx = 0; idxxxxxx < users.length; idxxxxxx++) {
                                    
                                    const usa = users[idxxxxxx];

                                    if (usa.unique_id === id) {
                                        
                                        usa.towing_services_start.page = "driver-has-arrived-manage-listing-depatarture";

                                        for (let iiiii = 0; iiiii < usa.card_payment_methods.length; iiiii++) {
                                            const cardddd = usa.card_payment_methods[iiiii];
                                            if (cardddd.primary === true) {
                                                
                                                const token = await stripe.tokens.create({
                                                    card: {
                                                      number: decrypt(cardddd.card_number),
                                                      exp_month: Number(cardddd.expiration.split("/")[0]),
                                                      exp_year: Number(cardddd.expiration.split("/")[1]),
                                                      cvc: cardddd.cvc,
                                                    },
                                                }).then(async (dataaaaaa) => {
                                                    console.log("DATA!:", dataaaaaa);
        
                                                    const paymentIntent = await stripe.paymentIntents.confirm(usa.towing_services_start.charge.id, { 
                                                        payment_method_data: {
                                                            type: "card",
                                                            card: {
                                                                token: dataaaaaa.id
                                                            }
                                                        } 
                                                    }, async (err, intent) => {
                                                        if (err) {
                                                            console.log("Critical error", err);

                                                            if (err.raw.message === 'You cannot confirm this PaymentIntent because it has already succeeded after being previously confirmed.') {
                                                                collection.save(usa);

                                                                responseee.json({
                                                                    message: "Both users have agreed the job is complete!"
                                                                });
                                                            }
                                                        } else {
                                                            const paymentIntent = await stripe.paymentIntents.capture(
                                                                usa.towing_services_start.charge.id
                                                            );
            
                                                            if (paymentIntent) {
                                                                collection.save(usa);


                                                                responseee.json({
                                                                    message: "Both users have agreed the job is complete!"
                                                                });
                                                            }
                                                        }
                                                    })
                                                });
                                            }
                                        }
                                    }
                                }
                                
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