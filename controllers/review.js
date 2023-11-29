const reviewModel = require('../models/reviewModel');

const getAllReviews = async (req, res) => {
    console.log("inside getall reviews");
    //#swagger.tags = ['reviews']
    try {
        const reviews = await reviewModel.getAllReviews();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json(error.message || 'Some error occurred while fetching reviews.');
    }
};

const getSingleReview = async (req, res) => {
    console.log("inside getsingle reviews");
    //#swagger.tags = ['reviews']
    const reviewId = req.params.id;
    try {
        const review = await reviewModel.getSingleReview(reviewId);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json(error.message || 'Some error occurred while fetching the review.');
    }
};

const updateReview = async (req, res) => {
    console.log("inside update reviews");
    //#swagger.tags = ['reviews']
    const reviewId = req.params.id;
    const review = {
        text: req.body.text,
        date: req.body.date
    };

    try {
        await reviewModel.updateReview(reviewId, review);
        res.status(204).send();
    } catch (error) {
        res.status(500).json(error.message || 'Some error occurred while updating this review.');
    }
};

const deleteReview = async (req, res) => {
    console.log("inside delete reviews");
    //#swagger.tags = ['reviews']
    const reviewId = req.params.id;

    try {
        const response = await reviewModel.deleteReview(reviewId);
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting this review.');
        }
    } catch (error) {
        res.status(500).json(error.message || 'Some error occurred while deleting this review.');
    }
};

const createReview = async (req, res) => {
    console.log("inside create reviews");
    //#swagger.tags = ['reviews']
    const review = {
        text: req.body.text,
        date: req.body.date
    };

    try {
        await reviewModel.createReview(review);
        res.status(204).send();
    } catch (error) {
        res.status(500).json(error.message || 'Some error occurred while creating the review.');
    }
};

module.exports = {
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview,
    createReview
};
