"use client";
import React, { useState } from "react";
import { Menu, MenuItem } from "../ui/navbar-menu";

import { cn } from "../../utils/cn";
import { Title } from "../ui/title";
import { Button } from "../button/button";
import { BackgroundGradient } from "../ui/background-gradient";

export function Navbar({ className }: { className?: string }) {

  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={cn("fixed top-2 inset-x-0 max-w-2xl mx-auto z-50 h-50", className)}
    >
      <Menu setActive={setActive}>
        <div className="title self-center ">
            <Title />
        </div>
        <div className="content flex space-x-3 flex-1 justify-center self-center">
            <MenuItem setActive={setActive} active={active} item="Services">
            <div className="flex flex-col space-y-4 text-sm">
                
            </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Products">
            <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            
            </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Pricing">
            <div className="flex flex-col space-y-4 text-sm">
            
            </div>
            </MenuItem>
        </div>
        <div className="self-center">
            <BackgroundGradient 
                className=""
                animate = {true}
            >
                <Button displayName="Signup" />
            </BackgroundGradient>
        </div>
      </Menu>
    </div>
  );
}
