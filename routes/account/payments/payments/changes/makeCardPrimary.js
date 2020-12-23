const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const { decrypt } = require('../../../../../crypto.js');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { id, card } = req.body;

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                const promiseee = new Promise((resolve, reject) => {
                    if (user.card_payment_methods) {
                        for (let index = 0; index < user.card_payment_methods.length; index++) {
                            const individual = user.card_payment_methods[index];
                            console.log("individual", individual);
                            if (decrypt(individual.card_number) === decrypt(card.card_number)) {
                                console.log("matchhhhhh")
                                individual.primary = true;
                            } else {
                                individual.primary = false;
                            }
                            if ((user.card_payment_methods.length - 1) === index) {
                                resolve();
                            }
                        }
                    }
                }) 
                promiseee.then((dataaa) => {

                    collection.save(user);

                    res.json({
                        message: "Changed to primary!"
                    })
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