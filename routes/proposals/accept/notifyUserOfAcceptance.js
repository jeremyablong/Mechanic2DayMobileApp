const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("users");

        const { proposal, other, listinggg, other_user } = req.body;

        collection.findOne({ unique_id: proposal.applicant }).then((user) => {
            if (user) {
            
                const accepted = {
                    id: uuidv4(),
                    accepted_job_id: proposal.related,
                    agreement_date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                    agreement_system_date: Date.now(),
                    agreed_amount: proposal.amount,
                    currency: "$ - USD",
                    initiator: other,
                    other_user,
                    other_user_agrees_completion: false,
                    poster_agrees_completion: false
                };

                if (user.accepted_jobs) {
                    user.accepted_jobs.push(accepted)
                } else {
                    user["accepted_jobs"] = [accepted];
                }

                collection.save(user);

                for (let index = 0; index < user.applied_jobs.length; index++) {
                    const job = user.applied_jobs[index];
                    
                    if (job.applied_job_id === listinggg.id) {

                        job.accepted = true;
                    }
                }

                collection.save(user);

                res.json({
                    message: "Succesfully notified user!",
                    user
                })
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