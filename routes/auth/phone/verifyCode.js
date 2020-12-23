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

        const { code, authyID } = req.body;

        authy.verify(authyID, Number(code), (errorrrr, responseeee) => {
            console.log('In Verification...');
            if (errorrrr) {
        
              console.log(errorrrr);
        
              res.send('OTP verification failed.');
        
            } else if (responseeee) {
        
                console.log(responseeee);
        
                if (responseeee.message === 'Token is valid.') {
        
                    res.json({
                        message: "Successfully authenticated!"
                    })   
                }
            }
        });
    });
});

module.exports = router;