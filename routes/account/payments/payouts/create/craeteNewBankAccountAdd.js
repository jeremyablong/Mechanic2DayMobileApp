const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const stripe = require('stripe')(config.get("stripeSecretKey"));

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, responseeeee) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { 
            id,
            bankAccountType, 
            accountHolder, 
            routingNumber, 
            accountNumber
        } = req.body;

        console.log(req.body);

        collection.findOne({ unique_id: id }).then(async (user) => {
            if (user) {

                const account = await stripe.accounts.retrieve(
                    user.stripe_connect_account.id
                );

                if (account) {
                    console.log("account", account);

                    const token = await stripe.tokens.create({
                        bank_account: {
                          country: 'US',
                          currency: 'usd',
                          account_holder_name: accountHolder,
                          account_holder_type: account.business_type,
                          routing_number: routingNumber,
                          account_number: accountNumber,
                        },
                    }, async (err, createdToken) => {
                        if (err) {
                            console.log(err);
                            
                            responseeeee.json({
                                message: "Error occurred while generating bank token...",
                                err
                            })
                        } else {
                            console.log("createdToken", createdToken);

                            const bankAccount = await stripe.accounts.createExternalAccount(user.stripe_connect_account.id, { external_account: createdToken.id }, (error, account) => {
                                if (error) {
                                    console.log(error);

                                    responseeeee.json({
                                        message: "Error occurred while adding external bank account...",
                                        err
                                    })
                                } else {
                                    console.log("account", account);

                                    responseeeee.json({
                                        message: "Successfully added new bank account!",
                                        account
                                    })
                                }
                            });
                        }
                    });
                }
            } else {
                responseeeee.json({
                    message: "Could not locate the appropriate user..."
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    });
});

module.exports = router;