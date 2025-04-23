const db = require('../config/connect')
const bcrypt = require('bcrypt');

class User {
    constructor(id, username, email, password, role = 'regular') {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    async signup(callback) {

        const sql = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
        const hashed = await bcrypt.hash(this.password);
        const values = [this.username, this.email, hashed, this.role];

        db.query(sql, values, (err, rslt) => {
            if (err) return callback(err, null);
            callback(null, rslt);
        });

        console.log('connected');
    }
}

module.exports = User;