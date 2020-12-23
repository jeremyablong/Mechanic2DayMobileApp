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

        const { email, fullName, google_id, google_pic } = req.body;

        const generatedID = uuidv4();

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const UserData = new User({
            fullName, 
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
            unique_id: generatedID
        });   

        collection.findOne({ google_id }).then((user) => {
            if (user) {
                // do nothing if user is already registered...
                res.json({
                    message: "Successfully registered new user!",
                    data: user
                })
            } else {
                // register the user now that we know they havent registere YET...

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
        }).catch((err) => {
            console.log(err);
        })
    });
});

module.exports = router;