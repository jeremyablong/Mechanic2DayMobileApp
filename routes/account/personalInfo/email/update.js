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

        const { email, id } = req.body;

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                if (user.email) {
                    user.email = email;
                } else {
                    user["email"] = email;
                }

                collection.save(user);

                res.json({
                    message: "Updated email!",
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