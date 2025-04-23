const db = require('../config/connect');

class Emprunt {
    constructor(id, user_id, book_id, date_emprunt, date_retour, date_limit) {
        this.id = id;
        this.user_id = user_id;
        this.book_id = book_id;
        this.date_emprunt = date_emprunt;
        this.date_retour = date_retour;
        this.date_limit = date_limit;
    }

    static getAll(callback) {
        const sql = "SELECT e.*, u.username, b.titre FROM emprunts e JOIN users u ON u.id = e.user_id JOIN books b ON b.id = e.book_id ORDER BY e.date_emprunt DESC";

        db.query(sql, (err, rslt) => {
            if (err) return callback(err, null);
            callback(null, rslt);
        });
    }

    static findByUserId(id, callback) {
        const sql = "SELECT e.*, b.titre FROM emprunts e JOIN books b ON b.id = e.book_id WHERE e.user_id = ? ORDER BY e.date_emprunt DESC";

        db.query(sql, [id], (err, rslt) => {
            if (err) return callback(err, null);
            callback(null, rslt);
        });
    }

    save(callback) {
        const sql = "INSERT INTO emprunts (user_id, book_id, date_emprunt, date_limit) VALUES (?, ?, ?, ?)";
        const values = [this.user_id, this.book_id, this.date_emprunt, this.date_limit];

        db.query(sql, values, (err, rslt) => {
            if (err) return callback(err, null);
            callback(null, rslt);
        });
    }

    static return(empruntId, date_retour, callback) {
        const sql = `UPDATE emprunts SET date_retour = ? WHERE id = ?`;
        const values = [date_retour, empruntId];

        db.query(sql, values, (err, rslt) => {
            if (err) return callback(err, null);
            callback(null, rslt);
        });
    }

    static getOverdue(callback) {
        const sql = 'SELECT e.*, u.username, b.titre FROM emprunts e JOIN users u ON u.id = e.user_id JOIN books b ON b.id = e.book_id WHERE e.date_retour IS NULL AND e.date_limit < CURDATE()';

        db.query(sql, (err, rslt) => {
            if (err) return callback(err, null);
            callback(null, rslt);
        });
    }
}

module.exports = Emprunt;