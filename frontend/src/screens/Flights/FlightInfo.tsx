import React, { useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "../../utils/cn";
import { Link } from "react-router-dom";
import axios from "axios";
import { Loading } from "../../components/Loading/Loading";
import BottomGradient from "../../components/ui/BottomGradient";
import { isErrored } from "stream";
import { DisplayFlights } from "../../components/DisplayList/DisplayList";
import { Seat_Picker } from "../../components/SeatPicker/SeatPicker";


const seatGroups = [
    { name: "Business Class", rows: 10, cols: 6 },
    { name: "Economy Class", rows: 20, cols: 10 },
    { name: "First Class", rows: 5, cols: 8 },
  ];

const bookedSeats = [
{ row: "A", col: 3 },
{ row: "B", col: 10 },
{ row: "C", col: 2 },
// Add more booked seats as needed
];


export function FlightInfo() {

    return (
        <div className="h-screen w-[450px]">
            <Seat_Picker 
                seatGroups={seatGroups}
                BookedSeats={bookedSeats}
            />
        </div>
    )

}