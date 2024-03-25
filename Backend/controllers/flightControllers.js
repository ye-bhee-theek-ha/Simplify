const Flight = require("../models/flightData");
const asyncHandler = require("express-async-handler");

const createFlight = asyncHandler(async (req, res) => {
    const {
        FlightID,
        Date,
        DepartureCity,
        DestinationCity,
        DepartureTime,
        FlightDuration,
        AirplaneModel,
        FlightType,
        FirstClassPrice,
        BusinessClassPrice,
        EconomyClassPrice,
        Status,
    } = req.body;

    const flightExists = await Flight.findOne({ FlightID });

    if (flightExists) {
        res.status(400);
        throw new Error("Flight already exists");
    }

    const flight = await Flight.create({
        FlightID,
        Date,
        DepartureCity,
        DestinationCity,
        DepartureTime,
        FlightDuration,
        AirplaneModel,
        FlightType,
        FirstClassPrice,
        BusinessClassPrice,
        EconomyClassPrice,
        Status,
    });

    res.status(201).json(flight);
});


const getFlights = async (req, res) => {
    try {
        const flights = await Flight.find({}, { _id: 0, __v: 0 });
        res.json(flights);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const getFilteredFlights = asyncHandler(async (req, res) => {
    const { departureCity, destinationCity, dateFrom, dateTo, flightType, status, minPrice } = req.body;
    let filter = {};

    // Check if any fields exist and are not empty
    if (departureCity) filter.DepartureCity = { $regex: new RegExp(departureCity, "i") };
    if (destinationCity) filter.DestinationCity = { $regex: new RegExp(destinationCity, "i") };
    if (dateFrom && dateTo) filter.Date = { $gte: new Date(dateFrom), $lte: new Date(dateTo) };
    if (flightType) filter.FlightType = flightType;
    if (status) filter.Status = status;
    if (minPrice) filter.$or = [
        { FirstClassPrice: { $gte: minPrice } },
        { BusinessClassPrice: { $gte: minPrice } },
        { EconomyClassPrice: { $gte: minPrice } }
    ];

    const flights = await Flight.find(filter);

    res.json(flights);
});


const getFlightById = asyncHandler(async (req, res) => {

    const { FlightID } = req.params;

    const flight = await Flight.find({FlightID});

    if (!flight) {
        res.status(404);
        throw new Error("Flight not found");
    }

    res.json(flight);
});


const updateFlight = asyncHandler(async (req, res) => {

    const { FlightID } = req.params;

    const flight = await Flight.findbyId(FlightID);

    if (!flight) {
        res.status(404);
        throw new Error("Flight not found");
    }

    const {
        Date,
        DepartureCity,
        DestinationCity,
        DepartureTime,
        FlightDuration,
        AirplaneModel,
        FlightType,
        FirstClassPrice,
        BusinessClassPrice,
        EconomyClassPrice,
        Status,
    } = req.body;

    flight.Date = Date;
    flight.DepartureCity = DepartureCity;
    flight.DestinationCity = DestinationCity;
    flight.DepartureTime = DepartureTime;
    flight.FlightDuration = FlightDuration;
    flight.AirplaneModel = AirplaneModel;
    flight.FlightType = FlightType;
    flight.FirstClassPrice = FirstClassPrice;
    flight.BusinessClassPrice = BusinessClassPrice;
    flight.EconomyClassPrice = EconomyClassPrice;
    flight.Status = Status;

    await flight.save();

    res.json(flight);
});

const deleteFlight = asyncHandler(async (req, res) => {

    const { FlightID } = req.params;

    const flight = await Flight.find({FlightID});

    if (!flight) {
        res.status(404);
        throw new Error("Flight not found");
    }

    await flight.remove();
    res.json({ message: "Flight removed" });
});


module.exports = { createFlight, getFlights, getFlightById, getFilteredFlights, updateFlight, deleteFlight };
