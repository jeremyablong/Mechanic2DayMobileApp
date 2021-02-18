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
const stripe = require('stripe')(config.get("stripeSecretKey"));
const bcrypt = require("bcrypt-nodejs");


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", async (req, res) => {

        const { firebasePushNotificationToken, company_name, accountType, address, company_id, active_employee, authyID, birthdate, gender, unformatted, fullName, password, wholeAddress, phoneNumber, email } = req.body;

        if (phoneNumber !== "undefined" && phoneNumber.length > 0) {

            const generated_unique_id = uuidv4();

            const customer = await stripe.customers.create({
                description: "Client and/or customer.",
                address: {
                    line1: address,
                    city: wholeAddress.address.municipality,
                    postal_code: wholeAddress.address.postalCode,
                    state: wholeAddress.address.countrySubdivisionName
                },
                email: "Not-Provided",
                phone: unformatted,
                name: fullName
            }, (errrrrr, account) => {
                if (errrrrr) {
                    console.log(errrrrr);
                } else {
                    console.log("account", account);

                    const UserData = new User({
                        address,
                        authyID, 
                        birthdate, 
                        gender, 
                        fullName, 
                        active_employee,
                        password,  
                        boosts: 0,
                        pending_application: false,
                        review_count: 0,
                        stripe_customer_account: account,
                        company_id,
                        company_name,
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
        
                            UserData.save(async (err, data) => {
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
        } else {

            const generated_unique_id = uuidv4();

            const customer = await stripe.customers.create({
                description: "Client and/or customer.",
                address: {
                    line1: address,
                    city: wholeAddress.address.municipality,
                    postal_code: wholeAddress.address.postalCode,
                    state: wholeAddress.address.countrySubdivisionName
                },
                email: email,
                phone: "Not-Provided",
                name: fullName
            }, (errrrrr, account) => {
                if (errrrrr) {
                    console.log(errrrrr);
                } else {
                    console.log("account", account);

                    const UserData = new User({
                        address,
                        authyID, 
                        birthdate, 
                        gender, 
                        fullName, 
                        active_employee,
                        stripe_customer_account: account,
                        password,  
                        boosts: 0,
                        review_count: 0,
                        pending_application: false,
                        company_id,
                        company_name,
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
        
                            UserData.save(async (err, data) => {
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
        }
    });
});

module.exports = router;