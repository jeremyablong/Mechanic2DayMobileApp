const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require('axios');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, responseeeeee) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { id, company_name } = req.body;

        collection.findOne({ unique_id: id }).then((user) => {
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
                delete user.paypal_authorization;
                delete user.phoneNumberAuth;
                delete user.authyID;

                axios.get(`${config.get("ngrok_url")}/gather/co/information`, {
                    params: {
                        company_id: user.employed_by,
                        company_name
                    }
                }).then((res) => {
                    if (res.data.message === "Gathered company information!") {

                        const { company } = res.data;

                        responseeeeee.json({
                            message: "Gathered user's data!",
                            company
                        })
                    }
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                responseeeeee.json({
                    message: "Could not locate the appropriate user..."
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    });
});

module.exports = router;