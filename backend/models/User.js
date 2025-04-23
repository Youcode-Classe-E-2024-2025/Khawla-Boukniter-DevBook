const db = require('../config/connect')

class User {
    constructor(id, name, email, password, role = 'regular') {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    signup(callback) {

        const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
        const values = [this.name, this.email, this.password, this.role];

        db.query(sql, values, (err, rslt) => {
            if (err) return callback(err, null);
            callback(null, rslt);
        });

        console.log('connected');
    }
}

module.exports = User;