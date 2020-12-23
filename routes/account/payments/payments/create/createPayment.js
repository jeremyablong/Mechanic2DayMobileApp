const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const { encrypt } = require('../../../../../crypto.js');

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
            id 
        } = req.body;

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                const card_addition = {
                    cvc,
                    expiration,
                    last_four: card_number.split(" ")[3],
                    card_number: encrypt(card_number),
                    postal_code,
                    type,
                    primary: false
                }

                if (user.card_payment_methods) {
                    user.card_payment_methods.push(card_addition);
                } else {
                    user["card_payment_methods"] = [card_addition];
                }

                collection.save(user);

                res.json({
                    message: "Successfully added a new card!"
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