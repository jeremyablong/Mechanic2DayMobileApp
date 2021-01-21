const mongoose = require("mongoose");

const OrderSchema =  new mongoose.Schema({
    initial_location: {
        type: Object
    },
    tow_desination_information: {
        type: Object
    },
    tow_desination_street_address: {
        type: String
    }, 
    requested_by: {
        type: String
    },
    id: {
        type: String
    },
    roadside_service_required: {
        type: String
    },
    tow_required: {
        type: Boolean
    }
});
module.exports = Order = mongoose.model("roadside-assistance-queue", OrderSchema);