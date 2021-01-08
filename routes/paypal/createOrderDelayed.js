const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { amount, vehicle } = req.body;
        
        const database = db.db("<dbname>");

        const collection = database.collection("users");

        collection.findOne({ "broken_vehicles_listings.id": vehicle.id }).then((user) => {
            if (user) {

                const configgg = {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer <Access-Token>",
                        "PayPal-Partner-Attribution-Id": null
                    }
                }
        
                axios.post('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
                    "intent": "CAPTURE",
                    "purchase_units": [{
                        "amount": {
                            "currency_code": "USD",
                            "value": amount.toFixed(2)
                        },
                        "payee": {
                            "email_address": "seller@example.com"
                        },
                        "payment_instruction": {
                            "disbursement_mode": "DELAYED",
                            "platform_fees": [{
                                "amount": {
                                    "currency_code": "USD",
                                    "value": "25.00"
                                }
                            }]
                        }
                    }],
                }, configgg).then((res) => {
                    console.log(res.data);

                    res.json({
                        message: "Successfully executed paypal logic!",
                        data: res.data
                    })
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                res.json({
                    message: "Could not locate the appropriate user..."
                })
            }
        }).catch((err) => {
            console.log(err);
        });
    });
});

module.exports = router;