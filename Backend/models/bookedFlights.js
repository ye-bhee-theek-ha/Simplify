const mongoose = require("mongoose");

const BookedFlightsSchema = mongoose.Schema(
    {
        UserToken: {
            type: String,
            required: true
        },
        FlightID: {
            type: String,
            required: true
        },
        row: {
            type: String,
            required: true
        },
        col: {
            type: Number,
            required: true
        },
        group_name: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const BookedFlights = mongoose.model("BookedFlights", BookedFlightsSchema);

module.exports = BookedFlights;
