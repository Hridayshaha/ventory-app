// Module Import
const User = require('../model/User')
const generateToken = require("../utils/generateToken")
const bcrypt = require("bcrypt")



// Register Controller
const registerController = async (req, res, next) => {
    const {username, fullName, email, phone, password, bio, photo} = req.body;
    try{
        if(!username || !email || !password || !fullName || !phone){
            throw new Error("Please fill all the required fields")
        }

        if(password.length < 6){
            throw new Error("Password must be at least 6 characters!")
        }

        // User Email Exists
        const userExists = await User.findOne({email})
        if(userExists){
            throw new Error("Email already exists!")
        }

        // User exists or not checking
        const userNameExists = await User.findOne({username})
        if(userNameExists){
            throw new Error("Username already exists")
        }

        // Db Save the User
        const user = new User({
            username, fullName, email, phone, password, bio , photo
        })

        await user.save()


        // Generate Token
        const token = generateToken(user._id, user.email)

        // Generate Cookie - HTTP only
            res.cookie("token", token, {
                path: "/",
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 86400),
                sameSite: "none",
                // secure: true,
            })

        
        return res.status(200).json({
           _id: user._id,
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            bio: user.bio,
            photo: user.photo,
            token: token
        })
    }catch(e) {
        next(e)
    }
}


// Login Controller
const loginController = async (req, res, next) => {
    try {
        const {email, password}  = req.body;
        
        const user = await User.findOne({email})
        if(!user){
            throw new Error("Signup First With Your Email")
        }

        // Password checking
        const passIsCorrect = await bcrypt.compare(password, user.password)
        
       if(!passIsCorrect){
        throw new Error("Email or Password Invalid")
       }



        // Generate Token
        const token = generateToken(user._id, user.email)

        // Generate Cookie - HTTP only
            res.cookie("token", token, {
               path: "/",
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 86400),
               sameSite: "none",
            //    secure: true,
            })

       return res.status(200).json({
        message: "Logged in successfully"
     })

    }catch(e){
        next(e)
    }
}


// Logout Controller
const logoutController = (req, res, next) => {
    try{
        res.cookie("token", "", {
            path: "/",
            httpOnly: true,
            expires: new Date(0),
            sameSite: "none",
            // secure: true,
        })

        return res.status(200).json({
            message: "Logged Out Successfully"
        })

        
    }catch(e){
        next(e)
    }
}


// Get User Controller
const getUserController = async (req, res, next) => {

    try{
        const user = await User.findById(req.user._id);
        if(!user){
            throw new Error("User not found");
        }

        return res.status(200).json({
            _id: user._id,
             username: user.username,
             fullName: user.fullName,
             email: user.email,
             phone: user.phone,
             bio: user.bio,
             photo: user.photo,
         })

    }catch(e){
        next(e)
    }
}

// Module Export
module.exports = {
    registerController, 
    loginController,
    logoutController,
    getUserController
}