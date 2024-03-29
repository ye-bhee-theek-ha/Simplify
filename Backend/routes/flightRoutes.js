const express = require("express");
const { createFlight, getFlights, getFlightById, getFilteredFlights, updateFlight, deleteFlight } = require("../controllers/flightControllers");

const router = express.Router();

router.route("/create").post(createFlight);
router.route("/getflights").post(getFlights);
router.route("/getFlightById/:FlightID").post(getFlightById);
router.route("/getFilteredFlights").post(getFilteredFlights);
router.route("/update/:FlightID").post(updateFlight);
router.route("/delete/:FlightID").post(deleteFlight);


module.exports = router