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

        const { listing, id } = req.body;

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                for (let index = 0; index < user.broken_vehicles_listings.length; index++) {
                    const listingggg = user.broken_vehicles_listings[index];

                    if (listingggg.id === listing.id) {
                        user.broken_vehicles_listings.splice(index, 1);

                        collection.save(user);

                        res.json({
                            message: "Successfully deleted listing!",
                            user
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