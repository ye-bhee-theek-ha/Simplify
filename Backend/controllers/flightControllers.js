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
    const { departureCity, destinationCity, dateFrom, dateTo, flightType, status, maxPrice } = req.body;
    let filter = {};

    // Check if any fields exist and are not empty
    if (departureCity) filter.DepartureCity = { $regex: new RegExp(departureCity, "i") };
    if (destinationCity) filter.DestinationCity = { $regex: new RegExp(destinationCity, "i") };
    if (dateFrom && dateTo) {
        filter.Date = { $gte: new Date(dateFrom), $lte: new Date(dateTo) };
    } else if (dateFrom) {
        filter.Date = { $gte: new Date(dateFrom) };
    } else if (dateTo) {
        filter.Date = { $lte: new Date(dateTo) };
    }
    if (flightType) filter.FlightType = flightType;
    if (status) filter.Status = status;
    if (maxPrice) filter.$or = [
        { FirstClassPrice: { $lte: maxPrice } },
        { BusinessClassPrice: { $lte: maxPrice } },
        { EconomyClassPrice: { $lte: maxPrice } }
    ];

    console.log(filter);

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

    const flight = await Flight.findOne({ FlightID });

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


    if (Date) flight.Date = Date;
    if (DepartureCity) flight.DepartureCity = DepartureCity;
    if (DestinationCity) flight.DestinationCity = DestinationCity;
    if (DepartureTime) flight.DepartureTime = DepartureTime;
    if (FlightDuration) flight.FlightDuration = FlightDuration;
    if (AirplaneModel) flight.AirplaneModel = AirplaneModel;
    if (FlightType) flight.FlightType = FlightType;
    if (FirstClassPrice) flight.FirstClassPrice = FirstClassPrice;
    if (BusinessClassPrice) flight.BusinessClassPrice = BusinessClassPrice;
    if (EconomyClassPrice) flight.EconomyClassPrice = EconomyClassPrice;
    if (Status) flight.Status = Status;

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



const bookSeat = async (req, res) => {
    const { FlightID, row, col, seat_group } = req.body;

    try {
        const flight = await Flight.findOne({ FlightID });

        if (!flight) {
            res.status(404);
            throw new Error("Flight not found");
        }

        // Check if the seat is already booked
        const bookedSeatIndex = flight.BookedSeats.findIndex(seat => seat.row === row && seat.col === col && seat.seat_group === seat_group);
        if (bookedSeatIndex !== -1) {
            res.status(400);
            throw new Error("Seat is already booked");
        }

        // Add the seat to the booked seats array
        flight.BookedSeats.push({ row, col, seat_group });
        await flight.save();

        res.status(201).json({ message: "Seat booked successfully" });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};



module.exports = { createFlight, getFlights, getFlightById, getFilteredFlights, updateFlight, deleteFlight };
