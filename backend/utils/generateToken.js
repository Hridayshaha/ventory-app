const jwt = require("jsonwebtoken");


const secret = process.env.SECRET_KEY || "123245&"
const generateToken = (id, email) => {
    return jwt.sign({id, email}, secret, {expiresIn: "1d"});
}

module.exports = generateToken;