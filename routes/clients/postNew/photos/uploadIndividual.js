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

        const { id, photo, selected } = req.body;

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                for (let index = 0; index < user.broken_vehicles_listings.length; index++) {
                    const listinggggg = user.broken_vehicles_listings[index];

                    if (listinggggg.id === selected.id) {
                        
                        console.log("selected", selected);

                        const generatedID = uuidv4();

                        const bufferImage = new Buffer(photo.replace(/^data:image\/\w+;base64,/, ""),'base64');

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
        
                            res.json({
                                message: "Uploaded!",
                                generatedID
                            })
                        });
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