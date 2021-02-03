const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const { decrypt } = require("../../../crypto");
const stripe = require('stripe')(config.get("stripeSecretKey"));


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, responseeeeeeeee) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { 
            length_in_meters,
            company_informtion,
            selected,
            fullName,
            client_id,
            tow_driver_id
        } = req.body;

        console.log("req.body", req.body);

        collection.find({ unique_id: {"$in" : [tow_driver_id, client_id]}}).toArray((err, users) => {
            if (err) {

                responseeeeeeeee.json({
                    message: "Critical Error occurred...",
                    err
                })
            } else {

                const additional_new_data = {
                    id: uuidv4(),
                    start_system_date: Date.now(),
                    start_date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                    pickup_location: selected.initial_location,
                    dropoff_location: selected.tow_desination_information ? selected.tow_desination_information : "tow-not-required",
                    dropoff_location_street: selected.tow_desination_street_address ? selected.tow_desination_street_address : "tow-not-required",
                    requestee_picture: selected.profile_picture,
                    requesee_full_name: selected.fullName,
                    requestee_id: selected.requested_by,
                    active: true
                };
                const promiseee = new Promise((resolve, reject) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // TOW TRUCK DRIVER user...
                        if (user.unique_id === tow_driver_id) {
                            if (user.active_roadside_assistance_job) {
                                user.active_roadside_assistance_job = additional_new_data;
                            } else {
                                user["active_roadside_assistance_job"] = additional_new_data;
                            }

                            user.pending_application = false;
    
                            // console.log("------- This is the TOW TRUCK DRIVER ------- ", user);
    
                            collection.save(user);

                            resolve();
                        }
                    }
                })

                promiseee.then((passedData) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // CLIENT USER
                        if (user.unique_id === client_id) {
                            user.towing_services_start.order_status = "in-progress";
                            user.towing_services_start.page = "mapview-in-progress";


                            collection.save(user);
                            
                            for (let indxxxxxx = 0; indxxxxxx < users.length; indxxxxxx++) {
                                const userrr = users[indxxxxxx];
                                if (userrr.unique_id === tow_driver_id) {
                                    user.towing_services_start.tow_driver_infomation = {
                                        full_name: userrr.fullName,
                                        gender: userrr.gender,
                                        unique_id: userrr.unique_id,
                                        birthdate: userrr.birthdate,
                                        starting_location: userrr.current_location
                                    };

                                    user.towing_services_start.assigned_company = userrr.company_name;

                                    collection.save(user);

                                    const custom_notification = {
                                        id: uuidv4(),
                                        system_date: Date.now(),
                                        date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                        data: {
                                            title: `${userrr.fullName} has accepted your request and is now on their way to your location!`,
                                            body: `${userrr.fullName} is now headed to your location to assist you with your tow and/or roadside assistance request...`
                                        },
                                        from: tow_driver_id,
                                        link: "notifications"
                                    };

                                    const configgg = {
                                        headers: {
                                            "Authorization": "key=AAAA9zUSz2E:APA91bGvAIR1QhFku2iMGYp_nh6z6nDPRFiwqD6ORRo2vOkYBq8zs61RBFFPxOdVAdqJao98bIu4Y_I8enD-DNY05kyb5Jza1UlHJ4D73aUQuzhEsZ37LNaUgYrW3r8LFpsvdhDMPCMs",
                                            "Content-Type": "application/json"
                                        }
                                    }
                    
                                    axios.post("https://fcm.googleapis.com/fcm/send", {
                                        "to": userrr.firebasePushNotificationToken,
                                        "notification": {
                                            "title": `${user.fullName} has accepted your request and your job is now active!`,
                                            "body": "Your job is now ACTIVE! Please proceed to the 'manage active tow' page to get directions and more information.",
                                            "mutable_content": true,
                                            "sound": "Tri-tone"
                                        },
                                    "data": {
                                            "url": user.profilePics.length > 0 ? user.profilePics[user.profilePics.length - 1].full_url : "https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/not-availiable.jpg",
                                            "dl": "notifications"
                                        }
                                    }, configgg).then(async (responseeeeee) => {
                                        // console.log(responseeeeee.data);

                                        if (userrr.notifications) {
                                            userrr.notifications.push(custom_notification);
                                        } else {
                                            userrr["notifications"] = [custom_notification];
                                        }


                                        collection.save(user);

                                        const cost_milage = (length_in_meters / 1609.34) * company_informtion.standard_tow_fees.per_mile_fee;
                                        const cost_flat_rate = company_informtion.standard_tow_fees.tow_price;

                                        console.log("cost_milage", cost_milage, "cost_flat_rate", cost_flat_rate);

                                        for (let indxxxxxxxx = 0; indxxxxxxxx < user.card_payment_methods.length; indxxxxxxxx++) {
                                            const cardddd = user.card_payment_methods[indxxxxxxxx];
                                            
                                            if (cardddd.primary === true) {

                                                axios.get(`${config.get("ngrok_url")}/gather/company/related/information`, {
                                                    params: {
                                                        company_id: userrr.company_id
                                                    }
                                                }).then(async (resppppppppp) => {
                                                    console.log(resppppppppp.data);

                                                    const { stripe_account_id } = resppppppppp.data;

                                                    const paymentIntent = await stripe.paymentIntents.create({
                                                        payment_method_types: ['card'],
                                                        amount: Math.round((cost_milage + cost_flat_rate) * 100),
                                                        currency: 'usd',
                                                        application_fee_amount: 500,
                                                        transfer_data: {
                                                          destination: stripe_account_id,
                                                        },
                                                    }, async (errrrrrrr, charge) => {
                                                        if (errrrrrrr) {
                                                            console.log(errrrrrrr);
                                                        } else {
                                                            console.log("charge", charge);

                                                            user.towing_services_start.charge = charge;
                                                            userrr.active_roadside_assistance_job.charge = charge;

                                                            collection.save(user);
    
                                                            collection.save(userrr);

                                                            axios.post(`${config.get("ngrok_url")}/remove/queued/item`, {
                                                                selected
                                                            }).then((responseeeeeeeeeeeeeeeeeee) => {
    
                                                                console.log("CHARGE: ", charge);

                                                                if (responseeeeeeeeeeeeeeeeeee) {
                                                                    responseeeeeeeee.json({
                                                                        message: "Successfully executed logic!"
                                                                    })
                                                                }
                                                            }).catch((critical_err) => {
                                                                console.log(critical_err);
                                                            })
                                                        }
                                                    });
                                                   
                                                }).catch((errrrrrrrooooooooor) => {
                                                    console.log(errrrrrrrooooooooor);
                                                })
                                            }
                                        }
                                    }).catch((errorrrrrrr) => {
                                        console.log(errorrrrrrr);
                                    })
                                }
                            }
                        }
                    }
                });
            }
        })
    });
});

module.exports = router;