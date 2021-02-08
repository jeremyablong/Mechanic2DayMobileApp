const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const stripe = require('stripe')(config.get("stripeSecretKey"));

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { id, cashout, selected } = req.body;

        collection.findOne({ unique_id: id }).then(async (user) => {
            if (user) {

                const payouts = await stripe.payouts.list({
                    limit: 3,
                }, { stripeAccount: user.stripe_connect_account.id }, (err, payouts) => {
                    if (err) {
                        console.log(err);

                        res.json({
                            message: "Error gathering payouts...",
                            err
                        })
                    } else {
                        console.log("payouts", payouts);

                        res.json({
                            message: "Gathered payouts!",
                            payouts
                        })
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