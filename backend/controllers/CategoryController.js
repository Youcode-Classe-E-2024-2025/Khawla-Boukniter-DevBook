const Category = require('../models/Category');

exports.getAll = (req, res) => {
    Category.getAll((err, rslt) => {
        if (err) {
            console.error(err);
            return res.status(500).send("erreur");
        }
        res.json(rslt);
    });
};

exports.getById = (req, res) => {
    const { id } = req.params;

    Category.findById(id, (err, rslt) => {
        if (err) {
            console.error(err);
            return res.status(500).send("erreur");
        }
        if (!rslt) return res.status(404).send("category introuvable");

        res.json(rslt);
    });
};

exports.create = (req, res) => {
    const { name, description } = req.body;

    const category = new Category(null, name, description);
    category.save((err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("erreur");
        }
        res.send("category ajoutéée");
    });
};

exports.update = (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = new Category(id, name, description);
    category.update((err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("erreur");
        }
        res.send("category updated");
    });
};

exports.delete = (req, res) => {
    const { id } = req.params;

    Category.deleteById(id, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("erreur");
        }
        res.send("category supprimée");
    });
};