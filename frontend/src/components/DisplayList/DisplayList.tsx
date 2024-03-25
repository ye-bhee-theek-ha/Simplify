"use client";
import React, { useState } from "react";
import { cn } from "../../utils/cn";
import { Link } from "react-router-dom";
import axios from "axios";
import { Loading } from "../../components/Loading/Loading";
import BottomGradient from "../../components/ui/BottomGradient";

import {
  IconCalendarClock,
  IconTimeline,
  IconTag,
  IconPlaneArrival,
  IconPlaneDeparture,
  IconCoins,
  IconPlaneTilt
} from "@tabler/icons-react";
import { Button } from "../button/button";


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

interface DisplayFlightsProps {
  Isloading: boolean;
  data: Flight[];
}


export const DisplayFlightsSm: React.FC<DisplayFlightsProps> = ({
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

  return (
    <div className="image/contentSkeleton h-full overflow-y-auto max-h-56 w-full pr-4 box-content">
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


export const DisplayFlights: React.FC<DisplayFlightsProps> = ({
  Isloading,
  data,
}) => {

    console.log("display list")
    console.log(data)

    interface ListItemProps {
        FlightId: string;
        departureCity: string;
        destination: string;
        price: string | number;
        departureTime: string;
        type: string
        status: string
        aircraft: string
      }
    
    const ListItem: React.FC<ListItemProps> = ({ departureCity, destination, price, departureTime, type, status, FlightId, aircraft }) => {
      return (
        <div className="p-4 rounded-lg shadow-md font-medium text-neutral-700 bg-gray-100 border px-4 py-4 flex mb-4 h-28 ">

          <div className="flex flex-col items-center justify-between">
            <div className="flex flex-row items-center">
              <IconCalendarClock className="h-4 w-4 text-sky-950" />
              <h3 className="text-lg px-2 text-sky-900">{status}</h3>
            </div>
            <div className="w-full flex flex-row">
              <div className="inline-flex items-center justify-start self-start">
                <IconTimeline className="h-4 w-4 text-neutral-500" />
                <p className="text-md px-1">{departureTime}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col items-center justify-between px-3 lg:px-6">
            <div className="w-full justify-around flex flex-row">
              <div className="flex items-center self-start mt-2 mx-2">
                <IconTag className="h-4 w-4 text-neutral-500" />
                <p className="px-2 font-normal">{FlightId}</p>
              </div>
              <div className="flex items-center self-start mt-2 mx-2 min-w-[6rem]">
                <IconCoins className="h-4 w-4 text-neutral-500" />
                <p className="px-2 font-normal">Rs. {price}</p>
              </div>
              <Label
                text={type}
              />
                
            </div>
            <div className="mt-2 flex flex-row w-[100%] max-w-[28rem] min-w-[15rem] items-center">
              <p className="text-gray-500">{departureCity}</p>
              <div className="w-full px-2 mb-5">
                <div className="w-full flex flex-row justify-between p-1">
                  <IconPlaneDeparture className="h-5 w-5 text-neutral-500 self-start" />
                  <IconPlaneArrival className="h-5 w-5 text-neutral-500 self-end" />
                </div>
                  <div className="h-0.5 rounded-md bg-gray-500"></div>
              </div>
              <p className="text-gray-500">{destination}</p>
            </div>
          </div>

          <div className="flex items-center">
            <Button
              className="h-12 rounded-xl text-center flex"
              displayName="Book Now"
            />
          </div>
        </div>
      );
    };

  return (
    <div className="h-full w-full">
        <div>
            {Isloading && <LoadingModal />}
            {data?.length == 0 ?
              <Nodata/> :
              ( data?.map((data) => (
                <ListItem
                  FlightId={data.FlightID}
                  key={data.FlightID}
                  departureCity={data.DepartureCity}
                  destination={data.DestinationCity}
                  price={data.EconomyClassPrice}
                  type = {data.FlightType}
                  status = {data.Status}
                  departureTime={data.DepartureTime}
                  aircraft={data.AirplaneModel}
                />
                
              ))
            )}
        </div>
    </div>
  );
}


const Label = ({text, className}:{text:string, className?:string}) => {
  return(
    <span className={cn("inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-sm font-medium text-gray-600 ring-1",
    className)}                 
    >
    {text}
    </span>
  )
}


const Nodata = () => {
  return (
      <div>
          no flights found
      </div>
  )
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