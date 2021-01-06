const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require('axios');
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { proposal, fullName, id } = req.body;

        collection.findOne({ unique_id: proposal.applicant }).then((user) => {
            if (user) {

                const notify_obj = {
                    id: uuidv4(),
                    system_date: Date.now(),
                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                    data: {
                        title: `${fullName} rejected your proposal to a job you applied for 😖`,
                        body: `${fullName} rejected your application/proposal to fix their vehicle. This could be for many different reasons, good luck on your future proposals!`
                    },
                    from: id,
                    link: "proposals"
                }

                if (user.notifications) {
                    user.notifications.push(notify_obj)
                } else {
                    user["notifications"] = [notify_obj];
                }

                // unconsole.log in production

                // const configgg = {
                //     headers: {
                //         "Authorization": "key=AAAA9zUSz2E:APA91bGvAIR1QhFku2iMGYp_nh6z6nDPRFiwqD6ORRo2vOkYBq8zs61RBFFPxOdVAdqJao98bIu4Y_I8enD-DNY05kyb5Jza1UlHJ4D73aUQuzhEsZ37LNaUgYrW3r8LFpsvdhDMPCMs",
                //         "Content-Type": "application/json"
                //     }
                // }

                // axios.post("https://fcm.googleapis.com/fcm/send", {
                //     "to": user.firebasePushNotificationToken,
                //     "notification": {
                //         "title": `${fullName} rejected your proposal to a job you applied for 😖`,
                //         "body": `${fullName} rejected your application/proposal to fix their vehicle. This could be for many different reasons, good luck on your future proposals!`,
                //         "mutable_content": true,
                //         "sound": "Tri-tone"
                //     },
                //    "data": {
                //         "url": proposal.profilePic ? proposal.profilePic : "https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/not-availiable.jpg",
                //         "dl": "notifications"
                //     }
                // }, configgg).then((res) => {
                //     console.log(res.data);
                // }).catch((err) => {
                //     console.log(err);
                // })

                for (let index = 0; index < user.applied_jobs.length; index++) {
                    const applied = user.applied_jobs[index];
                    
                    if (applied.applied_job_id === proposal.related) {

                        applied.accepted = false;
                        
                        collection.save(user);

                        res.json({
                            message: "Succesfully executed logic!",
                            applied
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