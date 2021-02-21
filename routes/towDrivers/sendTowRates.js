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

        const { id, company_name } = req.body;

        console.log("passed:", req.body);

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                for (let index = 0; index < user.roadside_assistance_listings.length; index++) {
                    const listing = user.roadside_assistance_listings[index];
                
                    if (listing.company_name === company_name) {
                        console.log("listing", listing);

                        res.json({
                            message: "Successfully located tow company rates!",
                            listing
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