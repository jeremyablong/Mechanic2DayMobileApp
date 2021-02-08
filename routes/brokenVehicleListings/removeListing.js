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

        const { vehicle, client_id } = req.body;

        console.log("RE BBOYY", req.body);

        collection.findOne({ unique_id: client_id }).then(async (user) => {
            if (user) {

                console.log("THIS IS SPARTA/.....", user);

                for (let index = 0; index < user.broken_vehicles_listings.length; index++) {
                    const element = user.broken_vehicles_listings[index];
                    if (element.id === vehicle.id) {

                        element.live = "COMPLETED";

                        console.log("MATCHHHHH", element);

                        // await collection.save(user);

                        res.json({
                            message: "Successfully marked as COMPLETE.",
                            user
                        })
                    }
                }
            } else {
                console.log(err);
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