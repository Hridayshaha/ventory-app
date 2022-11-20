// Module Import
const router = require('express').Router();

// Import Controllers
const {registerController, loginController, logoutController} = require('../controller/userController')


// Routes
router.post('/register' , registerController);
router.post('/login' , loginController);
router.get("/logout", logoutController);

// Module Export
module.exports = router;

