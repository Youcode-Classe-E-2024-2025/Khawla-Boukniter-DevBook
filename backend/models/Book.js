const db = require('../config/connect')

class Book {
    constructor(id, titre, description, auteur, category_id, read_status = 'à lire', dispo_status = 'disponible') {
        this.id = id;
        this.titre = titre;
        this.description = description;
        this.auteur = auteur;
        this.category_id = category_id;
        this.read_status = read_status;
        this.dispo_status = dispo_status;
    }

    static getAll(callback) {
        const sql = "SELECT * FROM books";
        db.query(sql, (err, rslt) => {
            if (err) return callback(err, null);
            callback(null, rslt);
        });
    }

    save(callback) {
        const book = "SELECT * FROM books WHERE titre = ?";
        values = [this.titre];

        db.query(book, values, (err, exist) => {
            if (err) return callback(err, null)

            if (exist.length > 0) return callback(new Error("titre existant"), null);

            const sql = `INSERT INTO books (titre, description, auteur, category_id, read_status, dispo_status) VALUES (?, ?, ?, ?, ?, ?)`;
            const values = [this.titre, this.description, this.auteur, this.category_id, this.read_status, this.dispo_status];

            db.query(sql, values, (err, rslt) => {
                if (err) return callback(err, null);
                callback(null, rslt);
            })

        })


    }

    static findById(id, callback) {
        const sql = "SELECT * FROM books WHERE id = ?";

        db.query(sql, [id], (err, rslt) => {
            if (err) return callback(err, null);
            callback(null, rslt[0]);
        });
    }

    update(callback) {
        const book = "SELECT * FROM books WHERE titre = ?";
        values = [this.titre];

        db.query(book, values, (err, exist) => {
            if (err) return callback(err, null)

            if (exist.length > 0) return callback(new Error("titre existant"), null);

            const sql = `UPDATE books SET titre = ?, description = ?, auteur = ?, category_id = ?, read_status = ?, dispo_status = ? WHERE id = ?`;
            const values = [this.titre, this.description, this.auteur, this.category_id, this.read_status, this.dispo_status, this.id];

            db.query(sql, values, (err, rslt) => {
                if (err) return callback(err, null);
                callback(null, rslt);
            });

        })
    }

    static delete(id, callback) {
        const sql = "DELETE FROM books WHERE id = ?";

        db.query(sql, [id], (err, rslt) => {
            if (err) return callback(err, null);
            callback(null, rslt);
        });
    }

    static filterByCategory(categoryId, callback) {
        const sql = "SELECT * FROM books WHERE category_id = ?";

        db.query(sql, [categoryId], (err, rslt) => {
            if (err) return callback(err, null);
            callback(null, rslt);
        });
    }

    static search(keyword, callback) {
        const sql = "SELECT * FROM books WHERE titre LIKE ? OR description LIKE ?";

        db.query(sql, [`%${keyword}%`, `%${keyword}%`], (err, rslt) => {
            if (err) return callback(err, null);
            callback(null, rslt);
        });
    }
}

module.exports = Book;