const Airport = require("../models/airportData");
const asyncHandler = require("express-async-handler");

const RegisterAirport = asyncHandler(async (req, res) => {

    const { code, city, country, imageURLs, location, description, services } = req.body;

    const airportExists = await Airport.findOne({ code });

    if (airportExists) {
        res.status(400);
        throw new Error("Airport already exists");
    }

    // Create an object to hold non-empty fields
    const airportData = { code, city, country };

    // Add optional fields if they are not empty
    if (imageURLs) airportData.imageURLs = imageURLs;
    if (location) airportData.location = location;
    if (description) airportData.description = description;
    if (services) airportData.services = services;

    const airport = await Airport.create(airportData);

    if (airport) {
        res.status(201).json({
            _id: airport._id,
            code: airport.code,
            city: airport.city,
            country: airport.country,
            image: airport.image,
            facilities: airport.facilities,
            services: airport.services,
        });
    } else {
        res.status(400);
        throw new Error("Error creating airport");
    }
});


const getAirports = asyncHandler(async (req, res) => {
    try {
        const airports = await Airport.find({}, { _id: 0, __v: 0, imageURLs: 0, description: 0, reviews: 0 });
        res.json(airports);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});


//router.route("/:code").get(getAirportByCode);

const getAirportByCode = asyncHandler(async (req, res) => {
    const { code } = req.params;

    const airport = await Airport.findOne({ code });

    if (!airport) {
        res.status(404);
        throw new Error('Airport not found');
    }

    res.json(airport);
});


const getAirportsByCountry = asyncHandler(async (req, res) => {
    const { country } = req.params;

    const airports = await Airport.find({ country }, { _id: 0, __v: 0, image: 0, description: 0, reviews: 0});

    if (!airports || airports.length === 0) {
        res.status(404);
        throw new Error('No airports found for the specified country');
    }

    res.json(airports);
});

module.exports = { RegisterAirport, getAirports, getAirportsByCountry, getAirportByCode };
