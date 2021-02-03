const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const database = db.db("<dbname>");

        const collection = database.collection("roadside-assistance-queues");

        const { id } = req.body;

        collection.remove({ requested_by: id }, { justOne: true }, (err, doc) => {
            if (err) {
                res.json({
                    err,
                    message: "Critical error occurred..."
                })
            } else {
                res.json({
                    message: "Deleted!",
                    doc
                })
            }
        });
    });
});

module.exports = router;