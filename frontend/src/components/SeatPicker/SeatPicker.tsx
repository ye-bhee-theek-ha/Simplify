import classNames from "classnames";
import React, { useState } from "react";
import { cn } from "../../utils/cn";
import { PlaneIcon } from "../../assets/SeatPicker/planeImg";

interface SeatGroup {
  name: string;
  rows: number;
  cols: number;
}

interface SeatPickerProps {
  className?: String;
  seatGroups: SeatGroup[];
  BookedSeats: {
    row: string; //A,B,C,D,E
    col: number; //01,03,11,18
    seat_group: string; //first, economy, bussiness
  }[];
  SelectedSeats: { row: string; col: number; group_name: string; }[];
  SetSelectedSeats: React.Dispatch<React.SetStateAction<{ row: string; col: number; group_name: string; }[]>>;

}

export function Seat_Picker({ className, seatGroups, BookedSeats, SelectedSeats, SetSelectedSeats }: SeatPickerProps) {

    const isSeatBooked = (row: string, col: number, group_name:string): boolean => {
        return BookedSeats.some(seat => seat.row === row && seat.col === col && seat.seat_group == group_name);
    };

    const isSeatSelected = (row: string, col: number, group_name: string): boolean => {
        return SelectedSeats.some(seat => seat.row === row && seat.col === col && seat.group_name === group_name);
    };

    const handleSeatClick = (row: string, col: number, group_name:string) => {
        const seatId = `${row}${col.toString().padStart(2, "0")}`;
        console.log("Clicked seat:", seatId);
      
        const seatIndex = SelectedSeats.findIndex(seat => seat.row === row && seat.col === col && seat.group_name === group_name);
      
        if (seatIndex !== -1) {
          // If the seat is already selected, remove it from the selectedSeats array
          const newSelectedSeats = [...SelectedSeats];
          newSelectedSeats.splice(seatIndex, 1);
          SetSelectedSeats(newSelectedSeats);
        } else {
          // If the seat is not selected, add it to the selectedSeats array
          const newSelectedSeats = [...SelectedSeats, { row, col, group_name }];
          SetSelectedSeats(newSelectedSeats);
        }
        

    };

    return (
        <div className="relative seat-picker h-full flex">
        <PlaneIcon className="absolute -z-10" />
        <div className="inset-0 flex flex-col items-center h-1/2 overflow-auto self-end w-full [mask-image:linear-gradient(transparent,white_10%,white_100%,transparent)]"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
            {seatGroups.map((group, index) => (
            <div key={index} className="w-full seat-group my-4 px-4 mt-6 flex flex-col items-center">
                <div className="font-semibold text-xl text-zinc-700">
                    {group.name}
                </div>
                {[...Array(group.rows)].map((_, i) => (
                <div key={i} className="w-full seat-row flex flex-row justify-between mt-4">

                    <div className="w-full seat-group-left flex flex-row justify-evenly">
                    {[...Array(Math.ceil(group.cols / 2))].map((_, j) => (
                        <div
                        key={j + 1}
                        className={cn("seat flex seat h-12 w-8 rounded-md text-neutral-200 items-center justify-center bg-zinc-500 hover:bg-zinc-600", {
                            "bg-red-500 hover:bg-red-500": isSeatBooked(String.fromCharCode(65 + i), j+1, group.name)},
                            {
                            "ring-4": isSeatSelected(String.fromCharCode(65 + i), j+1, group.name)
                            })}
                        onClick={() => {
                            if (!isSeatBooked(String.fromCharCode(65 + i), j+1, group.name)) {
                                handleSeatClick(String.fromCharCode(65 + i), j + 1, group.name)}
                            }
                        }
                        >
                        {j + 1}
                        </div>
                    ))}
                    </div>

                    <div className={`text-center text-lg font-medium text-zinc-700 content-center w-12 row ${String.fromCharCode(65 + i)}`}>
                        {String.fromCharCode(65 + i)}
                    </div>

                    <div className="w-full seat-group-right flex flex-row justify-evenly">
                        {[...Array(Math.floor(group.cols / 2))].map((_, k) => (
                            <div
                            key={k + 1}
                            className={cn("seat flex seat h-12 w-8 rounded-md text-neutral-200 items-center justify-center bg-zinc-500 hover:bg-zinc-600", {
                                    "bg-red-500 hover:bg-red-500": isSeatBooked(String.fromCharCode(65 + i), group.cols / 2 + k + 1, group.name)
                                },
                                {
                                    "ring-4": isSeatSelected(String.fromCharCode(65 + i), group.cols / 2 + k + 1, group.name)
                                })}
                            onClick={() => {
                                if (!isSeatBooked(String.fromCharCode(65 + i), group.cols / 2 + k + 1, group.name)) {
                                    handleSeatClick(String.fromCharCode(65 + i), Math.ceil(group.cols / 2) + k + 1, group.name);
                                }
                                }
                            }
                            >
                            {(group.cols / 2) + k + 1}
                            </div>
                        ))}
                    </div>

                </div>
                ))}
            </div>
            ))}
        </div>
    </div>
  );
}
