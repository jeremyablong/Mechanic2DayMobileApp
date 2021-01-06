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

        const { id, token } = req.body;

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                if (user.firebase_push_token) {
                    user.firebase_push_token = token;
                } else {
                    user["firebase_push_token"] = token;
                }

                collection.save(user);

                res.json({
                    message: "Successfully saved token!",
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