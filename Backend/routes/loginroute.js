const express = require('express');
const router = express.Router();
const userLoginController = require('../controller/loginController');

router.post('/customerlogin', userLoginController.customerlogin);

router.post('/customersignup', userLoginController.customersignup);

router.post('/adminlogin', userLoginController.adminlogin);

module.exports = router;