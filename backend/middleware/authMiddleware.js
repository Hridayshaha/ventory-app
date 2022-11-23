const User = require("../model/User")
const jwt = require("jsonwebtoken")
const secret = process.env.SECRET_KEY

const protected = async (req, res, next) => {
    try {
        const {token} = req.cookies
        if(!token) {
            throw new Error("Not A Valid User. Login Again Please.");
        }
        const verify = jwt.verify(token, secret)

        if(!verify) {
            throw new Error("Token Not Found. Login Again Please. Please try again")
        }

        const user = await User.findById(verify.id).select("-password")
        if(!user) {
            throw new Error("Not a valid user. Please try again")
        }

        req.user = user;
        next()

    }catch(err) {
        next(err)
    }

}

module.exports = protected