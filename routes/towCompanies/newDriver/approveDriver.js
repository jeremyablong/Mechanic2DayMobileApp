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

        console.log(req.body);

        collection.find({unique_id: {"$in" : [selected.user_id, id]}}).toArray((err, users) => {
            if (err) {
                console.log(err);

                res.json({
                    message: "Could not find users...",
                    err
                })
                
            } else {

                const promiseee = new Promise((resolve, reject) => {
                    for (let idxxxxx = 0; idxxxxx < users.length; idxxxxx++) {
                        const user = users[idxxxxx];
                        // signed-in user
                        if (user.unique_id === id) {
                            for (let index = 0; index < user.tow_truck_drivers.length; index++) {
                                const userrrr = user.tow_truck_drivers[index];
                                
                                if (userrrr.user_id === selected.user_id) {
                                    console.log("match!", userrrr);
    
                                    userrrr.approved = true;
                                    
                                    collection.save(user);

                                    console.log("AFTER ONE ", user);

                                    resolve(user);
                                }
                            }
                        }
                    }
                })
                promiseee.then((passedData) => {
                    for (let idxxxxx = 0; idxxxxx < users.length; idxxxxx++) {
                        const user = users[idxxxxx];
                        // other user
                        if (user.unique_id === selected.user_id) {
                            user.employed_by = id;
    
                            console.log("AFTER!", user);

                            collection.save(user);
                            
                            return passedData;
                        }
                    }
                }).then((finalData) => {
                    res.json({
                        message: "Driver approved!",
                        drivers: finalData.tow_truck_drivers
                    })
                })
            }
        })
    });
});

module.exports = router;