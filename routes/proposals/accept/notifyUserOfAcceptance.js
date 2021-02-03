const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')(config.get("stripeSecretKey"));


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { proposal, other, listinggg, other_user, total, customer_id } = req.body;

        collection.findOne({ unique_id: proposal.applicant }).then(async (user) => {
            if (user) {

                const paymentIntent = await stripe.paymentIntents.create({
                    amount: Math.round(total * 100),
                    currency: 'usd',
                    payment_method_types: ['card'],
                    application_fee_amount: Math.round(total * 0.20),
                    customer: customer_id,
                    transfer_data: {
                        destination: user.stripe_connect_account.id,
                    },
                    confirm: true,
                    capture_method: "manual"
                }, (errorrrrrrrrr, intent) => {
                    if (errorrrrrrrrr) {
                        console.log(errorrrrrrrrr);
                    } else {
                        console.log("INTENT", intent);

                        const accepted = {
                            id: uuidv4(),
                            accepted_job_id: proposal.related,
                            agreement_date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                            agreement_system_date: Date.now(),
                            agreed_amount: proposal.amount,
                            currency: "$ - USD",
                            initiator: other,
                            other_user,
                            other_user_agrees_completion: false,
                            poster_agrees_completion: false,
                            payment_intent: intent
                        };
        
                        if (user.accepted_jobs) {
                            user.accepted_jobs.push(accepted)
                        } else {
                            user["accepted_jobs"] = [accepted];
                        }
        
                        collection.save(user);
        
                        for (let index = 0; index < user.applied_jobs.length; index++) {
                            const job = user.applied_jobs[index];
                            
                            if (job.applied_job_id === listinggg.id) {
        
                                job.accepted = true;

                                collection.save(user);

                                res.json({
                                    message: "Succesfully notified user!",
                                    user
                                })
                            }
                        }
                    }
                });
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