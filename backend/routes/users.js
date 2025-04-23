const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../models/User');

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'pages/login.html'));
});

router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'pages/signup.html'));
});

router.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    const newUser = new User(null, username, email, password);

    newUser.signup((err, rslt) => {
        if (err) {
            console.log(err);
            return res.status(500).send('erreur');

        }
        res.sendFile(path.join(__dirname, '../..', 'index.html'));
    });


})

module.exports = router;