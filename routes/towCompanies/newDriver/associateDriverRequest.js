const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { id, company_id } = req.body;

        console.log(req.body);

        collection.findOne({ unique_id: company_id }).then((user) => {
            if (user) {

                if (user.tow_truck_drivers) {
                    user.tow_truck_drivers.push({
                        user_id: id,
                        approved: false
                    });
                } else {
                    user["tow_truck_drivers"] = [{
                        user_id: id,
                        approved: false
                    }];
                }

                collection.save(user);

                res.json({
                    message: "Associated and notified tow company of your request!",
                    user
                })
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