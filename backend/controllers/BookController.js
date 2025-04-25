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
    const error = validate(req.body);

    if (error) {
        return res.status(400).send(error);
    }

    const { titre, description, auteur, category_id } = req.body;
    const book = new Book(null, titre, description, auteur, category_id);

    book.save((err, rslt) => {
        if (err) {

            if (err.message === 'titre existant') {
                return res.status(400).send('titre existant');
            }

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
    const error = validate(req.body);

    if (error) {
        return res.status(400).send(error);
    }

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

            if (err.message === 'titre existant') {
                return res.status(400).send('titre existant');
            }

            console.error(err);
            return res.status(500).send("erreur");
        }
        res.send("supprimé");
    });
};

exports.filterByCategory = (req, res) => {
    const { id } = req.params;

    Book.filterByCategory(id, (err, rslt) => {
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

function validate(data) {
    const { titre, description, auteur, category_id } = data;

    if (!titre || !description || !auteur || !category_id) {
        return "tous les champs sont obligatoires";
    }

    if (titre.trim().length < 2 || typeof titre !== 'string') {
        return "le titre doit avoir au min 2 caractères";
    }

    if (auteur.trim().length < 2 || typeof auteur !== 'string') {
        return "l'auteur doit contenir au min 2 caractères";
    }

    if (isNaN(parseInt(category_id))) {
        return "catégorie invalide";
    }

    return null;

}