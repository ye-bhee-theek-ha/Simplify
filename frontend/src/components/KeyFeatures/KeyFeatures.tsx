import { HoverEffect } from "../ui/card-hover-effect";
import React, { useState }  from "react";
import PropTypes from 'prop-types';
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "../../utils/cn";
import { Link } from "react-router-dom";
import { GridItems } from "../gridItems/gridItems";
import { BentoGrid } from "../ui/grid-comp";



const KeyFeatures  = React.forwardRef<
React.ElementRef<typeof LabelPrimitive.Root>,
React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & { displayName?: string} > 
(({ className, displayName = "KeyFeatures", ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      className,
      displayName
    )}
    {...props}
  >
    <div className="max-w-8xl mx-auto px-8">
    {/* bento grid(from grid-comp.tsx) -> hover effect{returns list} (from card-hover-effect.tsx) -> gridItems(from GridItems.tsx) -> calls base grid component from(grid-comp.tsx) */}
    <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[20rem]" >
      <HoverEffect components={GridItems()} />
    </BentoGrid>
    </div>
  </LabelPrimitive.Root>
  )
);

KeyFeatures.displayName = LabelPrimitive.Root.displayName;


export { KeyFeatures };

