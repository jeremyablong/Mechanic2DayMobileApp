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

        const { 
            pickup_times_rating, 
            communication_rating, 
            expectation,
            drove_safely_rating, 
            informational_rating, 
            honest_polite_rating, 
            overall_interaction_rating, 
            proper_vehicle_condition_rating,
            hospitality, 
            safeDriving, 
            respectful,
            quickResponses, 
            informational, 
            knowledgable,
            id,
            tow_driver_id
        } = req.body;

        collection.find({ unique_id: { "$in": [tow_driver_id, id]}}).toArray((err, users) => {
            if (err) {

                console.log(err);

                res.json({
                    message: "Critical error occurred...",
                    err
                })
            } else {

                const promiseee = new Promise((resolve, reject) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // TOW TRUCK user
                        if (user.unique_id === tow_driver_id) {

                            if (user.review_count) {
                                user.review_count = user.review_count + 1;
                            } else {
                                user["review_count"] = 1;
                            }

                            if (user.compliements_reviews) {
                                user.compliements_reviews = {
                                    expectation: expectation === true ? user.compliements_reviews.expectation + 1 : user.compliements_reviews.expectation,
                                    hospitality: hospitality === true ? user.compliements_reviews.hospitality + 1 : user.compliements_reviews.hospitality, 
                                    safe_driving: safeDriving === true ? user.compliements_reviews.safe_driving + 1: user.compliements_reviews.safe_driving,
                                    respectful: respectful === true ? user.compliements_reviews.respectful + 1 : user.compliements_reviews.respectful, 
                                    quick_responses: quickResponses === true ? user.compliements_reviews.quick_responses + 1 : user.compliements_reviews.quick_responses,
                                    informational: informational === true ? user.compliements_reviews.informational + 1 : user.compliements_reviews.informational, 
                                    knowledgable: knowledgable === true ? user.compliements_reviews.knowledgable + 1 : user.compliements_reviews.knowledgable, 
                                }
                            } else {
                                user["compliements_reviews"] = {
                                    expectation: expectation === true ? 1 : 0,
                                    hospitality: hospitality === true ? 1 : 0, 
                                    safe_driving: safeDriving === true ? 1 : 0, 
                                    respectful: respectful === true ? 1 : 0,
                                    quick_responses: quickResponses === true ? 1 : 0, 
                                    informational: informational === true ? 1 : 0,
                                    knowledgable: knowledgable === true ? 1 : 0
                                }
                            }

                            if (user.review_categories) {
                                user.review_categories = {
                                    pickup_times_rating: (user.review_categories.pickup_times_rating + pickup_times_rating) / user.review_count,
                                    communication_rating: (user.review_categories.communication_rating + communication_rating) / user.review_count,
                                    drove_safely_rating: (user.review_categories.drove_safely_rating + drove_safely_rating) / user.review_count,
                                    informational_rating: (user.review_categories.informational_rating + informational_rating) / user.review_count,
                                    honest_polite_rating: (user.review_categories.honest_polite_rating + honest_polite_rating) / user.review_count,
                                    overall_interaction_rating: (user.review_categories.overall_interaction_rating + overall_interaction_rating) / user.review_count,
                                    proper_vehicle_condition_rating: (user.review_categories.proper_vehicle_condition_rating + proper_vehicle_condition_rating) / user.review_count
                                }
                            } else {
                                user["review_categories"] = {
                                    pickup_times_rating, 
                                    communication_rating, 
                                    drove_safely_rating, 
                                    informational_rating, 
                                    honest_polite_rating, 
                                    overall_interaction_rating, 
                                    proper_vehicle_condition_rating
                                }
                            }

                            console.log("user.review_categories", user.review_categories);


                            console.log("tow truck driver after alterations", user);

                            collection.save(user);
                            
                            resolve();
                        }
                    }
                })  

                promiseee.then((passedData) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // signed in user
                        if (user.unique_id === id) {

                            user.towing_services_start = {};

                            collection.save(user);

                            console.log("USER AFTER  CLEARING", user);

                            res.json({
                                message: "Successfully submitted review and completed job!",
                                user
                            })
                        }
                    }
                })
            }
        });
    });
});

module.exports = router;