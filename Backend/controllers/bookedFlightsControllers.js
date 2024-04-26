const asyncHandler = require("express-async-handler");
const BookedFlights = require("../models/bookedFlights");

// Controller to book a flight
const bookFlight = asyncHandler(async (req, res) => {
    const { UserToken, FlightID, row, col, group_name } = req.body;

    // Assuming req.body contains the necessary data for booking a flight
    const bookedFlight = await BookedFlights.create({
        UserToken,
        FlightID,
        row,
        col,
        group_name
    });

    res.status(201).json({
        success: true,
        data: bookedFlight,
        message: "Seats Successfully Booked"
    });
});

// Controller to get all booked flights
const getAllBookedFlights = asyncHandler(async (req, res) => {
    const bookedFlights = await BookedFlights.find();

    res.status(200).json({
        success: true,
        count: bookedFlights.length,
        data: bookedFlights
    });
});

// Controller to get a single booked flight by ID
const getBookedFlightById = asyncHandler(async (req, res) => {

    const { id } = req.body;

    const bookedFlight = await BookedFlights.findById(id);

    if (!bookedFlight) {
        res.status(404).json({
            success: false,
            message: "Booked flight not found"
        });
    } else {
        res.status(200).json({
            success: true,
            data: bookedFlight
        });
    }
});


// Controller to cancel a booked flight
const cancelBookedFlight = asyncHandler(async (req, res) => {

    const { id } = req.body;

    const bookedFlight = await BookedFlights.findById(id);

    if (!bookedFlight) {
        res.status(404).json({
            success: false,
            message: "Booked flight not found"
        });
    } else {
        await bookedFlight.remove();
        res.status(200).json({
            success: true,
            message: "Booked flight canceled successfully"
        });
    }
});

// Controller to get all booked flights by user token
const getAllBookedFlightsByUserToken = asyncHandler(async (req, res) => {
    const { token } = req.body;

    // Find all booked flights with the specified user token
    const bookedFlights = await BookedFlights.find({ "UserToken":token });

    // Check if there are any booked flights found
    if (bookedFlights.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No booked flights found"
        });
    }

    // Return the booked flights
    res.status(200).json({
        success: true,
        count: bookedFlights.length,
        data: bookedFlights
    });
});

module.exports = {
    bookFlight,
    getAllBookedFlights,
    getBookedFlightById,
    cancelBookedFlight,
    getAllBookedFlightsByUserToken
};
