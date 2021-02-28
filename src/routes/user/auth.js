const express = require('express');

const router = express.Router();

const AuthController = require('../../controllers/AuthController');

//SignUp API
router.post('/signup',AuthController.signup);

//LoginApi
router.post('/login',AuthController.login);


module.exports = router;