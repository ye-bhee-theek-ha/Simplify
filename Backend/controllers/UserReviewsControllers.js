const asyncHandler = require("express-async-handler");
const UserReview = require("../models/UserReviews");

const createUserReview = asyncHandler(async (req, res) => {
    const { reviewText, token, flightID } = req.body;

    const userReview = await UserReview.create({ "reviewText": reviewText, "token": token, "flightID": flightID });

    res.status(201).json(userReview);
});


const getUserReviewsByFlightID = asyncHandler(async (req, res) => {
    const flightID = req.params.flightID;

    const userReviews = await UserReview.find({ flightID });

    res.json(userReviews);
});


const getUserReviewsByUserToken = asyncHandler(async (req, res) => {
    const token = req.params.token;

    const userReviews = await UserReview.find({ "confirmationToken": token });

    res.json(userReviews);
});


module.exports = { createUserReview, getUserReviewsByFlightID, getUserReviewsByUserToken };
