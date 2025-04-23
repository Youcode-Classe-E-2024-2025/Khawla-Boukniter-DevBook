const express = require('express');
const router = express.Router();
const path = require('path');
const UserController = require('../controllers/UserController');

router.get('/login', UserController.showLoginForm);

router.get('/signup', UserController.showSignupForm);

router.post('/signup', UserController.signup);

router.post('/login', UserController.login);


module.exports = router;