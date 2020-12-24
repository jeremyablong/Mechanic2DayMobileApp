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
    }
});

module.exports = User = mongoose.model("user", UserSchema);