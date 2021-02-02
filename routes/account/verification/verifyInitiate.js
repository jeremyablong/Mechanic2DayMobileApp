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

        collection.findOne({ unique_id: id }).then(async (user) => {
            if (user) {
                
                const accountLink = await stripe.accountLinks.create({
                    account: user.stripe_connect_account.id,
                    refresh_url: `${config.get("ngrok_url")}/onboarding/stripe`,
                    return_url: 'https://www.google.com',
                    type: 'account_onboarding',
                }, (err, accountLink) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(accountLink);

                        res.json({
                            message: "Gathered flow link!",
                            accountLink
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