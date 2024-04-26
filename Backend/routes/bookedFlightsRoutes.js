const express = require("express");
const router = express.Router();
const {
    bookFlight,
    getAllBookedFlights,
    getBookedFlightById,
    cancelBookedFlight,
    getAllBookedFlightsByUserToken,
} = require("../controllers/bookedFlightsControllers");

router.post("/book", bookFlight);
router.post("/getallbyuser", getAllBookedFlightsByUserToken);
router.post("/getall", getAllBookedFlights);
router.post("/getbyid", getBookedFlightById);
router.post("/cancel", cancelBookedFlight);

module.exports = router;
