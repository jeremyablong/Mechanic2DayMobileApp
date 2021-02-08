const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const S3 = require('aws-sdk/clients/s3');
const AWS = require('aws-sdk');
const wasabiEndpoint = new AWS.Endpoint(config.get("wasabiEndpoint"));
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const accessKeyId = config.get("wasabiAccessKey");
const secretAccessKey = config.get("wasabiSecretAccessKey");

const s3 = new S3({
	endpoint: wasabiEndpoint,
	region: config.get("wasabiRegion"),
	accessKeyId,
	secretAccessKey
});

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { id, location, company_image } = req.body;

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                const generatedID = uuidv4();

                const new_data = {
                    id: uuidv4(),
                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                    system_date: Date.now(),
                    location,
                    poster: id,
                    page: 2,
                    live: false,
                    company_image: `https://s3.us-west-1.wasabisys.com/${config.get("wasabiBucket")}/${generatedID}`
                }

                if (user.roadside_assistance_listings) {
                    user.roadside_assistance_listings.push(new_data);
                } else {
                    user["roadside_assistance_listings"] = [new_data];
                }

                const bufferImage = new Buffer(company_image.replace(/^data:image\/\w+;base64,/, ""),'base64');
                                
                s3.putObject({
                    Body: bufferImage,
                    Bucket: config.get("wasabiBucket"),
                    Key: generatedID,
                    ContentEncoding: 'base64'
                }, (errorr, dataaa) => {
                    if (errorr) {
                        console.log(errorr);
                    }
                    console.log(dataaa);

                    collection.save(user);

                    res.json({
                        message: "Successfully updated and generated roadside assistance listing!",
                        listing: new_data
                    })
                });
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