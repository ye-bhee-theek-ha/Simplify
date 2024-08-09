---
to: "frontend/src/components/<%= name %>/index.js"
---


"use client";
import React, { useState }  from "react";
import PropTypes from 'prop-types';
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "../../utils/cn";
import { Link } from "react-router-dom";



const <%= (name) %>  = React.forwardRef<
React.ElementRef<typeof LabelPrimitive.Root>,
React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & { displayName?: string} > 
(({ className, displayName = "<%= (name) %>", ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      className,
      displayName
    )}
    {...props}
  >
    {displayName}
  </LabelPrimitive.Root>
  )
);

<%= (name) %> .displayName = LabelPrimitive.Root.displayName;


export { <%= (name) %>  };





