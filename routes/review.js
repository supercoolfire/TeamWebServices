const express = require('express');
const router = express.Router();

const reviewsController = require('../controllers/review');
const validateReview = require('../middleware/validate-reviews');
const { isAuthenticated, isGod, isAdmin, isModerator } = require('../middleware/authenticate');

router.get('/', isAuthenticated, reviewsController.getAllReviews);
router.get('/:id', isModerator, reviewsController.getSingleReview);
router.post('/', isAdmin,validateReview, reviewsController.createReview);
router.put('/:id', isGod, validateReview, reviewsController.updateReview);
router.delete('/:id', reviewsController.deleteReview);

module.exports = router;
