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

exports.createBook = (req, res) => {
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