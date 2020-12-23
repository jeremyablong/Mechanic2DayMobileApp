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

        const { 
            formattedValue,
            phoneNumber ,
            id
        } = req.body;

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                console.log("user", user);

                const new_addition = {
                    unformatted: phoneNumber,
                    number: formattedValue,
                    id: uuidv4()
                };

                if (typeof user.phoneNumber !== "undefined" && user.phoneNumber.length > 0) {
                    user.phoneNumber.push(new_addition)
                } else {
                    user["phoneNumber"] = [new_addition];
                }

                collection.save(user);

                res.json({
                    message: "Successfully added new phone number!",
                    user
                })

            } else {
                console.log("Could not find user...");
            }
        }).catch((err) => {
            console.log(err);
        })
    });
});

module.exports = router;