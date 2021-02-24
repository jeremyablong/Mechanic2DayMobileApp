const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require('axios');
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
const _ = require("lodash");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, responseeeeee) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { id } = req.body;

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                console.log("This is my user....:", user); 

                axios.post(`${config.get("ngrok_url")}/notify/other/user/arrival/tow`, {
                    id: user.active_roadside_assistance_job.requestee_id,
                    fullName: user.fullName,
                    profilePic: user.profilePics.length > 0 ? user.profilePics[user.profilePics.length - 1].full_url : `https://s3.us-west-1.wasabisys.com/${config.get("wasabiBucket")}/not-availiable.jpg`,
                    other_user_id: id
                }).then((res) => {
                    if (res.data.message === "Notified!") {
                        console.log("success!", res.data.other_user);

                        user.active_roadside_assistance_job["arrived"] = true;
                        user.active_roadside_assistance_job["completed_job"] = false;
                        user.active_roadside_assistance_job.payment_recieved = false;
                        user.active_roadside_assistance_job.confirmed_onsite = true;
                        user.active_roadside_assistance_job["agree_job_completed"] = false;
                        user.active_roadside_assistance_job["current_page"] = "complete-trip-no-tow";

                        collection.save(user, (err, data) => {
                            if (err) {
                                console.log(err);
                            } else {
                                if (_.has(res.data.other_user.towing_services_start, "arrived") && res.data.other_user.towing_services_start.arrived === true && user.active_roadside_assistance_job.arrived === true) {
                                    responseeeeee.json({
                                        message: "Notified other user successfully and both users have agreed the driver has arrived!",
                                        user
                                    })
                                } else {
                                    responseeeeee.json({
                                        message: "Only ONE user has agreed that the driver has arrived."
                                    })
                                }
                            }
                        });
                    } else {
                        console.log("Err", res.data);
                    }
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                responseeeeee.json({
                    message: "Could not locate the appropriate user..."
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    });
});

module.exports = router;