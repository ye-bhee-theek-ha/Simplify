//returns a list of components

import axios from "axios";
import { cn } from "../../utils/cn";
import React, { useState } from "react";
import { BentoGridItem } from "../ui/grid-comp";
import { motion } from "framer-motion";
import { BrowseFlights, BrowseFlightsSm } from "../../screens/BrowseFlights/BrowseFlights";
import { Loading } from "../Loading/Loading";
import { DisplayFlightsSm } from "../DisplayList/DisplayList";

import {
  IconPlaneDeparture,
  IconUsersGroup,
  IconMessage2,
  IconMapSearch,
} from "@tabler/icons-react";

export function GridItems() {

  const [IsSearched, setIsSearched] = useState(false);
  const[error, SetError] = useState("");
  const[loading, SetLoading] = useState(false);

  const [Type, SetType] = useState("") //show title or not

  const [FlightData, SetFlightData] = useState([])

  // handle Search Button Click
  const handleSearchButtonClick = async (jsonData: any) => {
    setIsSearched(true);
    SetType("list");
    SetLoading(true);

    console.log("Search Button Clicked")

    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }
      SetLoading(true);
  
      const { data } = await axios.post(
        "http://127.0.0.1:5000/api/flights/getFilteredFlights", 
         jsonData
        ,
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

  const handleRefreshButtonClick = async() => {

    setIsSearched(true);
    SetType("list");
    SetLoading(true);

    console.log("Search Button Clicked")

    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }
      SetLoading(true);
  
      const { data } = await axios.post(
        "http://127.0.0.1:5000/api/flights/getFilteredFlights", 
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

  const errMsg = ({error = "Something wrong on our End."}) => {
    return (
      <div className="bg-red-100 border text-sm border-red-400 text-red-700 mb-2 px-3 py-2 rounded relative flex" role="alert">
        <span className="block sm:inline mx-1 font-semibold self-start">{error}</span>
      </div>
    );
  };

  console.log(FlightData)
  const items = [
    {
      title: "Search",
      description: "Search for flights to anywhere in the world",
      header: <Browse 
        isSearched={IsSearched}
        onSearch={handleSearchButtonClick}
        onRefresh={handleRefreshButtonClick}
      />,
      className: "md:col-span-2",
      icon: <IconMapSearch className="icon h-4 w-4 text-neutral-500" />,
    },
    { 
      Type : Type,
      title: "Flights today",
      description: "Find flights leaving today.",
      header: <DisplayFlightsSm
        Isloading = {loading}
        data = {FlightData}
      />,
      className: "md:col-span-1",
      icon: <IconPlaneDeparture className="h-4 w-4 text-neutral-500" />,
      changeable: true,
    },
    {
      title: "Contact us",
      description: "Feel free to reach out to us if you have any queries.",
      header: <Chatwithus />,
      className: "md:col-span-1",
      icon: <IconMessage2 className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "About us",
      header: <Skeleton />,
      className: "md:col-span-2",
      icon: <IconUsersGroup className="h-4 w-4 text-neutral-500" />,
    },
  ];
  
  return items.map((item, i) => ({
        component: (<BentoGridItem
          type={item.Type}
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon= {item.icon}
          className={item.className}
        />),
        className: item.className
        }))
    };

const Chatwithus = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };
  
  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="image/contentSkeleton flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-white dark:bg-black"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
      >
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
      </motion.div>
    </motion.div>
  );
};

interface BrowseProps {
  isSearched: boolean;
  onSearch: (jsonData: any) => void;
  onRefresh: () => void;
}

const Browse: React.FC<BrowseProps> = ({ isSearched, onSearch, onRefresh }) => 
{
  return (
    <div className="image/contentSkeleton">
      <BrowseFlightsSm
        isSearched={isSearched}
        onSearch={(jsonData) => onSearch(jsonData)}
        onRefresh={onRefresh}
      />
    </div>
  );
};

const Skeleton = () => (
  <div className="image/contentSkeleton flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black">
    <div className="bg-red-50">

    </div>
  </div>
);


