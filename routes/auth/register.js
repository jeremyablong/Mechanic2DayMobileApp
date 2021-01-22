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
const axios = require('axios');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { firebasePushNotificationToken, accountType, address, active_employee, authyID, birthdate, gender, unformatted, fullName, password, wholeAddress, phoneNumber, email } = req.body;

        if (phoneNumber !== "undefined" && phoneNumber.length > 0) {

            const generated_unique_id = uuidv4();

            const UserData = new User({
                address,
                authyID, 
                birthdate, 
                gender, 
                fullName, 
                active_employee,
                password,  
                phoneNumber: [{
                    number: phoneNumber,
                    id: uuidv4(),
                    unformatted
                }],
                register_system_date: Date.now(),
                register_date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                wholeAddress,
                accountType,
                unique_id: generated_unique_id,
                phoneNumberAuth: unformatted,
                firebasePushNotificationToken
            });   

            const configgg = {
                headers: {
                    "Api-Token": config.get("sendbird_api_token"),
                    'Content-Type': 'application/json'
                }
            }
    
            axios.post("https://api-59615BD6-4F78-4B10-BF4A-587E1403BBD9.sendbird.com/v3/users", {
                user_id: generated_unique_id,
                profile_url: "",
                nickname: fullName
            }, configgg).then((response) => {
                if (response) {
                    console.log(response);

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
            }).catch((error) => {
                console.log(error);

                res.json({
                    error, 
                    message: "An error occurred..."
                })
            })
        } else {

            const generated_unique_id = uuidv4();

            const UserData = new User({
                address,
                authyID, 
                birthdate, 
                gender, 
                fullName, 
                active_employee,
                password,  
                email,
                register_system_date: Date.now(),
                register_date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                wholeAddress,
                accountType,
                unique_id: generated_unique_id,
                firebasePushNotificationToken
            });

            const configgg = {
                headers: {
                    "Api-Token": config.get("sendbird_api_token"),
                    'Content-Type': 'application/json'
                }
            }
    
            axios.post("https://api-59615BD6-4F78-4B10-BF4A-587E1403BBD9.sendbird.com/v3/users", {
                user_id: generated_unique_id,
                profile_url: "",
                nickname: fullName
            }, configgg).then((response) => {
                if (response) {
                    console.log(response);

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
            }).catch((error) => {
                console.log(error);

                res.json({
                    error, 
                    message: "An error occurred..."
                })
            })
        }
    });
});

module.exports = router;