// Module Import
const {model, Schema} = require('mongoose');


// Define Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please enter a username"],
        trim: true,
        lowercase: true,
    },
    fullName: {
        type: String,
        required: [true, "Please enter a full name"]
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        validate: {
            validator: function (email){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            },
            message: (usermail) => `${usermail.value} is not a valid email address!`
        },
        required: [true, "Please enter a email address"],

    },
    phone: {
        type: String,
        validate: {
            validator: function(v){
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message : userphone => `${userphone.value} is not a valid phone number!`
        },
        required: [true, "Please enter a phone number"]
    },
    password: {
        type: String,
        maxLength: [6, "Password must be at least 6 characters"],
        required: [true, "Please enter a password"]
    },
    bio: {
        type: String,
        required: [true, "Please enter a bio"],
        default: "Bio"
    },
    photo: {
        type: String,
        required: [true, "Please enter a photo"],
        default: "https://i.ibb.co/4pDNDk1/avatar.png"
    }

}, {
    timestamps: true
})

// Model Creation
const User = model("User", userSchema);

// Module Export
module.exports = User;