// reviewData.js

const mongoose = require("mongoose");

const AirportReviewSchema = mongoose.Schema(
    {
        airport: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Airport',
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 10
        },
        comment: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const AirportReview = mongoose.model("AirportReview", AirportReviewSchema);
module.exports = AirportReview;
