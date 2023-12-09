const express = require('express');
const router = express.Router();
const githubController = require('../controllers/criteriaController');

router.post('/update-criteria', githubController.updateCriteria);

module.exports = router;
