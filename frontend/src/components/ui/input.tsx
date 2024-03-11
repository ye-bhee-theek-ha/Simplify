// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input
"use client";
import * as React from "react";
import { cn } from "../../utils/cn";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import { IconEye, IconEyeOff } from "@tabler/icons-react";


export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    showIcon?: boolean;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
   }
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, showIcon = false, onKeyDown, ...props }, ref) => {
    const radius = 100; // change this to increase the rdaius of the hover effect
    const [visible, setVisible] = React.useState(false);
    const [passwordVisible, setPasswordVisible] = React.useState(false);

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission
      }
    };

    return (
      <motion.div
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          var(--blue-500),
          transparent 80%
        )
      `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="p-[2px] rounded-lg transition duration-300 group/input relative"
      >
        <input
          type={passwordVisible ? "text" : type}
          className={cn(
            `flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm placeholder:text-neutral-400 dark:placeholder-text-neutral-600 focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] group-hover/input:shadow-none transition duration-400`,
            className
          )}
          ref={ref}
          onKeyDown={(e) => {
            if (onKeyDown) onKeyDown(e);
            handleKeyDown(e);
          }}
          {...props}
        />
        {showIcon && (
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
            onClick={togglePasswordVisibility}
            type="button"
          >
            {passwordVisible ? (
              <IconEyeOff className="text-gray-400 dark:text-gray-500" />
            ) : (
              <IconEye className="text-gray-400 dark:text-gray-500" />
            )}
          </button>
        )}
      </motion.div>
    );
  }
);
Input.displayName = "Input";

Input.defaultProps = {
  showIcon: false,
};

export { Input };
