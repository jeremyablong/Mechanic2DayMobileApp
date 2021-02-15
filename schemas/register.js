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
    boosts: {
        type: Number
    },
    blockchainCredentials: {
        type: Object
    },
    phoneNumber: {
        type: Array
    },
    pending_application: {
        type: Boolean
    },
    active_employee: {
        type: Boolean
    },
    stripe_customer_account: {
        type: Object
    },
    stripe_connect_account: {
        type: Object
    },
    company_id: {
        type: String
    },
    company_name: {
        type: String
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
    review_count: {
        type: Number
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