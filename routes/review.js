const express = require('express');
const router = express.Router();

const reviewsController = require('../controllers/review');
const validateReview = require('../middleware/validate-reviews');
const { isAuthenticated, isGod, isAdmin, isModerator } = require('../middleware/authenticate');

router.get('/', reviewsController.getAllReviews);
router.get('/:id', isAuthenticated, reviewsController.getSingleReview);
router.post('/', isAuthenticated, validateReview, reviewsController.createReview);
router.put('/:id', isAuthenticated, validateReview, reviewsController.updateReview);
router.delete('/:id', isAuthenticated, reviewsController.deleteReview);

module.exports = router;
