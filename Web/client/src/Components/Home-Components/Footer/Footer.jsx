import React from "react";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
  BsPinterest,
} from "react-icons/bs";

const Footer = () => {
  const logo = <AiOutlineCopyrightCircle />;

  return (
    <div>
      <div>
        <hr className="border border-gray-400 mt-40" />
      </div>
      <div className="mt-16 pb-16 text-center flex flex-col md:flex-row md:justify-around">
        {/* starting of the first links */}

        <div className="text-center md:text-left mb-8 md:mb-0 md:mr-8">
          <h1
            style={{ fontFamily: "Dancing Script" }}
            className="font-bold text-3xl mb-4"
          >
            Company
          </h1>
          <ul style={{ fontFamily: "Edu NSW ACT Foundation" }}>
            <li className="font-bold text-xl mb-2 cursor-pointer text-blue-600 hover:rounded-lg hover:text-white hover:bg-blue-400">
              About Us
            </li>
            <li className="font-bold text-xl mb-2 cursor-pointer text-blue-600 hover:rounded-lg hover:text-white hover:bg-blue-400">
              Terms
            </li>
            <li className="font-bold text-xl mb-2 cursor-pointer text-blue-600 hover:rounded-lg hover:text-white hover:bg-blue-400">
              Privacy
            </li>
            <li className="font-bold text-xl mb-2 cursor-pointer text-blue-600 hover:rounded-lg hover:text-white hover:bg-blue-400">
              Contact
            </li>
            <li className="font-bold text-xl mb-2 cursor-pointer text-blue-600 hover:rounded-lg hover:text-white hover:bg-blue-400">
              Security
            </li>
          </ul>
        </div>

        {/* Ending of the first links */}

        {/* Starting of the second links */}

        <div className="text-center md:text-left mb-8 md:mb-0 md:mr-8">
          <h1
            style={{ fontFamily: "Dancing Script" }}
            className="font-bold text-3xl mb-4"
          >
            Resources
          </h1>
          <ul style={{ fontFamily: "Edu NSW ACT Foundation" }}>
            <li className="font-bold text-xl mb-2 cursor-pointer text-blue-600 hover:rounded-lg hover:text-white hover:bg-blue-400">
              Pricing
            </li>
            <li className="font-bold text-xl mb-2 cursor-pointer text-blue-600 hover:rounded-lg hover:text-white hover:bg-blue-400">
              Developers
            </li>
            <li className="font-bold text-xl mb-2 cursor-pointer text-blue-600 hover:rounded-lg hover:text-white hover:bg-blue-400">
              Status Page
            </li>
            <li className="font-bold text-xl mb-2 cursor-pointer text-blue-600 hover:rounded-lg hover:text-white hover:bg-blue-400">
              Blog
            </li>
            <li className="font-bold text-xl mb-2 cursor-pointer text-blue-600 hover:rounded-lg hover:text-white hover:bg-blue-400">
              Help
            </li>
          </ul>
        </div>

        {/* Ending of the second links */}

        {/* Starting of the third links */}
        <div className="text-center md:text-left mb-8 md:mb-0 md:mr-8">
          <h1
            style={{ fontFamily: "Dancing Script" }}
            className="font-bold text-3xl mb-4"
          >
            Products
          </h1>
          <ul style={{ fontFamily: "Edu NSW ACT Foundation" }}>
            <li className="font-bold text-xl mb-2 cursor-pointer text-blue-600 hover:rounded-lg hover:text-white hover:bg-blue-400">
              Bookshelf
            </li>
            <li className="font-bold text-xl mb-2 cursor-pointer text-blue-600 hover:rounded-lg hover:text-white hover:bg-blue-400">
              Editing Studio
            </li>
          </ul>
        </div>
        {/* Ending of the third links */}

        {/* Starting of the fourth links */}
        <div className="text-center md:text-left mb-8 md:mb-0 md:mr-8">
          <h1
            style={{ fontFamily: "Dancing Script" }}
            className="font-bold text-3xl mb-4"
          >
            Discover
          </h1>
          <ul style={{ fontFamily: "Edu NSW ACT Foundation" }}>
            <li className="font-bold text-xl mb-2 cursor-pointer text-blue-600 hover:rounded-lg hover:text-white hover:bg-blue-400">
              Read
            </li>
            <li className="font-bold text-xl mb-2 cursor-pointer text-blue-600 hover:rounded-lg hover:text-white hover:bg-blue-400">
              Examples
            </li>
            <li className="font-bold text-xl mb-2 cursor-pointer text-blue-600 hover:rounded-lg hover:text-white hover:bg-blue-400">
              Search
            </li>
          </ul>
        </div>
        {/* Ending of the fourth links */}

        {/* Starting of the fifth links */}
        <div className="text-center md:text-left mb-8 md:mb-0 md:mr-8">
          <h1
            style={{ fontFamily: "Dancing Script" }}
            className="font-bold text-3xl mb-4"
          >
            Solutions
          </h1>
          <ul style={{ fontFamily: "Edu NSW ACT Foundation" }}>
            <li className="font-bold text-xl mb-2 cursor-pointer text-blue-600 hover:rounded-lg hover:text-white hover:bg-blue-400">
              For Marketers
            </li>
            <li className="font-bold text-xl mb-2 cursor-pointer text-blue-600 hover:rounded-lg hover:text-white hover:bg-blue-400">
              For Business
            </li>
            <li className="font-bold text-xl mb-2 cursor-pointer text-blue-600 hover:rounded-lg hover:text-white hover:bg-blue-400">
              Collaboration
            </li>
            <li className="font-bold text-xl mb-2 cursor-pointer text-blue-600 hover:rounded-lg hover:text-white hover:bg-blue-400">
              For Education
            </li>
            <li className="font-bold text-xl mb-2 cursor-pointer text-blue-600 hover:rounded-lg hover:text-white hover:bg-blue-400">
              Uses
            </li>
          </ul>
        </div>
        {/* Ending of the fifth links */}
      </div>
      <div
        style={{ fontFamily: "Edu NSW ACT Foundation" }}
        className="font-bold justify-around text-center text-[18px] flex-col md:flex items-center"
      >
        <div>
          <h1>The Online Recruiter</h1>
          <p className="flex items-center justify-center mt-2">
            VisuMeet <span>{logo}</span>Copyright 2023 - All Rights Reserved.
          </p>
        </div>

        <div className="flex items-center justify-center mt-8 pb-16 text-3xl space-x-8 ">
          <BsFacebook className="cursor-pointer" />
          <BsInstagram className="cursor-pointer" />
          <BsLinkedin className="cursor-pointer" />
          <BsPinterest className="cursor-pointer" />
          <BsTwitter className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
