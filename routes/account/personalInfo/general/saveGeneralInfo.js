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

        const { email, id, fullName, gender } = req.body;

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                if (fullName.length > 0) {
                    user.preferred_name = fullName.toLowerCase();
                }
                if (email.length > 0) {
                    user.email = email.toLowerCase();
                }
                if (gender.length > 0) {
                    user.gender = gender;
                }

                collection.save(user);

                res.json({
                    message: "Successfully saved the changed data!",
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