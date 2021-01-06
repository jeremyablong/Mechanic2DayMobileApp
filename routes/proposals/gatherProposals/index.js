const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { id } = req.body;

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                if (user.broken_vehicles_listings) {

                    const proposal_array = [];

                    const promiseee = new Promise((resolve, reject) => {
                        for (let index = 0; index < user.broken_vehicles_listings.length; index++) {
                            const listinggg = user.broken_vehicles_listings[index];
                            
                            if (listinggg.applicants_proposals) {
                                for (let idxxxx = 0; idxxxx < listinggg.applicants_proposals.length; idxxxx++) {
                                    const proposal = listinggg.applicants_proposals[idxxxx];
                                    proposal_array.push(proposal);
                                }
                            }

                            if ((user.broken_vehicles_listings.length - 1) === index) {
                                resolve(proposal_array);
                            }
                        }
                    })
                    promiseee.then((passedData) => {
                        console.log("passedData", passedData);

                        res.json({
                            message: "Gathered proposals!",
                            proposals: passedData
                        })
                    })
                } else {

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