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

        const { proposal } = req.body;

        collection.findOne({ unique_id: proposal.applicant }).then((user) => {
            if (user) {

                delete user.phoneNumber;
                delete user.address;
                delete user.birthdate;
                delete user.password;
                delete user.email;
                delete user.wholeAddress;
                delete user.card_payment_methods;
                // delete user.broken_vehicles_listings;
                delete user.firebasePushNotificationToken;
                delete user.notifications;
                delete user.applied_jobs;
                delete user.authyID;
                delete user.paypal_authorization;
                delete user.phoneNumberAuth;

                res.json({
                    message: "Gathered user's data!",
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