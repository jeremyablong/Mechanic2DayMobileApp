const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const _ = require("lodash");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { type } = req.query;

        console.log("type", type);

        const shuffle = (array) => {
            let currentIndex = array.length, temporaryValue, randomIndex;
          
            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
          
              // Pick a remaining element...
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;
          
              // And swap it with the current element.
              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
            }
          
            return array;
        }

        collection.find({ "broken_vehicles_listings.type_of_repair": type }).toArray((err, results) => {
            if (err) {

                res.json({
                    message: "An error occurred...",
                    err
                })
            } else {
                console.log("results", results);

                const new_array = [];

                const promiseee = new Promise((resolve, reject) => {

                    const shuffled_results = shuffle(results);

                    for (let index = 0; index < shuffled_results.length; index++) {
                        const result = shuffled_results[index];

                        const shuffled = null;

                        for (let indexxxx = 0; indexxxx < result.broken_vehicles_listings.length; indexxxx++) {
                            const broken = result.broken_vehicles_listings[indexxxx];
        
                            new_array.push(broken);
                        }
                        
                        if ((results.length - 1) === index) {
                            console.log("new_array", new_array);
                            resolve(new_array);
                        }
                    }
                })

                promiseee.then((passedData) => {
                      
                    res.json({
                        message: "Gathered the selected category!",
                        results: passedData
                    })
                });
            }
        })
    });
});

module.exports = router;