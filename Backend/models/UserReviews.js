const mongoose = require("mongoose");

const UserReviewSchema = mongoose.Schema(
    {
        reviewText: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        },
        flightID: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const UserReview = mongoose.model("UserReview", UserReviewSchema);

module.exports = UserReview;
