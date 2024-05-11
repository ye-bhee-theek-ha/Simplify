"use client";
import React, { useEffect, useState } from "react";
import { Menu, MenuItem } from "../ui/navbar-menu";
import axios from "axios";
import { cn } from "../../utils/cn";
import { Title } from "../ui/title";
import { Button } from "../button/button";
import { BackgroundGradient } from "../ui/background-gradient";
import { userInfo } from "os";
import { useAuth } from "../../auth/auth"
import { Link, useNavigate } from "react-router-dom";


export function Navbar({ className }: { className?: string }) {
  
  const [active, setActive] = useState<string | null>(null);

  const { isloggedin, getToken, GetImg } = useAuth();

  let Img = isloggedin ? GetImg() : null;

  let token = isloggedin ? getToken() : null;

  useEffect(() => {

    Img = isloggedin ? GetImg() : null;

    token = isloggedin ? getToken() : null;

  },[isloggedin])


  return (
    <div
      className={cn(
        "fixed top-2 inset-x-0 max-w-2xl mx-auto z-50 h-50",
        className
      )}
    >
      <Menu setActive={setActive}>
        <Link className="title self-center " to={"/"}>
          <Title />
        </Link>
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
            {!isloggedin && <Button displayName="Signup" route="/signup" />}
            {isloggedin && <ProfileImg imageData={Img}/>}
          </BackgroundGradient>
        </div>
      </Menu>
    </div>
  );
}


const ProfileImg = ({ imageData }: {imageData: String}) => {
  const navigate = useNavigate();
  return (
    <div className="profile-img">
      <button
        onClick = {() => navigate("/dashboard")}
      >
        <img src={`data:image/png;base64,${imageData}`} alt="Profile" className="h-9 w-9 rounded-full" />
      </button>
    </div>
  );
};