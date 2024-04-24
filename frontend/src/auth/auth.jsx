import {  createContext, useContext } from "react";
import { useState } from "react";
export const AuthContext=createContext()

export const AuthProvider=({children})=>{

    const [token,settoken]=useState(localStorage.getItem('token'))

    const storeTokenInLS=(serverToken)=>{
        console.log("token saved")
        return localStorage.setItem('token', serverToken)
    }

    const getToken = () => {
        return localStorage.getItem('token')
    } 

    let isloggedin =!! token;

    const SetImg = (Img) => {
        console.log("img saved")
        return localStorage.setItem('Img', Img)
    }

    const GetImg = () => {
        return localStorage.getItem('Img')
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("Img");

      };
    
    return <AuthContext.Provider value={{storeTokenInLS, isloggedin, getToken, SetImg, GetImg, logout}}>
        {children}
    </AuthContext.Provider>


}


export const useAuth=()=>{
    return useContext(AuthContext)
}
