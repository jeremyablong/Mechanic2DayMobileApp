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
            mondayClosing, 
            tuesdayOpening, 
            tuesdayClosing, 
            wednesdayOpening, 
            wednesdayClosing, 
            thursdayOpening, 
            thursdayClosing, 
            fridayOpening, 
            fridayClosing, 
            mondayOpening, 
            saturdayOpening, 
            saturdayClosing, 
            sundayOpening, 
            sundayClosing, 
            owners, 
            companyName, 
            phoneNumber, 
            id,
            passed_listing_id
        } = req.body;

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                for (let index = 0; index < user.roadside_assistance_listings.length; index++) {
                    const listing = user.roadside_assistance_listings[index];
                    if (listing.id === passed_listing_id) {
                        listing.operational_hours = {
                            sunday_opening: sundayOpening,
                            sunday_closing: sundayClosing,
                            monday_opening: mondayOpening,
                            monday_closing: mondayClosing,
                            tuesday_opening: tuesdayOpening,
                            tuesday_closing: tuesdayClosing,
                            wednesday_opening: wednesdayOpening,
                            wendesday_closing: wednesdayClosing,
                            thursday_opening: thursdayOpening,
                            thursday_closing: thursdayClosing,
                            friday_opening: fridayOpening,
                            friday_closing: fridayClosing,
                            saturday_opening: saturdayOpening,
                            saturday_closing: saturdayClosing
                        };
                        listing.owners = owners;
                        listing.company_name = companyName;
                        listing.company_phone_number = phoneNumber;
                        listing.page = 5;

                        collection.save(user);

                        console.log("listing found!!!", listing);

                        res.json({
                            message: "Successfully updated general listing information!",
                            listing
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