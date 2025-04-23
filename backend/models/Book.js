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
        const sql = `INSERT INTO books (titre, description, auteur, category_id, read_status, dispo_status) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [this.titre, this.description, this.auteur, this.category_id, this.read_status, this.dispo_status];

        db.query(sql, (err, rslt) => {
            if (err) return callback(err, null);
            callback(null, rslt);
        })
    }
}

module.exports = Book;