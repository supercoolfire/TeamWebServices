const express = require('express');
const router = express.Router();

const reviewsController = require('../controllers/review');
const validateReview = require('../middleware/validate-reviews');

router.get('/', reviewsController.getAllReviews);
router.get('/:id', reviewsController.getSingleReview);
router.post('/', validateReview, reviewsController.createReview);
router.put('/:id', validateReview, reviewsController.updateReview);
router.delete('/:id', reviewsController.deleteReview);

module.exports = router;
