const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
const { resolve } = require("path");
const stripe = require('stripe')(config.get("stripeSecretKey"));


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { proposal, other, listinggg, fullName, total, customer_id, signed_in_user_id } = req.body;

        collection.find({ unique_id: { "$in": [ proposal.applicant, signed_in_user_id ]}}).toArray(async (err, users) => {
            if (err) {
                console.log(err);

                res.json({
                    message: "Error occurred...",
                    err
                })
            } else {

                const generatedUniqueID = uuidv4();
                
               const promiseee = new Promise((resolve, reject) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // mechanic
                        if (user.unique_id === proposal.applicant) {
                            console.log("OTHERRRRRRR USER", user);

                            for (let index = 0; index < user.applied_jobs.length; index++) {
                                const job = user.applied_jobs[index];
                                
                                if (job.applied_job_id === listinggg.id) {
            
                                    job.accepted = true;

                                    collection.save(user);

                                    setTimeout(() => {
                                        resolve(user.stripe_connect_account.id);
                                    }, 750);
                                }
                            }
                        };
                    }
               })

                promiseee.then(async (passedData) => {

                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // client
                        if (user.unique_id === signed_in_user_id) {
                            console.log("proposal.applicant...", user);

                            
                            const paymentIntent = await stripe.paymentIntents.create({
                                amount: Math.round((total * 100) + (total * 0.23)),
                                currency: 'usd',
                                payment_method_types: ['card'],
                                application_fee_amount: Math.round((total * 100) * 0.23),
                                customer: user.stripe_customer_account.id,
                                transfer_data: {
                                    destination: passedData
                                },
                                confirm: true,
                                capture_method: "manual"
                            }, async (errorrrrrrrrr, intent) => {
                                if (errorrrrrrrrr) {
                                    console.log(errorrrrrrrrr);
                                } else {
                                    console.log("INTENT", intent);

                                    if (user.accepted_jobs) {
                                        user.accepted_jobs.push({
                                            id: generatedUniqueID,
                                            accepted_job_id: listinggg.id,
                                            agreement_date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                            agreement_system_date: Date.now(),
                                            agreed_amount: proposal.amount,
                                            currency: "$ - USD",
                                            initiator: signed_in_user_id,
                                            other_user: proposal.applicant,
                                            other_user_agrees_completion: false,
                                            poster_agrees_completion: false,
                                            payment_intent: intent
                                        })

                                        collection.save(user);
                                    } else {
                                        user["accepted_jobs"] = [{
                                            id: generatedUniqueID,
                                            accepted_job_id: listinggg.id,
                                            agreement_date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                            agreement_system_date: Date.now(),
                                            agreed_amount: proposal.amount,
                                            currency: "$ - USD",
                                            initiator: signed_in_user_id,
                                            other_user: proposal.applicant,
                                            other_user_agrees_completion: false,
                                            poster_agrees_completion: false,
                                            payment_intent: intent
                                        }]

                                        collection.save(user);
                                    }
                                }
                            }) 
                        }
                    }
                }).then(async () => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        
                        if (user.unique_id === proposal.applicant) {
                            const accepted = {
                                id: generatedUniqueID,
                                accepted_job_id: proposal.related,
                                agreement_date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                agreement_system_date: Date.now(),
                                agreed_amount: proposal.amount,
                                currency: "$ - USD",
                                initiator: signed_in_user_id,
                                other_user: proposal.applicant,
                                other_user_agrees_completion: false,
                                poster_agrees_completion: false
                            };
            
                            if (user.accepted_jobs) {
                                user.accepted_jobs.push(accepted)
                            } else {
                                user["accepted_jobs"] = [accepted];
                            }

                            collection.save(user);

                            const notify_obj = {
                                id: uuidv4(),
                                system_date: Date.now(),
                                date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                data: {
                                    title: `${fullName} ACCEPTED your proposal to a job you applied for ${Math.round((total  * 100) + (total * 0.20))} 💰`,
                                    body: `${fullName} ACCEPTED your application/proposal to fix their vehicle. Congrats!`
                                },
                                from: signed_in_user_id,
                                link: "proposals"
                            }
            
                            if (user.notifications) {
                                user.notifications.push(notify_obj)
                            } else {
                                user["notifications"] = [notify_obj];
                            }
            
                            collection.save(user);

                            setTimeout(() => {
                                res.json({
                                    message: "Succesfully notified user!"
                                })
                            }, 2000);
                        }
                    }
                })
            }
        })
    });
});

module.exports = router;