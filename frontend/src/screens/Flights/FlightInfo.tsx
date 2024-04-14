import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import { Button } from "../../components/button/button";
import {
  IconCalendarClock,
  IconTruckLoading,
  IconPlaneOff,
  IconClockExclamation,
  IconPlaneInflight,
  IconTimeline,
  IconTag,
  IconPlaneArrival,
  IconPlaneDeparture,
  IconCoins,
  IconCalendarMonth,
  IconPlaneTilt,
  IconMapPins,
  IconWorld,
} from "@tabler/icons-react";

interface SeatGroup {
  name: string;
  rows: number | null;
  cols: number | null;
}

interface BookedSeat {
  row: string;
  col: number;
  group_name: string;
}

interface FlightData {
  FlightID: string;
  Date: string;
  DepartureCity: string;
  DestinationCity: string;
  DepartureTime: string;
  FlightDuration: number;
  AirplaneModel: string;
  FlightType: string;
  FirstClassPrice: number;
  BusinessClassPrice: number;
  EconomyClassPrice: number;
  Status: string;
  SeatGroups: {
    Economy: SeatGroup;
    Business: SeatGroup;
    First: SeatGroup;
  };
  BookedSeats: BookedSeat[]; // Adjusted type for BookedSeats
}

export function FlightInfo() {
  const { FlightID } = useParams();

  const [SelectedSeats, SetSelectedSeats] = useState<
    { row: string; col: number; group_name: string }[]
  >([]);

  const [flightData, setFlightData] = useState<FlightData>();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    async function fetchFlightData() {
      try {
        const response = await axios.post(
          `http://127.0.0.1:5000/api/flights/getFlightById/${FlightID}`
        );
        setFlightData(response.data);
        setLoading(false);
        console.log(flightData);
      } catch (error) {
        console.error("Error fetching flight data:", error);
        setLoading(false);
      }
    }
    fetchFlightData();
  }, []);

  if (!flightData) {
    if (loading) {
      return <LoadingModal/>;
    }
    return <div>Error: Flight data not found.</div>;
  } else if (!flightData.SeatGroups) {
    if (loading) {
      return <LoadingModal/>;
    }
    return <div>Error: Seat groups not found.</div>;
  }

  const seatGroupsArray = Object.values(flightData.SeatGroups);
  const BookedSeatsArray = Object.values(flightData.BookedSeats);

  return (
    <div className="">
      {loading && <LoadingModal />}
      <div className="flex">
        <div className="h-screen w-[380px] hover:w-[420px] overflow-hidden transform duration-700">
          <Seat_Picker
            seatGroups={seatGroupsArray.map((seatGroup) => ({
              name: seatGroup.name,
              rows: seatGroup.rows || 0,
              cols: seatGroup.cols || 0,
            }))}
            BookedSeats={BookedSeatsArray.map((BookedSeat) => ({
              seat_group: BookedSeat.group_name,
              row: BookedSeat.row,
              col: BookedSeat.col,
            }))}
            SelectedSeats={SelectedSeats}
            SetSelectedSeats={SetSelectedSeats}
            className="mx-6 pt-10 hover:pt-0 transform duration-700 hover:-translate-y-7"
          />
        </div>
      </div>
    </div>
  );
}


const LoadingModal = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-lg">
      <div className="dark:bg-black p-8 rounded-lg shadow-lg bg-slate-100">
        <Loading />
      </div>
    </div>
  );
};
