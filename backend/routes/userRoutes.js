// Module Import
const router = require('express').Router();
const protected = require("../middleware/authMiddleware")


// Import Controllers
const {registerController, loginController, logoutController, getUserController} = require('../controller/userController')


// Routes
router.post('/register' , registerController);
router.post('/login' , loginController);
router.get("/logout", logoutController);
router.get("/getuser", protected, getUserController);

// Module Export
module.exports = router;

