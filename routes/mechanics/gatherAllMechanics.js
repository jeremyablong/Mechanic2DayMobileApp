const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        collection.find({ accountType: "mechanic" }).toArray((err, users) => {
            if (err) {

                console.log("err", err);

                res.json({
                    err,
                    message: "ERR occurred..."
                })
            } else {

                const users_array = [];


                const promiseee = new Promise((resolve, reject) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        
                        delete user.phoneNumber;
                        delete user.address;
                        delete user.password;
                        delete user.email;
                        delete user.wholeAddress;
                        delete user.card_payment_methods;
                        delete user.firebasePushNotificationToken;
                        delete user.broken_vehicles_listings;
                        delete user.notifications;
                        delete user.applied_jobs;
                        delete user.paypal_authorization;
                        delete user.phoneNumberAuth;
                        delete user.authyID;
                        
                        users_array.push(user);
                        
                        if ((users.length - 1) === index) {
                            resolve(users_array);
                        }
                    }
                })

                promiseee.then((passedData) => {
                    res.json({
                        message: "Successfully located mechanics!",
                        mechanics: passedData
                    })
                })
            }
        })
    });
});

module.exports = router;