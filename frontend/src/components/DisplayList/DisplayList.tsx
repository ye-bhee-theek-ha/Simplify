"use client";
import React, { useState } from "react";
import { Label } from "../../components/ui/label";
import { cn } from "../../utils/cn";
import { Link } from "react-router-dom";
import axios from "axios";
import { Loading } from "../../components/Loading/Loading";
import BottomGradient from "../../components/ui/BottomGradient";

interface Flight {
  FlightID: string;
  DepartureCity: string;
  DestinationCity: string;
  DepartureTime: string;
  ArrivalTime: string;
  AirplaneModel: string;
  FlightType: string;
  Status: string;
  FlightDuration: number;
  FirstClassPrice: number;
  BusinessClassPrice: number;
  EconomyClassPrice: number;
  Date: Date;
}

interface DisplayFlightsSmProps {
  Isloading: boolean;
  data: Flight[];
}


export const DisplayFlightsSm: React.FC<DisplayFlightsSmProps> = ({
  Isloading,
  data,
}) => {

    console.log("display list")
    console.log(data)

    interface ListItemProps {
        departureCity: string;
        destination: string;
        price: string | number;
        departureTime: string;
        type: string
        status: string
      }
    
    const ListItem: React.FC<ListItemProps> = ({ departureCity, destination, price, departureTime, type, status }) => {
      return (
        <div className="bg-gray-100 border rounded px-2 py-1 mb-4 flex justify-between">
          <div className="font-semibold">{departureCity}</div>
          <div className="text-blue-500">{destination}</div>
          <div className="text-red-500">{price}</div>
          <div className="italic">{departureTime}</div>
        </div>
      );
    };

    const Nodata = () => {
        return (
            <div>
                no flights found
            </div>
        )
    }

  return (
    <div className="image/contentSkeleton h-full overflow-y-auto max-h-56 w-full pr-4 box-content"
         
    >
        <div>
            {Isloading && <LoadingModal />}
            {data?.length == 0 ?
              <Nodata/> :
              ( data?.map((data) => (
                <ListItem
                  key={data.FlightID}
                  departureCity={data.DepartureCity}
                  destination={data.DestinationCity}
                  price={data.EconomyClassPrice}
                  type = {data.FlightType}
                  status = {data.Status}
                  departureTime={data.DepartureTime}
                />
              ))
            )}
        </div>
    </div>
  );
}



const LoadingModal = () => {
    return (
      <div className="absolute inset-0 z-50 flex m-2 rounded-xl justify-center items-center backdrop-filter backdrop-blur-lg bg-opacity-50">
        <div className="dark:bg-black p-8 rounded-lg shadow-lg">
          <Loading />
        </div>
      </div>
    );
  };