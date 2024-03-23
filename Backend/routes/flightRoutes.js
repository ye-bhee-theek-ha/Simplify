const express = require("express");
const { getFlights } = require("../controllers/flightControllers");

const router = express.Router();

router.route("/getflights").post(getFlights);

module.exports = router