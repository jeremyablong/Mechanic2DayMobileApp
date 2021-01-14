const mongoose = require("mongoose");

const UserSchema =  new mongoose.Schema({
    address: {
        type: String
    },
    authyID: {
        type: Number
    },
    birthdate: {
        type: String
    }, 
    gender: {
        type: String
    },
    fullName: {
        type: String
    },
    password: {
        type: String
    },
    phoneNumber: {
        type: Array
    },
    email: {
        type: String
    },
    paypal_authorization: {
        type: Object
    },
    google_id: {
        type: String
    }, 
    profilePics: {
        type: Array
    },
    phoneNumberAuth: {
        type: String
    },
    wholeAddress: {
        type: Object
    },
    accountType: {
        type: String
    },
    unique_id: {
        type: String
    },
    register_system_date: {
        type: Number
    },
    register_date: {
        type: String
    },
    firebasePushNotificationToken: {
        type: String
    }
});

module.exports = User = mongoose.model("user", UserSchema);