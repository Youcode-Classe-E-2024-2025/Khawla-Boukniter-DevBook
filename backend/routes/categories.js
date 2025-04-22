const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('categories route');
});

module.exports = router;