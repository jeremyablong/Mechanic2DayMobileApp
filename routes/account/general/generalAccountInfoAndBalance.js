const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const stripe = require('stripe')(config.get("stripeSecretKey"));

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    if (err) {
        console.log("MONGODB CONNECT ERR: ", err);
    } else {
        router.post("/", (req, res) => {

            const database = db.db("<dbname>");
    
            const collection = database.collection("users");
    
            const { id } = req.body;
    
            collection.findOne({ unique_id: id }).then(async (user) => {
                if (user) {
    
                    if (user.stripe_connect_account) {
                        const balance = await stripe.balance.retrieve({
                            stripeAccount: user.stripe_connect_account.id
                        }, (err, balance) => {
                            if (err) {
                                res.json({
                                    message: "Found user!",
                                    user
                                })
                            } else {
                                res.json({
                                    message: "Found user!",
                                    user,
                                    stripe_balance: balance
                                })
                            }
                        });
                    } else {
                        res.json({
                            message: "Found user!",
                            user
                        })
                    }
                } else {
                    res.json({
                        message: "Could not locate the appropriate user..."
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
        });
    }
});

module.exports = router;