const db = require('../config/connect');

class Category {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    static getAll(callback) {
        const sql = "SELECT * FROM categories";

        db.query(sql, (err, rslt) => {
            if (err) return callback(err, null);
            callback(null, rslt);
        });
    }

    static findById(id, callback) {
        const sql = "SELECT * FROM categories WHERE id = ?";

        db.query(sql, [id], (err, rslt) => {
            if (err) return callback(err, null);
            callback(null, rslt[0]);
        });
    }

    save(callback) {
        const sql = "INSERT INTO categories (name, description) VALUES (?, ?)";

        db.query(sql, [this.name, this.description], (err, rslt) => {
            if (err) return callback(err, null);
            callback(null, rslt);
        });
    }

    update(callback) {
        const sql = "UPDATE categories SET name = ?, description = ? WHERE id = ?";
        const values = [this.name, this.description, this.id];

        db.query(sql, values, (err, rslt) => {
            if (err) return callback(err, null);
            callback(null, rslt);
        });
    }

    static delete(id, callback) {
        const sql = "DELETE FROM categories WHERE id = ?";

        db.query(sql, [id], (err, rslt) => {
            if (err) return callback(err, null);
            callback(null, rslt);
        });
    }
}

module.exports = Category;