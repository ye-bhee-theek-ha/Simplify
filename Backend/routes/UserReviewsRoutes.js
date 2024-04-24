const express = require("express");
const { createUserReview, getUserReviewsByFlightID, getUserReviewsByUserToken } = require("../controllers/UserReviewsControllers");

const router = express.Router();

router.route("/create").post(createUserReview);
router.route("/getReviewsbyID/:flightID").post(getUserReviewsByFlightID);
router.route("/getReviewsbyToken/:token").post(getUserReviewsByUserToken);

module.exports = router