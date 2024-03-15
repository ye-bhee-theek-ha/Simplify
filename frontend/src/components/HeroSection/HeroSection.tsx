
"use client";
import React, { useState }  from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "../../utils/cn";
import { Link } from "react-router-dom";



const HeroSection  = React.forwardRef<
React.ElementRef<typeof LabelPrimitive.Root>,
React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & { 
    title?: string,
    discription?: string,
    button1?: string,
    route1?: string,
    button2?: string,
    route2?: string} > 

(({ className, title = "HeroSection", discription = "this is a sample discription, lets make it a little longer", button1, route1= "/", button2, route2="/", ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      className,
      title,
      discription,
      button1,
      route1,
      button2,
      route2,
    )}
    {...props}
  >
    <section className="bg-white dark:bg-gray-900">
        <div className="h-screen px-4 py-8 mx-auto lg:py-16 flex justify-center">
            <div className=" ps-9 place-self-center flex-row">
                <div>
                    <h1 className="max-w-3xl mb-4 text-6xl md:text-start leading-none dark:text-white">{title}</h1>
                    <p className="ps-1 max-w-4xl inline-flex text-start mb-6 text-xl text-gray-500 lg:mb-8 dark:text-gray-400">{discription}</p>
                </div>
                <div>
                    <Link to={route1} className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg 
                        bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 dark:bg-zinc-800
                        hover:bg-zinc-800
                        shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                        {button1}
                        <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </Link>
                    <Link to={route2} className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                        {button2}
                    </Link> 
                </div>
            </div>
            <div className="hidden md:flex items-center ">
                <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" alt="mockup"/>
            </div>                
        </div>
    </section>
  </LabelPrimitive.Root>
  )
);

HeroSection .displayName = LabelPrimitive.Root.displayName;


export { HeroSection  };
