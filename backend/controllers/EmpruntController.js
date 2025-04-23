const Emprunt = require('../models/Emprunt');

exports.getAll = (req, res) => {
    Emprunt.getAll((err, rslt) => {
        if (err) {
            console.error(err);
            return res.status(500).send("erreur");
        }
        res.json(rslt);
    });
};

exports.getByUserId = (req, res) => {
    const { id } = req.params;

    Emprunt.findByUserId(id, (err, rslt) => {
        if (err) {
            console.error(err);
            return res.status(500).send("erreur");
        }

        res.json(rslt);
    });
};

exports.create = (req, res) => {
    const { user_id, book_id } = req.body;
    const date_emprunt = new Date();
    const date_limit = new Date();
    date_limit.setDate(date_emprunt.getDate() + 15);

    const emprunt = new Emprunt(null, user_id, book_id, date_emprunt, null, date_limit);
    emprunt.save((err, rslt) => {
        if (err) {
            console.error(err);
            return res.status(500).send("erreur");
        }
        res.send("emprunt ajoutéée");
    });
};

exports.return = (req, res) => {
    const { id } = req.params;
    const date_retour = new Date();

    Emprunt.return(id, date_retour, (err, rslt) => {
        if (err) {
            console.error(err);
            return res.status(500).send("erreur");
        }
        res.send("returned");
    });
};

exports.getOverdue = (req, res) => {
    Emprunt.getOverdue((err, rslt) => {
        if (err) {
            console.error(err);
            return res.status(500).send("erreur");
        }
        res.json(rslt);
    });
};