
// Module Import
const route = require('express').Router();

const userRoutes = require('../routes/userRoutes');


// Application Routes
// User Routes
route.use("/api/v1/users", userRoutes);

// Health Default Route
route.get("/health" , (req, res) => {
    res.status(200).json({
        success:"OK"
    })
})

route.get("/" , (req, res) => {
    res.status(200).json({
        message:"Home"
    })
})

// Module Export
module.exports = route;