const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
const axios = require("axios")

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
            tow_driver_id,
            fullName,
            profilePic,
            publicMessage,
            privateMessage
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


                            if (user.expectations_ranking) {
                                user.expectations_ranking = {
                                    much_better_than_expected:  "Much better than I expected" === expectation ? user.expectations_ranking.much_better_than_expected + 1 : user.expectations_ranking.much_better_than_expected,
                                    bit_better_than_expected:  "A bit better than I expected" === expectation ? user.expectations_ranking.bit_better_than_expected + 1 : user.expectations_ranking.bit_better_than_expected,
                                    same_as_expected:  "About the same that I expected" === expectation ? user.expectations_ranking.same_as_expected + 1 : user.expectations_ranking.same_as_expected,
                                    bit_worse_than_expected:  "A bit worse than I expected" === expectation ? user.expectations_ranking.bit_worse_than_expected + 1 : user.expectations_ranking.bit_worse_than_expected,
                                    much_worse_than_expected: "Much worse than I expected" === expectation ? user.expectations_ranking.much_worse_than_expected + 1 : user.expectations_ranking.much_worse_than_expected
                                }
                            } else {
                                user["expectations_ranking"] = {
                                    much_better_than_expected: "Much better than I expected" === expectation ? 1 : 0,
                                    bit_better_than_expected: "A bit better than I expected" === expectation ? 1 : 0,
                                    same_as_expected: "About the same that I expected" === expectation ? 1 : 0,
                                    bit_worse_than_expected: "A bit worse than I expected" === expectation ? 1 : 0,
                                    much_worse_than_expected: "Much worse than I expected" === expectation ? 1 : 0
                                }
                            }

                            if (user.compliements_reviews) {
                                user.compliements_reviews = {
                                    hospitality: hospitality === true ? user.compliements_reviews.hospitality + 1 : user.compliements_reviews.hospitality, 
                                    safe_driving: safeDriving === true ? user.compliements_reviews.safe_driving + 1: user.compliements_reviews.safe_driving,
                                    respectful: respectful === true ? user.compliements_reviews.respectful + 1 : user.compliements_reviews.respectful, 
                                    quick_responses: quickResponses === true ? user.compliements_reviews.quick_responses + 1 : user.compliements_reviews.quick_responses,
                                    informational: informational === true ? user.compliements_reviews.informational + 1 : user.compliements_reviews.informational, 
                                    knowledgable: knowledgable === true ? user.compliements_reviews.knowledgable + 1 : user.compliements_reviews.knowledgable, 
                                }
                            } else {
                                user["compliements_reviews"] = {
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

                            const new_review_text = {
                                id: uuidv4(),
                                date: moment(new Date()).format("dddd, MMMM Do YYYY"),
                                system_date: Date.now(),
                                review: publicMessage,
                                reviewer: {
                                    id: id,
                                    fullName: fullName,

                                }
                            }

                            if (user.text_reviews) {
                                user.text_reviews.push(new_review_text);
                            } else {
                                user["text_reviews"] = [new_review_text];
                            }

                            const review_overview = {
                                id: uuidv4(),
                                date: moment(new Date()).format("dddd, MMMM Do YYYY , h:mm:ss a"),
                                system_date: Date.now(),
                                private_message: privateMessage,
                                public_message: publicMessage,
                                compliments: {
                                    hospitality: hospitality === true ? true : false, 
                                    safe_driving: safeDriving === true ? true : false, 
                                    respectful: respectful === true ? true : false,
                                    quick_responses: quickResponses === true ? true : false, 
                                    informational: informational === true ? true : false,
                                    knowledgable: knowledgable === true ? true : false
                                }
                            };

                            if (user.review_overviews_list) {
                                user.review_overviews_list.push(review_overview)
                            } else {
                                user["review_overviews_list"] = [review_overview];
                            }

                            const configgg = {
                                headers: {
                                    "Authorization": `key=${config.get("firebaseCloudMessagingServerKey")}`,
                                    "Content-Type": "application/json"
                                }
                            }
            
                            const nofitication_addition = {
                                id: uuidv4(),
                                system_date: Date.now(),
                                date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                data: {
                                    title: `Your client ${fullName} left you a review!`,
                                    body: `Your client ${fullName} left you a review, head over to your profile to check it out now!`
                                },
                                from: id,
                                link: "notifications"
                            }

                            collection.save(user);
            
                            axios.post("https://fcm.googleapis.com/fcm/send", {
                                "to": user.firebasePushNotificationToken,
                                "notification": {
                                    "title": `Your client ${fullName} left you a review!`,
                                    "body": `Your client ${fullName} left you a review, head over to your profile to check it out now!`,
                                    "mutable_content": true,
                                    "sound": "Tri-tone"
                                },
                            "data": {
                                    // use company logo 
                                    "url": profilePic !== null ? profilePic : "https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/not-availiable.jpg",
                                    "dl": "notifications"
                                    // use company logo ^^^^^^^^^^^^^^^^^^^^^^^^^
                                }
                            }, configgg).then((res) => {
            
                                if (user.notifications) {
                                    user.notifications.push(nofitication_addition);
                                } else {
                                    user["notifications"] = [nofitication_addition];
                                }
                                
                                collection.save(user);
            
                                resolve();

                            }).catch((err) => {
                                console.log(err);
                            })
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