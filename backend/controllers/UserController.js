const path = require('path');
const User = require('../models/User');

exports.showSignupForm = (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'pages/signup.html'));
}

exports.showLoginForm = (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'pages/login.html'));
}

exports.signup = (req, res) => {
    const { username, email, password } = req.body;

    const newUser = new User(null, username, email, password);

    newUser.signup((err, rslt) => {
        if (err) {
            console.log(err);
            return res.status(500).send("erreur");
        }

        res.sendFile(path.join(__dirname, '../..', 'index.html'));
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    const user = new User(null, null, email, null);

    user.login(password, (err, rslt) => {
        if (err) {
            console.log(err);
            return res.status(500).send('erreur');
        }

        if (!rslt.success) {
            return res.status(401).send(rslt.message);
        }

        res.sendFile(path.join(__dirname, '../..', 'index.html'));
    })
};

