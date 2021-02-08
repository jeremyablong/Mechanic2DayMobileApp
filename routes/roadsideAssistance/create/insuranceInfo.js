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

        const { policy_number, selected_insurance_policies, insurance_photos, id, listing_id } = req.body;

        const pictures_array = [];

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {
                const photos = [];

                for (let index = 0; index < user.roadside_assistance_listings.length; index++) {
                    const listinggg = user.roadside_assistance_listings[index];
                    
                    if (listinggg.id === listing_id) {
                        console.log("match!!", listinggg);

                        const promiseee = new Promise((resolve, reject) => {
                            for (let indexxxxxxx = 0; indexxxxxxx < insurance_photos.length; indexxxxxxx++) {

                                const generatedID = uuidv4();
    
                                const photo = insurance_photos[indexxxxxxx];
    
                                photos.push(`https://s3.us-west-1.wasabisys.com/${config.get("wasabiBucket")}/${generatedID}`);
    
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

                                    pictures_array.push(dataaa);
    
                                    if (insurance_photos.length === pictures_array.length) {
                                        resolve();
                                    }
                                });
                            }
                        })

                        promiseee.then((passedValues) => {
                            listinggg.insurance_info = {
                                policy_number,
                                selected_insurance_policies,
                                insurance_proof_images: photos
                            }
                            listinggg.page = 4;

                            collection.save(user);

                            res.json({
                                message: "Successfully updated listing with insurance information!",
                                listing: listinggg
                            })
                        })
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