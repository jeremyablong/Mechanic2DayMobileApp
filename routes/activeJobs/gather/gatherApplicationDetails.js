const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require('axios');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { other_user_id } = req.body;
        
        console.log("req.nbody", req.body);

        collection.findOne({ unique_id: other_user_id }).then((user) => {
            if (user) {

                console.log("HOST", user);

                delete user.address;
                delete user.authyID;
                delete user.password;
                delete user.email;
                delete user.birthdate;
                delete user.wholeAddress;
                delete user.phoneNumberAuth;
                delete user.firebasePushNotificationToken;
                delete user.accepted_jobs;
                delete user.notifications;

                res.json({
                    message: "Successfully located host!",
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