//returns a list of components


import { cn } from "../../utils/cn";
import React from "react";
import { BentoGridItem } from "../ui/grid-comp";
import {
  IconPlaneDeparture,
  IconUsersGroup,
  IconMessage2,
  IconMapSearch,
} from "@tabler/icons-react";
import classNames from "classnames";
import { motion } from "framer-motion";
import { BrowseFlights, BrowseFlightsSm } from "../../screens/BrowseFlights/BrowseFlights";

export function GridItems() {
  return items.map((item, i) => ({
        component: (<BentoGridItem
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
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
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


const Browse = () => {

  return (
    <BrowseFlightsSm/>
  );
};

const DisplayFlights = () => {

  return (
    <div>
    </div>
  );
};


const Skeleton = () => (
  <div className="image/contentSkeleton flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black">
    <div className="bg-red-50">

    </div>
  </div>
);
const items = [
  {
    title: "Search",
    description: "Serach for flights to your anywhere in the world",
    header: <Browse />,
    className: "md:col-span-2",
    icon: <IconMapSearch className="icon h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Departing Flights",
    description: "Find flights leaving today.",
    header: <DisplayFlights />,
    className: "md:col-span-1",
    icon: <IconPlaneDeparture className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Contact us",
    description: "feel free to reach out to us if you have any queries.",
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
