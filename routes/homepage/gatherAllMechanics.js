const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        collection.find({ accountType: "mechanic" }).toArray((err, users) => {
            if (err) {
                console.log(err);

                res.json({
                    err,
                    message: "Critical error..."
                })
            } else {
                console.log(users);

                res.json({
                    message: "Successfully gathered users!",
                    users
                })
            }
        })
    });
});

module.exports = router;