const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const stripe = require('stripe')(config.get("stripeSecretKey"));

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { id } = req.query;

        collection.findOne({ unique_id: id }).then(async (user) => {
            if (user) {

                const accountCards = await stripe.accounts.listExternalAccounts(user.stripe_connect_account.id, { object: 'card', limit: 3 }, async (err, cards) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Cards", cards);

                        const accountBankAccounts = await stripe.accounts.listExternalAccounts(user.stripe_connect_account.id, { object: 'bank_account', limit: 3 }, (error, banks) => {
                            if (error) {
                                console.log(error);
                            } else {
                                res.json({
                                    message: "Successfully gathered cards!",
                                    cards,
                                    banks
                                })
                            }
                        });
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