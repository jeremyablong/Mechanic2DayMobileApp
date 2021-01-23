const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const fs = require('fs');
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const request = require('request');

// need to fix how many times res.json is sent - can't send multiple headers
mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { email_phone, password } = req.body;

        console.log("Ran")

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const trimmed = email_phone.toLowerCase().trim();
        

        collection.findOne({ $or: [
            { email: trimmed },
            { "phoneNumberAuth": trimmed }
        ]}).then((user) => {
            if (user) {
                if ((user.phoneNumberAuth === trimmed || user.email === trimmed) && user.password === password) {

                    const headers = {
                        'Accept': 'application/json',
                        'Accept-Language': 'en_US'
                    };
                    
                    const dataString = 'grant_type=client_credentials';
                    
                    const options = {
                        url: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
                        method: 'POST',
                        headers: headers,
                        body: dataString,
                        auth: {
                            'user': config.get("paypalRESTClientID"),
                            'pass': config.get("paypalRESTSecret")
                        }
                    };
                    const callback = (error, response, body) => {
                        if (!error && response.statusCode == 200) {
                            console.log("SUCCESSFUL RESPONSE: body-------:", JSON.parse(body));

                            const parsedBody = JSON.parse(body);

                            if (user.paypal_authorization) {
                                user.paypal_authorization = parsedBody;
                            } else {
                                user["paypal_authorization"] = parsedBody;
                            }

                            collection.save(user);

                            res.json({
                                message: "Successfully authenticated!",
                                user
                            })
                        }
                    }
                    
                    request(options, callback);
                } else {
                    res.json({
                        message: "Password/email did match our records..."
                    })
                }
            } else {
                res.json({
                    message: "Could NOT find user..."
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    });
});

module.exports = router;