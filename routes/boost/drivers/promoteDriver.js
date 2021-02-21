const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const Driver = require("../../../schemas/savePromotedTowDriver.js");


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { driver } = req.body;

        collection.findOne({ unique_id: driver.user_id }).then((user) => {
            if (user) {

                console.log("USERRRRRRRRRRRR ---------------------- : ", user);

                const newDriver = new Driver({
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
                    createdAt: Date.now(),
                    completed_stripe_onboarding: user.completed_stripe_onboarding
                });
                Driver.count({ unique_id: user.unique_id }, (err, count) => { 
                    if (err) {
                        res.json({
                            err,
                            message: "Error occurred for unknown reason..."
                        })
                    } else {
                        if (count > 0) {
                            // document exists
                            res.json({
                                message: "User is ALREADY registered and boosted!"
                            });
                        } else {
                            newDriver.save((err, data) => {
                                if (err) {
                                    console.log(err);
            
                                    res.json({
                                        message: "Error occurred while saving and promoting user",
                                        err
                                    })
                                } else {
                                    res.json({
                                        message: "Succcessfully promoted driver!",
                                        data
                                    })
                                }
                            })
                        }
                    }
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