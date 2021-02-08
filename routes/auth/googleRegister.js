const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const fs = require('fs');
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
const User = require("../../schemas/register.js");
const request = require('request');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { email, fullName, google_id, google_pic, firebasePushNotificationToken } = req.body;

        const generatedID = uuidv4();

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        collection.findOne({ google_id }).then((user) => {
            if (user) {

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

                        // do nothing if user is already registered...
                        res.json({
                            message: "Successfully registered new user!",
                            data: user
                        })
                    }
                }
                
                request(options, callback);
            } else {
                // register the user now that we know they havent registere YET...


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

                        const UserData = new User({
                            fullName, 
                            review_count: 0,
                            email,
                            profilePics: [{
                                id: uuidv4(),
                                full_url: google_pic,
                                date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                poster: generatedID,
                                system_date: Date.now()
                            }],
                            google_id,
                            register_system_date: Date.now(),
                            register_date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"), 
                            unique_id: generatedID,
                            firebasePushNotificationToken,
                            paypal_authorization: parsedBody
                        });   
        
                        UserData.save((err, data) => {
                            if (err) {
                
                                console.log(err);
                                
                                res.json({
                                    err, 
                                    message: "An error occurred..."
                                })
                            } 
                            res.json({
                                message: "Successfully registered new user!",
                                data
                            })
                        })
                    }
                }
                
                request(options, callback);
            }
        }).catch((err) => {
            console.log(err);
        })
    });
});

module.exports = router;