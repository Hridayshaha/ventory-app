// Module Import
const {model, Schema} = require('mongoose');
const bcrypt = require('bcrypt');

// Define Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please enter a username"],
        trim: true,
        lowercase: true,
        unique: true
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
        required: [true, "Please enter a phone number"]
    },
    password: {
        type: String,
        minLength: [6, "Password must be at least 6 characters"],
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

userSchema.pre("save", async function(next) {

    if(!this.isModified("password")) {
        return next();
    }
    
    // Encrypt the password
    const salt = await bcrypt.genSalt(10)
    const encryptedPassword = await bcrypt.hash(this.password, salt)
    this.password = encryptedPassword;

    next()
})

// Model Creation
const User = model("User", userSchema);

// Module Export
module.exports = User;