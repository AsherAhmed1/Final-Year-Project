import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./JSFiles/Main.js";
import Pricing from "./JSFiles/Pricing.js";
import AboutUs from "./Components/About-Us-Components/AboutUs";
import Contact from "./Components/Contact-Us-Component/Contact";
import Login from "./Components/Login-signup-components/LS";
import SignUpForm from "./Components/Login-signup-components/Login-SignUp-Form/SignUpForm";
import Dashboard from "./Components/Dashboard-Component/Dashboard.jsx";
import Video from "./Components/Video-Component/Video.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/pricing" element = {<Pricing/>} />
      <Route path="/contact" element = {<Contact/>} />
      <Route path="/login" element = {<Login/>} />
      <Route path="/signup" element = {<SignUpForm/>} />
      <Route path="/dashboard" element = {<Dashboard/>} />
      <Route path="/video" element={<Video />} />
    </Routes>
  </Router>
);