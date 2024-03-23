const Flight = require("../models/flightData");

const getFlights = async (req, res) => {
    try {
        const flights = await Flight.find({}, { _id: 0, __v: 0 });
        res.json(flights);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getFlights };
