const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('emprunts route');
});

module.exports = router;