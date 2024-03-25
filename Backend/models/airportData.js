// airportData.js
const mongoose = require("mongoose");

const AirportSchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    imageURLs: [String],
    location: {
        type: String,
    },
    services: [String],
    description: {
        type:String
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AirportReview',
    }],
    ratings: {
        type: Number,
        default: -1,
        min: -1,
        max: 10
    },

});

const Airport = mongoose.model("Airport", AirportSchema);
module.exports = Airport;
