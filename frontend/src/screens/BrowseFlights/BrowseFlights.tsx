"use client";
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

export interface BrowseFlightsSmProps {
  isSearched: boolean;
  onSearch: (formData: any) => void;
  onRefresh: () => void;
}

export const BrowseFlightsSm: React.FC<BrowseFlightsSmProps> = ({
  isSearched,
  onSearch,
  onRefresh,
}) => {
  const [OriginCity, SetOriginCity] = useState("");
  const [DestinationCity, SetDestinationCity] = useState("");
  const [DepartureTime, SetDepartureTime] = useState("");
  const [ArrivalTime, SetArrivalTime] = useState("");

  const[error, SetError] = useState("");
  const[loading, SetLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = {
      "OriginCity": OriginCity,
      "DestinationCity": DestinationCity,
      "DepartureTime": DepartureTime,
    };

    const jsonData = JSON.stringify(formData);

    onSearch(jsonData); 
  };

  const handleRefresh = () => {
    
    onRefresh();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className=" mx-auto space-y-4">
        <div className="grid grid-cols-3 mt-3 gap-4">
          <div>
            <Input
              id="originCity"
              type="text"
              placeholder="Enter Origin City"
              value={OriginCity}
              onChange={(e) => SetOriginCity(e.target.value)}
            />
          </div>
          <div>
            <Input
              id="destinationCity"
              type="text"
              placeholder="Enter Destination City"
              value={DestinationCity}
              onChange={(e) => SetDestinationCity(e.target.value)}
            />
          </div>
          <div>
            <Input
              id="departureTime"
              type="text"
              placeholder="Enter Departure Time"
              value={DepartureTime}
              onChange={(e) => SetDepartureTime(e.target.value)}
            />
          </div>
        </div>
      
        <div className="grid grid-cols-3 gap-4 p-4 px-8">
          <div>
            <Link
              to="/BrowseFlights"
            >
              <button
                className="w-full h-10 p-[2px] rounded-md bg-gray-200 relative group/btn"
              >
                <div className="absolute inset-0 bg-grey w-full text-white rounded-md" />
                <div className="flex items-center justify-center w-full h-full bg-neutral-100 rounded-md relative group transition duration-200 text-black hover:bg-transparent font-medium">
                  More Options
                </div>
              </button>
            </Link>
          </div>
          <div>
            <button
              className="w-full h-10 p-[2px] rounded-md bg-gray-200 relative group/btn"
              onClick={handleRefresh}
              type="button"
            >
              <div className="absolute inset-0 bg-grey w-full text-white rounded-md" />
              <div className="flex items-center justify-center w-full h-full bg-neutral-100 rounded-md relative group transition duration-200 text-black hover:bg-transparent font-medium">
                Refresh
              </div>
            </button>
          </div>
          <div>
            <button
              className=" bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Search Flights
              <BottomGradient />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}


export function BrowseFlights() {

  const [Airline, SetAirline] = useState(""); //return, one way
  const [OriginCity, SetOriginCity] = useState("");
  const [DestinationCity, SetDestinationCity] = useState("");
  const [DepartureTime, SetDepartureTime] = useState("");
  const [ArrivalTime, SetArrivalTime] = useState("");
  const [Type, SetType] = useState(""); //return, one way
  const [Class, SetClass] = useState(""); //economy buiseness first

  const[error, SetError] = useState("");
  const[loading, SetLoading] = useState(false)
  const[IsSearched, setIsSearched] = useState(false)

  const [FlightData, SetFlightData] = useState([])


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>
  {
    e.preventDefault();
    
    SetLoading(true);
    setIsSearched(true);

    console.log("Search Button Clicked")

    const formData = {
      "OriginCity": OriginCity,
      "DestinationCity": DestinationCity,
      "DepartureTime": DepartureTime,
    };

    const jsonData = JSON.stringify(formData);

    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }
      SetLoading(true);
  
      const { data } = await axios.post(
        "http://127.0.0.1:5000/api/flights/getflights", 
        {
         
        },
        config
      );


      SetFlightData(data)

      SetLoading(false);
      SetError("");

    } catch (error: any) {
      SetError(error.response.data.message);
      SetLoading(false);
    }
  };

  return (
    <div>
      <div className=" my-14 px-5 mx-10 rounded-2xl p-3 md:p-5 shadow-input bg-white dark:bg-black self-center">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Find Flights
        </h2>

        <form onSubmit={handleSubmit} className=" mx-auto space-y-4">

        <div className="grid grid-cols-3 mt-3 gap-4">
          <div>
            <Label htmlFor="airline">Airline</Label>
            <Input
              id="airline"
              type="text"
              placeholder="Enter Airline"
              value={Airline}
              onChange={(e) => SetAirline(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="originCity">Origin City</Label>
            <Input
              id="originCity"
              type="text"
              placeholder="Enter Origin City"
              value={OriginCity}
              onChange={(e) => SetOriginCity(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="destinationCity">Destination City</Label>
            <Input
              id="destinationCity"
              type="text"
              placeholder="Enter Destination City"
              value={DestinationCity}
              onChange={(e) => SetDestinationCity(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="departureTime">Departure Time</Label>
            <Input
              id="departureTime"
              type="text"
              placeholder="Enter Departure Time"
              value={DepartureTime}
              onChange={(e) => SetDepartureTime(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="arrivalTime">Arrival Time</Label>
            <Input
              id="arrivalTime"
              type="text"
              placeholder="Enter Arrival Time"
              value={ArrivalTime}
              onChange={(e) => SetArrivalTime(e.target.value)}
            />
          </div>  
          <div>
            <div>
              <Label htmlFor="type">Type</Label>
              <select
                id="type"
                value={Type}
                onChange={(e) => SetType(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="class">Class</Label>
              <select
                id="class"
                value={Class}
                onChange={(e) => SetClass(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 p-5">
          <div>
            <button
              className=" mt-4 border-2 border-gray bg-neutral-100 block w-full text-black rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="button"
            >
              More options
              <BottomGradient />
            </button>
          </div>
          <div>
            <button
              className=" mt-4 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Search Flights
              <BottomGradient />
            </button>
          </div>
        </div>
      </form>
    </div> 
    <div className="flex flex-row">
      <div className="w-56 my-14 px-5 mx-5 rounded-2xl p-3 md:p-5 shadow-input bg-white dark:bg-black self-start hidden lg:flex ">
      my-14 px-5 mx-10 rounded-2xl p-3 md:p-5 shadow-input bg-white dark:bg-black self-center
      </div>
      <div className="flex flex-1 my-14 px-5 mx-5 mr-10 rounded-2xl p-3 md:p-5 shadow-input bg-white dark:bg-black self-center">
        {error && <DisplayError error = {error} />}
        {IsSearched && <DisplayFlights
          Isloading = {loading}
          data={FlightData}
        />}
      </div>
    </div>
  </div>
  );
}


const DisplayError = ({
  error
}: {
  error:string
}) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
      {error}
    </div>
  );
};

const LabelInputContainer = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <div className={cn("flex flex-col space-y-2 w-full", className)}>
        {children}
      </div>
    );
  };