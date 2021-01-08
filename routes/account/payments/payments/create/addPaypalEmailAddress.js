const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { id, paypal_email } = req.body;

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                if (user.paypal_payment_address) {
                    user.paypal_payment_address = paypal_email.toLowerCase();
                } else {
                    user["paypal_payment_address"] = paypal_email.toLowerCase();
                }
                
                collection.save(user);


                res.json({
                    message: "Successfully updated paypal email!",
                    user
                })
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