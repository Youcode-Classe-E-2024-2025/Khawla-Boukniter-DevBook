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
        const hashed = await bcrypt.hash(this.password, 10);
        const values = [this.username, this.email, hashed, this.role];

        db.query(sql, values, (err, rslt) => {
            if (err) return callback(err, null);
            callback(null, rslt);
        });

        console.log('connected');
    }

    async login(passwordToCHeck, callback) {

        const sql = 'SELECT * FROM users WHERE email = ?';
        const value = [this.email];

        db.query(sql, value, async (err, rslt) => {
            if (err) return callback(err, null);

            if (rslt.length === 0) {
                return callback(null, { success: false, message: "user introuvable" });
            }

            const user = rslt[0];

            const match = await bcrypt.compare(passwordToCHeck, user.password);

            if (!match) {
                return callback(null, { success: false, message: "mdp incorrect" });
            }

            callback(null, { success: true, user });
        })

        console.log('connected');

    }
}

module.exports = User;