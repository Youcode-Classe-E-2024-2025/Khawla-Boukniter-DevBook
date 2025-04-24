const path = require('path');
const Book = require('../models/Book');

exports.getAll = (req, res) => {
    Book.getAll((err, books) => {
        if (err) {
            console.error(err);
            return res.status(500).send("erreur");
        }
        res.json(books);
    });
};

exports.create = (req, res) => {
    const { titre, description, auteur, category_id } = req.body;
    const book = new Book(null, titre, description, auteur, category_id);

    book.save((err, rslt) => {
        if (err) {
            console.error(err);
            return res.status(500).send("erreur");
        }
        res.send("livre ajouté");
    });

};

exports.getById = (req, res) => {
    const { id } = req.params;

    Book.findById(id, (err, rslt) => {
        if (err) {
            console.log(err);
            return res.status(500).send("erreur");
        }

        if (!rslt) return res.status(404).send('livre introuvable');
        res.json(rslt);
    });
}

exports.update = (req, res) => {
    const { id } = req.params;
    const { titre, description, auteur, category_id, read_status, dispo_status } = req.body;

    const book = new Book(id, titre, description, auteur, category_id, read_status, dispo_status);

    book.update((err, rslt) => {
        if (err) {
            console.error(err);
            return res.status(500).send("erreur");
        }
        res.send("book updated");
    });
};

exports.delete = (req, res) => {
    const { id } = req.params;

    Book.delete(id, (err, rslt) => {
        if (err) {
            console.error(err);
            return res.status(500).send("erreur");
        }
        res.send("supprimé");
    });
};

exports.filterByCategory = (req, res) => {
    const { categoryId } = req.params;

    Book.filterByCategory(categoryId, (err, rslt) => {
        if (err) {
            console.error(err);
            return res.status(500).send("erreur");
        }
        res.json(rslt);
    });
};

exports.search = (req, res) => {
    const { q } = req.query;

    Book.search(q, (err, rslt) => {
        if (err) {
            console.error(err);
            return res.status(500).send("erreur");
        }
        res.json(rslt);
    });
};