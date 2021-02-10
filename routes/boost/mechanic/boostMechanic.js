const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require('axios');
const Mechanic = require('../../../schemas/savePromotedMechanics.js');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, rresponseeeee) => {

        const database = db.db("<dbname>");

        const collection = database.collection("promoted-mechanic-profiles");

        const { id } = req.body;

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {
                rresponseeeee.json({
                    message: "User is ALREADY boosted and new boost is null and void!"
                })
            } else {

                const newMechanic = new Mechanic({
                    fullName: user.fullName,
                    accountType: user.accountType,
                    review_count: user.review_count,
                    stripe_connect_account: user.stripe_connect_account,
                    profilePics: user.profilePics,
                    phoneNumber: user.phoneNumber,
                    company_id: user.company_id,
                    company_name: user.company_name,
                    register_date: user.register_date,
                    unique_id: user.unique_id,
                    firebasePushNotificationToken: user.firebasePushNotificationToken,
                    employed_by: user.employed_by,
                    gender: user.gender,
                    createdAt: Date.now()
                });

                newMechanic.save((err, data) => {
                    if (err) {
                        console.log(err);

                        rresponseeeee.json({
                            message: "Error occurred while saving and promoting user",
                            err
                        })
                    } else {
                        
                        collection.save(user);


                        rresponseeeee.json({
                            message: "No existing boost and boost was activated!",
                            data
                        })
                    }
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    });
});

module.exports = router;