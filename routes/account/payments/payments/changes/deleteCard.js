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

        const { id, card } = req.body;

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                for (let index = 0; index < user.card_payment_methods.length; index++) {
                    const individual = user.card_payment_methods[index];
                    if (individual.card_number === card.card_number) {
                        user.card_payment_methods.splice(index, 1);
                    }
                }

                collection.save(user);

                res.json({
                    message: "Successfully deleted the desired card!",
                    cards: user.card_payment_methods
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