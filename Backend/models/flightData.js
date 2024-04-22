const mongoose = require("mongoose");

const SeatGroupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rows: {
        type: Number,
        required: true
    },
    cols: {
        type: Number,
        required: true
    }
});

const BookedSeatSchema = mongoose.Schema({
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
    },
    flight: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flight'
    }
});

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
        SeatGroups: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SeatGroup'
        }],  
        BookedSeats: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BookedSeat'
        }],    
    },
    {
        timestamps: true,
    }
);

const Flight = mongoose.model("Flight", FlightSchema);
const BookedSeat = mongoose.model("BookedSeat", BookedSeatSchema);
const SeatGroup = mongoose.model("SeatGroup", SeatGroupSchema);

module.exports = {Flight, BookedSeat, SeatGroup};
