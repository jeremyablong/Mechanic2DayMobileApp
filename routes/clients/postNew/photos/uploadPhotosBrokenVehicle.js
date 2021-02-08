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

        const { id, photos, selected } = req.body;

        const photo_array = [];

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                for (let index = 0; index < user.broken_vehicles_listings.length; index++) {
                    const listinggggg = user.broken_vehicles_listings[index];

                    if (listinggggg.id === selected.id) {
                        
                        console.log("selected", selected);

                        for (let index = 0; index < photos.length; index++) {
                            const photo = photos[index];

                            const uploaded_photo = photo.source.generatedID;

                            photo_array.push(`https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/${uploaded_photo}`);

                            if ((photos.length - 1) === index) {

                                listinggggg["photos"] = photo_array;
                                listinggggg.page = 4;

                                collection.save(user);

                                res.json({
                                    message: "Successfully updated/posted photos!",
                                    user,
                                    listing: listinggggg
                                })
                            }
                        }
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