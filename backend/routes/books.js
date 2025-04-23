const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');

router.get('/', BookController.getAll);

router.post('/', BookController.createBook);

module.exports = router;