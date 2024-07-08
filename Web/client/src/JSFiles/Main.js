import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Components/Home-Components/Header/Header";
import Home from "../Components/Home-Components/Home/Home";
import Options from "../Components/Home-Components/Options/Options";
// import Template from "../Components/Home-Components/Templates/Template";
// import HowTo from "../Components/Home-Components/Steps/HowTo";
import Work from "../Components/Home-Components/Work/Work";
import Why from "../Components/Home-Components/Why/Why";
import Testimonials from "../Components/Home-Components/Testimonials/Testimonials";
import Video from "../Components/Home-Components/Video/Video";
import Slogan from "../Components/Home-Components/Slogan/Slogan";
import Footer from "../Components/Home-Components/Footer/Footer";

function Main() {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.title = "VisuMeet - Home";
        break;
      default:
        document.title = "My App";
        break;
    }
  }, [location.pathname]);

  return (
    <div>
      {/* Home Page */}
      <div>
        <Header />
        <Home />
        <Options />
        <Why />
        <Work />
        {/* <Template /> */}
        {/* <HowTo /> */}
        <Testimonials />
        <Video />
        <Slogan />
        <Footer />
      </div>
      {/* Home Page */}
    </div>
  );
}

export default Main;
