const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const fs = require('fs');
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
const authy = require('authy')(config.get("authyKey"));


// need to fix how many times res.json is sent - can't send multiple headers
mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { phoneNumber, callingCode, email } = req.body;

        console.log("req.body", req.body);

        authy.register_user(email, phoneNumber, callingCode, (err, response) => {
            if(err) {
                if (response && response.json) {
                    response.json(err);
                } else {
                    console.log("critical err", err);

                    res.json({
                        message: "You must complete your email before adding a new phone number...",
                        err
                    })
                }
                return;
            } else {
                authy.request_sms(response.user.id, (smsErr, responseee) => {

                    console.log('Requesting SMS...');

                    if (smsErr) {

                        console.log(smsErr);

                        res.send('There was some error sending OTP to cell phone.');

                    } else if (responseee) {

                        console.log(responseee);

                        res.json({
                            message: "Code was successfully sent!",
                            authyID: response.user.id
                        })
                    }
                });
            }
        });
    });
});

module.exports = router;