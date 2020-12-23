const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const fs = require('fs');
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
const { decrypt } = require("../../crypto.js");

// need to fix how many times res.json is sent - can't send multiple headers
mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { code, reduxCode } = req.body;

        const decrypted = decrypt(reduxCode);

        console.log("decrypted", decrypted);

        if (decrypted === code.toLowerCase()) {
            res.json({
                message: "Successfully authenticated!"
            })
        } else {
            res.json({
                message: "Error... Code did not match."
            })
        }
    });
});

module.exports = router;