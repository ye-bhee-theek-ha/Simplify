const express = require("express");
const router = express.Router();

const { 
    RegisterAirport,
    getAirports,
    getAirportByCode,
    getAirportsByCountry,
    getAirportReviews,
    addAirportReview
} = require("../controllers/airportControllers");

const {
    createReview,
    getReviewsByAirport,
    updateReview,
} = require("../controllers/airportReviewControllers");

router.post("/register", RegisterAirport);
router.post("/getAirports", getAirports);
router.post("/getAirportByCode/:code", getAirportByCode);
router.post("/getAirportsByCountry/:country", getAirportsByCountry);

router.post("/createReview", createReview);
router.post("/getReviewsByAirport/:code", getReviewsByAirport);
router.post("/updateReview/:_id", updateReview);

module.exports = router;
