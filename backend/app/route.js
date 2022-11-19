// Module Import
const route = require('express').Router();

// Application Routes


// Health Default Route
route.get("/health" , (req, res) => {
    res.status(200).json({
        success:"OK"
    })
})

// Module Export
module.exports = route;