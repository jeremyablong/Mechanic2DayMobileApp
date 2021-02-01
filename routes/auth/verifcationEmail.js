const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const fs = require('fs');
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
const axios = require("axios");
const nodemailer = require("nodemailer");
const { encrypt } = require('../../crypto.js');

// need to fix how many times res.json is sent - can't send multiple headers
mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", async (req, res) => { 

        const { email } = req.body;

        console.log('email', email);

        const generatedID = uuidv4().split("-")[0];

        // create transporter object with smtp server details
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: 'blongjeremy@gmail.com',
                pass: 'Jer$8246355abc123'
            }
        });

        // send email
        await transporter.sendMail({
            from: 'help@mechanictoday.com',
            to: email.toLowerCase(),
            subject: 'Mechanic2Day Authentication Code',
            text: `Your authentication code is: ${generatedID}`
        });

        res.json({
            message: "Successfully sent email!",
            code: encrypt(generatedID)
        })
    });
});

module.exports = router;