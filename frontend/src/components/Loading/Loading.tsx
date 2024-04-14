import React from "react";
import HashLoader from "react-spinners/HashLoader";
import { cn } from "../../utils/cn";

export function Loading({className=""}) {
    return (
        <div className={cn("Loading", className)}>
            <HashLoader />
        </div>
    )
};