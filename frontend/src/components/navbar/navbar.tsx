"use client";
import React, { useEffect, useState } from "react";
import { Menu, MenuItem } from "../ui/navbar-menu";

import { cn } from "../../utils/cn";
import { Title } from "../ui/title";
import { Button } from "../button/button";
import { BackgroundGradient } from "../ui/background-gradient";
import { userInfo } from "os";

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const userInfoString = localStorage.getItem("userInfo");

  useEffect(() => {
    const userInfoString = localStorage.getItem('userInfo');
    if (userInfoString) {
      setIsLoggedIn(true);
      const userInfo = JSON.parse(userInfoString);
      console.log(userInfo);
    } else {
      console.log('user not logged in');
    }
  }, []);

  return (
    <div
      className={cn(
        "fixed top-2 inset-x-0 max-w-2xl mx-auto z-50 h-50",
        className
      )}
    >
      <Menu setActive={setActive}>
        <div className="title self-center ">
          <Title />
        </div>
        <div className="content flex space-x-3 flex-1 justify-center self-center">
          <MenuItem setActive={setActive} active={active} item="Services">
            <div className="flex flex-col space-y-4 text-sm">
              <p className="text-sm font-normal">Book FLights</p>
              <p className="text-sm font-normal">Flight Info</p>
              <p className="text-sm font-normal">User History</p>            
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="Products">
            <div className="flex flex-col space-y-4 text-sm">
              <p className="text-sm font-normal">Tickets</p>
              <p className="text-sm font-normal">Etc</p>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="Pricing">
            <div className="flex flex-col space-y-4 text-sm">
            <p className="text-sm font-normal">Affordable</p>
            </div>
          </MenuItem>
        </div>
        <div className="self-center">
          <BackgroundGradient className="" animate={true}>
            {!isLoggedIn && <Button displayName="Signup" route="/signup" />}
            {isLoggedIn && <Button displayName="username" route="/dashboard"/>}
          </BackgroundGradient>
        </div>
      </Menu>
    </div>
  );
}
