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
{ row: "A", col: 3, seat_group: "First Class" },
{ row: "B", col: 10, seat_group: "Economy Class" },
{ row: "C", col: 2, seat_group: "Business Class" },
// Add more booked seats as needed
];


export function FlightInfo() {

    const [SelectedSeats, SetSelectedSeats] = useState<{ row: string; col: number; group_name: string; }[]>([]);

    return (
        <div className="h-screen w-[450px]">
            <Seat_Picker 
                seatGroups={seatGroups}
                BookedSeats={bookedSeats}
                SelectedSeats={SelectedSeats}
                SetSelectedSeats={SetSelectedSeats}
            />
        </div>
    )

}