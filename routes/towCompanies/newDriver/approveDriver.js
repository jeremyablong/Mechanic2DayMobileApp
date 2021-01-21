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

        const { id, selected } = req.body;

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                for (let index = 0; index < user.tow_truck_drivers.length; index++) {
                    const userrrr = user.tow_truck_drivers[index];
                    
                    if (userrrr.user_id === selected.user_id) {
                        console.log("match!", userrrr);

                        userrrr.approved = true;
                        
                        collection.save(user);

                        res.json({
                            message: "Driver approved!",
                            drivers: user.tow_truck_drivers
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