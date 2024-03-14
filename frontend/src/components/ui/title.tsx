"use client";
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "../../utils/cn";

const Title = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & { title?: string }
>(({ className, title = "Sipmlifly", ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "text-lg font-semibold text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 self-start ps-1",
      className
    )}
    {...props}
  >
    {title}
  </LabelPrimitive.Root>
));

Title.displayName = LabelPrimitive.Root.displayName;

Title.defaultProps = {
  title: "Simplifly"
}

export { Title };
