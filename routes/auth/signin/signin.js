const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const fs = require('fs');
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');


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

                    res.json({
                        message: "Successfully authenticated!",
                        user
                    })
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