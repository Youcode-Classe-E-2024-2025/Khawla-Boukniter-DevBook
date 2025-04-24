const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');

router.get('/', BookController.getAll);

router.post('/', BookController.create);

router.get('/:id', BookController.getById);

router.put('/:id', BookController.update);

router.delete('/:id', BookController.delete);

router.get('/category/:id', BookController.filterByCategory);

router.get('/search', BookController.search);

module.exports = router;