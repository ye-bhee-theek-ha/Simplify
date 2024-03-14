
"use client";
import React, { useState }  from "react";
import PropTypes from 'prop-types';
import BottomGradient from "../ui/BottomGradient";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "../../utils/cn";


const Button = React.forwardRef<
React.ElementRef<typeof LabelPrimitive.Root>,
React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & { displayName?: string } > 
(({ className, displayName = "btn", ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      className
    )}
    {...props}
  >
    <div className="button
      mx-3 h-8 text-lg bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-full font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]
    ">
      {displayName}
      <BottomGradient />
    </div>
  </LabelPrimitive.Root>
  )
);

Button.displayName = LabelPrimitive.Root.displayName;

// Default props
Button.defaultProps = {
  displayName: "btn"
}

export { Button };
