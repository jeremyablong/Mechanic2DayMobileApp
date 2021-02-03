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

        const { id } = req.body;

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                // const subscription = await stripe.subscriptions.create({
                //     customer: "cus_4fdAW5ftNQow1a",
                //     items: [
                //       {
                //         price: "price_H1y51TElsOZjG",
                //       },
                //     ],
                //     expand: ["latest_invoice.payment_intent"],
                //     application_fee_percent: 0,
                //     transfer_data: {
                //             destination: "{{CONNECTED_STRIPE_ACCOUNT_ID}}",
                //           },
                // }, (errorr, subscription) => {
                //     if (errorr) {
                //         console.log(errorr);
                //     } else {
                //         console.log("subscription", subscription);

                //         res.json({
                //             message: "Successfully subscribed!",
                //             user
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