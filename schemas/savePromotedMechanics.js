const mongoose = require("mongoose");

const UserSchema =  new mongoose.Schema({
    createdAt: { 
        type: Date, 
        expires: 86400 
    },
    fullName: {
        type: String
    },
    accountType: {
        type: String
    },
    review_count: {
        type: Number
    },
    stripe_connect_account: {
        type: Object
    },
    profilePics: {
        type: Array
    },
    phoneNumber: {
        type: Array
    },
    register_system_date: {
        type: Number
    },
    birthdate: {
        type: String
    },
    company_id: {
        type: String
    },
    company_name: {
        type: String
    },
    register_date: {
        type: String
    },
    unique_id: {
        type: String
    },
    firebasePushNotificationToken: {
        type: String
    },
    employed_by: {
        type: String
    },
    gender: {
        type: String
    }
});

module.exports = User = mongoose.model("promoted-mechanic-profile", UserSchema);