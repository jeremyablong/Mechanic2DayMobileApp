const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const { encrypt } = require('../../../../../crypto.js');
const stripe = require('stripe')(config.get("stripeSecretKey"));


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { 
            cvc,
            expiration,
            card_number,
            postal_code,
            type,
            id,
            fullName
        } = req.body;

        console.log(req.body);

        collection.findOne({ unique_id: id }).then(async (user) => {
            if (user) {

                const source = {
                    object: "card",
                    number: card_number,
                    exp_month: expiration.split("/")[0],
                    exp_year: expiration.split("/")[1],
                    cvc,
                    name: fullName
                };

                console.log("source", source);

                const token = await stripe.tokens.create({
                    card: {
                      number: card_number,
                      exp_month: Number(expiration.split("/")[0]),
                      exp_year: Number(expiration.split("/")[1]),
                      cvc: cvc,
                    },
                }).then(async(dataaaaaa) => {
                    console.log("DATA!:", dataaaaaa);

                    const card = await stripe.customers.createSource(
                        user.stripe_customer_account.id,
                        { source: dataaaaaa.id }, (err, card) => {
                          if (err) {
                            // Error adding card to customer
                                console.log(err)
                          } else {
                                // Success
                                console.log("CARD", card);

                                if (user.card_payment_methods) {
                                    const card_addition = {
                                        cvc,
                                        expiration,
                                        last_four: card_number.split(" ")[3],
                                        card_number: encrypt(card_number),
                                        postal_code,
                                        type,
                                        primary: false,
                                        token: dataaaaaa
                                    }
                                    user.card_payment_methods.push(card_addition);

                                    collection.save(user);

                                    res.json({
                                        message: "Successfully added a new card!"
                                    })
                                } else {
                                    const card_addition = {
                                        cvc,
                                        expiration,
                                        last_four: card_number.split(" ")[3],
                                        card_number: encrypt(card_number),
                                        postal_code,
                                        type,
                                        primary: true,
                                        token: dataaaaaa
                                    }
    
                                    user["card_payment_methods"] = [card_addition];

                                    collection.save(user);

                                    res.json({
                                        message: "Successfully added a new card!"
                                    })
                                }
                          }
                        }
                    );
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