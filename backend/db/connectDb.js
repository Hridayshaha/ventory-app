// Module Import
const mongoose = require('mongoose')
const createError  = require('../error/handleError')

// Connect Db Function
const connectDb = async (URL,message, cb) => {
    try{
        await mongoose.connect(URL)
        console.log(message)
        cb();
    }catch(e){
        throw createError("Database Connection Failed")
    }
}

// Module Exports
module.exports = connectDb;