const fs = require('fs');
const csv = require('csv-parser');
const Flight = require('../models/flightData');
const mongoose = require("mongoose");

// Function to upload data from CSV to MongoDB
async function uploadToMongo() {
    try {
        // Read the CSV file
        fs.createReadStream('C:/Users/Lenovo/Desktop/Simplify/Backend/data/flight_schedule.csv')
            .pipe(csv())
            .on('data', async (row) => {
                // Create a new Flight object
                const flight = new Flight({
                    FlightID: row.FlightID,
                    Date: new Date(row.Date),
                    DepartureCity: row.DepartureCity,
                    DestinationCity: row.DestinationCity,
                    DepartureTime: row.DepartureTime,
                    FlightDuration: parseFloat(row.FlightDuration),
                    AirplaneModel: row.AirplaneModel,
                    FlightType: row.FlightType,
                    FirstClassPrice: parseFloat(row.FirstClassPrice),
                    BusinessClassPrice: parseFloat(row.BusinessClassPrice),
                    EconomyClassPrice: parseFloat(row.EconomyClassPrice),
                    Status: row.Status
                });

                // Save the flight object to MongoDB
                await flight.save();
            })
            .on('end', () => {
                console.log('CSV file successfully processed and data uploaded to MongoDB.');
            });
    } catch (error) {
        console.error('Error uploading data to MongoDB:', error);
    } finally {
        // Close MongoDB connection
        mongoose.connection.close();
    }
}

// Call the function to upload data
uploadToMongo();
