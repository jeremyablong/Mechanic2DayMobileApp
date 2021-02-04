const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { 
            id,
            accurate_pickup_location, 
            helpful, 
            other_user_id,
            respectful, 
            quickResponses, 
            descriptive, 
            expectation, 
            safe, 
            pickup_accurate_rating, 
            communication_rating, 
            informational_rating, 
            safe_during_interaction,
            overall_interaction_rating, 
            honest_polite_rating, 
            as_described,
            fullName,
            profilePic,
            privateMessage,
            publicMessage,
            agreement
        } = req.body;


        collection.find({ unique_id: { "$in": [other_user_id, id]}}).toArray((err, users) => {
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
                        // CLIENT user
                        if (user.unique_id === other_user_id) {

                            if (user.review_count) {
                                user.review_count = user.review_count + 1;
                            } else {
                                user["review_count"] = 1;
                            }

                            if (user.compliements_reviews) {
                                user.compliements_reviews = {
                                    accurate_pickup_location: accurate_pickup_location === true ? user.compliements_reviews.accurate_pickup_location + 1 : user.compliements_reviews.accurate_pickup_location, 
                                    helpful: helpful === true ? user.compliements_reviews.helpful + 1: user.compliements_reviews.helpful,
                                    respectful: respectful === true ? user.compliements_reviews.respectful + 1 : user.compliements_reviews.respectful, 
                                    quick_responses: quickResponses === true ? user.compliements_reviews.quick_responses + 1 : user.compliements_reviews.quick_responses,
                                    descriptive: descriptive === true ? user.compliements_reviews.descriptive + 1 : user.compliements_reviews.descriptive, 
                                    safe: safe === true ? user.compliements_reviews.safe + 1 : user.compliements_reviews.safe, 
                                }
                            } else {
                                user["compliements_reviews"] = {
                                    accurate_pickup_location: accurate_pickup_location === true ? 1 : 0, 
                                    helpful: helpful === true ? 1 : 0, 
                                    respectful: respectful === true ? 1 : 0,
                                    quick_responses: quickResponses === true ? 1 : 0, 
                                    descriptive: descriptive === true ? 1 : 0,
                                    safe: safe === true ? 1 : 0
                                }
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

                            if (user.review_categories) {
                                user.review_categories = {
                                    pickup_accurate_rating: (user.review_categories.pickup_accurate_rating + pickup_accurate_rating) / user.review_count,
                                    communication_rating: (user.review_categories.communication_rating + communication_rating) / user.review_count,
                                    informational_rating: (user.review_categories.informational_rating + informational_rating) / user.review_count,
                                    safe_during_interaction: (user.review_categories.safe_during_interaction + safe_during_interaction) / user.review_count,
                                    overall_interaction_rating: (user.review_categories.overall_interaction_rating + overall_interaction_rating) / user.review_count,
                                    honest_polite_rating: (user.review_categories.honest_polite_rating + honest_polite_rating) / user.review_count,
                                    as_described: (user.review_categories.as_described + as_described) / user.review_count
                                }
                            } else {
                                user["review_categories"] = {
                                    pickup_accurate_rating, 
                                    communication_rating,
                                    informational_rating,
                                    safe_during_interaction,
                                    overall_interaction_rating,
                                    honest_polite_rating,
                                    as_described
                                }
                            };

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
                                    accurate_pickup_location: accurate_pickup_location, 
                                    helpful: helpful,
                                    respectful: respectful, 
                                    quick_responses: quickResponses,
                                    descriptive: descriptive, 
                                    safe: safe
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
                                    title: `Your roadside agent ${fullName} left you a review!`,
                                    body: `Your roadside agent ${fullName} left you a review, head over to your profile to check it out now!`
                                },
                                from: id,
                                link: "notifications"
                            }
            
                            axios.post("https://fcm.googleapis.com/fcm/send", {
                                "to": user.firebasePushNotificationToken,
                                "notification": {
                                    "title": `Your roadside agent ${fullName} left you a review!`,
                                    "body": `Your roadside agent ${fullName} left you a review, head over to your profile to check it out now!`,
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

                            for (let idxxxx = 0; idxxxx < user.accepted_jobs.length; idxxxx++) {
                                const accepted_job = user.accepted_jobs[idxxxx];
                                
                                if (accepted_job.id === agreement.id) {
                                    
                                    user.accepted_jobs.splice(idxxxx, 1);

                                    collection.save(user);
                                    
                                    res.json({
                                        message: "Successfully submitted review and completed job!",
                                        user
                                    })
                                }
                            }
                        }
                    }
                })
            }
        });
    });
});

module.exports = router;