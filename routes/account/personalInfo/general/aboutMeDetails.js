const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const S3 = require('aws-sdk/clients/s3');
const AWS = require('aws-sdk');
const wasabiEndpoint = new AWS.Endpoint('s3.us-west-1.wasabisys.com');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const accessKeyId = config.get("wasabiAccessKey");
const secretAccessKey = config.get("wasabiSecretAccessKey");

const s3 = new S3({
	endpoint: wasabiEndpoint,
	region: 'us-west-1',
	accessKeyId,
	secretAccessKey
});


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { id, profilePicBase64, work_name, location, description } = req.body;

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                if (user.general_information) {
                    user.general_information = {
                        about_me: description !== user.general_information.description ? description : user.general_information.description,
                        location: location !== null ? location : user.general_information.location,
                        work: work_name !== null ? work_name : user.general_information.work_name
                    }

                    if (profilePicBase64 !== null) {

                        const generatedID = uuidv4();

                        const bufferImage = new Buffer(profilePicBase64.replace(/^data:image\/\w+;base64,/, ""),'base64');

                        s3.putObject({
                            Body: bufferImage,
                            Bucket: "mechanic-mobile-app",
                            Key: generatedID,
                            ContentEncoding: 'base64'
                        }, (errorr, dataaa) => {
                            if (errorr) {
                                console.log(errorr);
                            }
                            console.log(dataaa);

                            if (user.profilePics && user.profilePics.length > 0) {
                                user.profilePics.push({
                                    id: uuidv4(),
                                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                    system_date: Date.now(),
                                    full_url: `https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/${generatedID}`,
                                    poster: user.unique_id
                                });
                            } else {
                                user["profilePics"] = [{
                                    id: uuidv4(),
                                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                    system_date: Date.now(),
                                    full_url: `https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/${generatedID}`,
                                    poster: user.unique_id
                                }];
                            }

                            collection.save(user);
        
                            res.json({
                                message: "Successfully saved the changed data!",
                                user
                            })
                        });
                    } else {
                        console.log("no picture provided");

                        user.general_information = {
                            about_me: description !== user.general_information.description ? description : user.general_information.description,
                            location: location !== null ? location : user.general_information.location,
                            work: work_name !== null ? work_name : user.general_information.work_name
                        }

                        collection.save(user);
        
                        res.json({
                            message: "Successfully saved the changed data!",
                            user
                        })
                    }
                } else {
                    user["general_information"] = {
                        about_me: description.length > 0 ? description : "None Provided.",
                        location: location !== null ? location : "None Provided.",
                        work: work_name !== null ? work_name : "None Provided."
                    }

                    if (profilePicBase64 !== null) {

                        const generatedID = uuidv4();

                        const bufferImage = new Buffer(profilePicBase64.replace(/^data:image\/\w+;base64,/, ""),'base64');

                        s3.putObject({
                            Body: bufferImage,
                            Bucket: "mechanic-mobile-app",
                            Key: generatedID,
                            ContentEncoding: 'base64'
                        }, (errorr, dataaa) => {
                            if (errorr) {
                                console.log(errorr);
                            }
                            console.log(dataaa);

                            if (user.profilePics && user.profilePics.length > 0) {
                                user.profilePics.push({
                                    id: uuidv4(),
                                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                    system_date: Date.now(),
                                    full_url: `https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/${generatedID}`,
                                    poster: user.unique_id
                                });
                            } else {
                                user["profilePics"] = [{
                                    id: uuidv4(),
                                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                    system_date: Date.now(),
                                    full_url: `https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/${generatedID}`,
                                    poster: user.unique_id
                                }];
                            }

                            collection.save(user);
        
                            res.json({
                                message: "Successfully saved the changed data!",
                                user
                            })
                        });
                    } else {
                        console.log("no picture provided");
                    }
                }
            } else {
                res.json({
                    message: "Could not locate the appropriate user..."
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    });
});

module.exports = router;