const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllReviews = async () => {
    const result = await mongodb.getDatabase().db('music').collection('review').find();
    return result.toArray();
};

const getSingleReview = async (reviewId) => {
    const result = await mongodb.getDatabase().db('music').collection('review').find({ _id: new ObjectId(reviewId) });
    const reviews = await result.toArray();
    return reviews[0];
};

const updateReview = async (reviewId, review) => {
    if (!review.text || !review.date) {
        throw new Error('Text and date are required fields.');
    }

    const response = await mongodb.getDatabase().db('music').collection('review').replaceOne({ _id: new ObjectId(reviewId) }, review);
    return response;
};

const deleteReview = async (reviewId) => {
    const response = await mongodb.getDatabase().db('music').collection('review').deleteOne({ _id: new ObjectId(reviewId) });
    return response;
};

const createReview = async (review) => {
    if (!review.text || !review.date) {
        throw new Error('Text and date are required fields.');
    }

    const response = await mongodb.getDatabase().db('music').collection('review').insertOne(review);
    return response;
};

module.exports = {
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview,
    createReview
};
