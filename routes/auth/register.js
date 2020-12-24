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

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { accountType, address, authyID, birthdate, gender, unformatted, fullName, password, wholeAddress, phoneNumber, email } = req.body;

        if (phoneNumber !== "undefined" && phoneNumber.length > 0) {

            const UserData = new User({
                address,
                authyID, 
                birthdate, 
                gender, 
                fullName, 
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
                unique_id: uuidv4(),
                phoneNumberAuth: unformatted
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
        } else {

            const UserData = new User({
                address,
                authyID, 
                birthdate, 
                gender, 
                fullName, 
                password,  
                email,
                register_system_date: Date.now(),
                register_date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                wholeAddress,
                accountType,
                unique_id: uuidv4()
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
    });
});

module.exports = router;