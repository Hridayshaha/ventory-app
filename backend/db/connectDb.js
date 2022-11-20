// Module Import
const mongoose = require('mongoose')

// Connect Db Function
const connectDb = async (URL,message, cb) => {
    try{
        await mongoose.connect(URL)
        console.log(message)
        cb();
    }catch(e){
        throw new Error("Database Connection Failed")
    }
}

// Module Exports
module.exports = connectDb;