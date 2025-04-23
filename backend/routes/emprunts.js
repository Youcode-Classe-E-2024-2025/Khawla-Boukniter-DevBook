const express = require('express');
const router = express.Router();
const EmpruntController = require('../controllers/EmpruntController');

router.get('/', EmpruntController.getAll);

router.get('/user/:id', EmpruntController.getByUserId);

router.post('/', EmpruntController.create);

router.put('/return/:id', EmpruntController.return);

router.get('/overdue', EmpruntController.getOverdue);

module.exports = router;