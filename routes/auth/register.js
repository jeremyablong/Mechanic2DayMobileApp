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
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const gemshire = require("../../main.js");
const bcrypt = require("bcrypt-nodejs");
const { encrypt } = require('../../crypto.js');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", async (req, res) => {

        const saltRounds = 10;

        const key = ec.genKeyPair();

        const publicKey = key.getPublic("hex");
        const privateKey = key.getPrivate("hex");

        console.log("private key is the ", privateKey);

        console.log("public key is ", publicKey);

        const { firebasePushNotificationToken, company_name, accountType, address, company_id, active_employee, authyID, birthdate, gender, unformatted, fullName, password, wholeAddress, phoneNumber, email } = req.body;

        if (phoneNumber !== "undefined" && phoneNumber.length > 0) {

            const generated_unique_id = uuidv4();

            const account = await stripe.accounts.create({
                type: 'custom',
                country: 'US',
                capabilities: {
                    card_payments: {
                        requested: true,
                    },
                    transfers: {
                        requested: true,
                    }
                }
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
                        review_count: 0,
                        blockchainCredentials: {
                            publicKey: encrypt(publicKey),
                            privateKey: encrypt(privateKey)
                        },
                        password,  
                        boosts: 0,
                        stripe_connect_account: account,
                        pending_application: false,
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

            const account = await stripe.accounts.create({
                type: 'custom',
                country: 'US',
                capabilities: {
                    card_payments: {
                      requested: true,
                    },
                    transfers: {
                      requested: true,
                    }
                }
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
                        review_count: 0,
                        blockchainCredentials: {
                            publicKey: encrypt(publicKey),
                            privateKey: encrypt(privateKey)
                        },
                        boosts: 0,
                        stripe_connect_account: account,
                        pending_application: false,
                        password,  
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