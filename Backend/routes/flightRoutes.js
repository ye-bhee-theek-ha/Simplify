const express = require("express");
const { createFlight, getFlights, getFlightById, getFilteredFlights, updateFlight, deleteFlight, bookSeats, Flightexists } = require("../controllers/flightControllers");

const router = express.Router();

router.route("/create").post(createFlight);
router.route("/getflights").post(getFlights);
router.route("/getFlightById/:FlightID").post(getFlightById);
router.route("/Flightexists/:FlightID").post(Flightexists);
router.route("/getFilteredFlights").post(getFilteredFlights);
router.route("/update/:FlightID").post(updateFlight);
router.route("/delete/:FlightID").post(deleteFlight);
router.route("/book").post(bookSeats);


module.exports = router