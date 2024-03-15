import react from "react";
import {Navbar} from "../../components/navbar/navbar"
import {HeroSection} from '../../components/HeroSection/HeroSection';
import {KeyFeatures} from "../../components/KeyFeatures/KeyFeatures";

function Homescreen() {
  return (
  <div className="Homescreen">
    <Navbar/>

    <HeroSection
      button1="Lern More"
      button2="Book Now"  
    />

    <KeyFeatures/>

  </div>);
};

export default Homescreen;
