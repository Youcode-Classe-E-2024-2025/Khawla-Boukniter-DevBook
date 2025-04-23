const db = require('../config/connect')

class User {
    constructor(id, username, email, password, role = 'regular') {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    signup(callback) {

        const sql = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
        const values = [this.username, this.email, this.password, this.role];

        db.query(sql, values, (err, rslt) => {
            if (err) return callback(err, null);
            callback(null, rslt);
        });

        console.log('connected');
    }
}

module.exports = User;