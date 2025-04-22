const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('books route');
});

module.exports = router;