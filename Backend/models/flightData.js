const mongoose = require("mongoose");

const FlightSchema = mongoose.Schema(
    {
        FlightID: {
            type: String,
            required: true,
            unique: true,
        },
        Date: {
            type: Date,
            required: true,
        },
        DepartureCity: {
            type: String,
            required: true,
        },
        DestinationCity: {
            type: String,
            required: true,
        },
        DepartureTime: {
            type: String,
            required: true,
        },
        FlightDuration: {
            type: Number,
            required: true,
        },
        AirplaneModel: {
            type: String,
            required: true,
        },
        FlightType: {
            type: String,
            required: true,
            enum: ["Domestic", "International"],
        },
        FirstClassPrice: {
            type: Number,
            required: true,
        },
        BusinessClassPrice: {
            type: Number,
            required: true,
        },
        EconomyClassPrice: {
            type: Number,
            required: true,
        },
        Status: {
            type: String,
            enum: ["Scheduled", "Boarding", "In-Flight", "Arrived", "Delayed", "Cancelled"],
            default: "Scheduled",
        },
    },
    {
        timestamps: true,
    }
);

const Flight = mongoose.model("Flight", FlightSchema);
module.exports = Flight;
