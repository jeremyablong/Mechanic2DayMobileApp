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

                stripe.balance.retrieve((err, balance) => {
                    // asynchronously called
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("balance retrieved", balance, Math.floor(cashout) * 100);

                        if (balance.available[0].amount <= (Math.floor(cashout) * 100)) {
                            console.log("MORE THAN...");
                        } else {
                            console.log("LESS THAN AVALIABLE BALANCE.");
                        }
                    }
                });

                // const payout = await stripe.payouts.create({
                //     amount: Math.round(cashout) * 100,
                //     currency: 'usd',
                //     method: "standard",
                //     destination: selected.id,
                //     source_type: "bank_account"
                // }, { stripeAccount: user.stripe_connect_account.id }, (error, payout) => {
                //     if (error) {
                //         console.log(error);

                //         res.json({
                //             message: "An error occurred while creating payout...",
                //             err: error
                //         })
                //     } else {
                //         res.json({
                //             message: "Successfully created payout!",
                //             payout
                //         })
                //     }
                // });
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