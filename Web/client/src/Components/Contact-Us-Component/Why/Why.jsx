import React from "react";
import {
  BsGlobeCentralSouthAsia,
  BsPlayCircle,
  BsCodeSlash,
  BsTools,
} from "react-icons/bs";
import { MdFormatAlignLeft } from "react-icons/md";
import { SiGoogleanalytics } from "react-icons/si";
import { HiTemplate, HiOutlineDeviceMobile } from "react-icons/hi";

const Why = () => {
  return (
    <div>
      <div>
        <h1
          style={{ fontFamily: "Dancing Script" }}
          className="text-8xl mt-24 mb-24 text-center"
        >
          Why Choose VisuMeet?
        </h1>
      </div>
      <div className="bg-blue-600 pt-20 pb-20">
        <div>
          <h1
            className="text-3xl font-bold md:text-4xl text-white mx-8 md:mx-20"
            style={{ fontFamily: "Dancing Script" }}
          >
            High Performing Portfolio Creation Starts Here
          </h1>
        </div>

        {/* Starting of the first  */}

        <div className="flex flex-col md:flex-row md:ml-20 mx-8 items-center">
          <div className="flex items-center">
            <BsGlobeCentralSouthAsia className="text-white text-5xl" />
            <div className="ml-4">
              <h1
                className="text-white mt-5 text-3xl"
                style={{ fontFamily: "Dancing Script" }}
              >
                Custom Domain
              </h1>
              <p
                className="text-white text-xl mt-2"
                style={{
                  fontFamily: "Edu NSW ACT Foundation",
                  maxWidth: "20rem",
                }}
              >
                Remove the Aportfolio branding Completely, including the URLs of
                your publications
              </p>
            </div>
          </div>
          <div className="flex items-center mt-8 md:mt-0 md:ml-11">
            <BsPlayCircle className="text-white text-5xl" />
            <div className="ml-4">
              <h1
                className="text-white mt-5 text-3xl"
                style={{ fontFamily: "Dancing Script" }}
              >
                Add Video & More
              </h1>
              <p
                className="text-white text-xl mt-2"
                style={{
                  fontFamily: "Edu NSW ACT Foundation",
                  maxWidth: "20rem",
                }}
              >
                Add Youtube / Instagram Videos, or upload your videos from your
                computer
              </p>
            </div>
          </div>
          <div className="flex items-center mt-8 md:mt-0 md:ml-11">
            <MdFormatAlignLeft className="text-white text-5xl" />
            <div className="ml-4">
              <h1
                className="text-white mt-5 text-3xl"
                style={{ fontFamily: "Dancing Script" }}
              >
                Lead Form
              </h1>
              <p
                className="text-white text-xl mt-2"
                style={{
                  fontFamily: "Edu NSW ACT Foundation",
                  maxWidth: "20rem",
                }}
              >
                Use out lead form on marketing e-books to collect information
                from qualified leads
              </p>
            </div>
          </div>
          <div className="flex items-center mt-8 md:mt-0 md:ml-11">
            <SiGoogleanalytics className="text-white text-5xl" />
            <div className="ml-4">
              <h1
                className="text-white mt-5 text-3xl"
                style={{ fontFamily: "Dancing Script" }}
              >
                Google Analytics
              </h1>
              <p
                className="text-white text-xl mt-2"
                style={{
                  fontFamily: "Edu NSW ACT Foundation",
                  maxWidth: "20rem",
                }}
              >
                Add google analytics tracking. Works with both universal
                analytics and GA4
              </p>
            </div>
          </div>
        </div>

        {/* Ending of the first work */}

        {/* starting of the second work */}

        <div className="flex flex-col md:flex-row md:ml-20 mx-8 items-center">
          <div className="flex items-center">
            <BsCodeSlash className="text-white text-5xl" />
            <div className="ml-4">
              <h1
                className="text-white mt-5 text-3xl"
                style={{ fontFamily: "Dancing Script" }}
              >
                Embeding
              </h1>
              <p
                className="text-white text-xl mt-2"
                style={{
                  fontFamily: "Edu NSW ACT Foundation",
                  maxWidth: "20rem",
                }}
              >
                Add the interactive digital flip book on your site easily. just
                copy the embed code
              </p>
            </div>
          </div>
          <div className="flex items-center mt-8 md:mt-0 md:ml-11">
            <BsTools className="text-white text-5xl" />
            <div className="ml-4">
              <h1
                className="text-white mt-5 text-3xl"
                style={{ fontFamily: "Dancing Script" }}
              >
                Design Tools
              </h1>
              <p
                className="text-white text-xl mt-2"
                style={{
                  fontFamily: "Edu NSW ACT Foundation",
                  maxWidth: "20rem",
                }}
              >
                Create design from scratch, or use it to add more content in
                your uploaded PDF
              </p>
            </div>
          </div>
          <div className="flex items-center mt-8 md:mt-0 md:ml-11">
            <HiTemplate className="text-white text-5xl" />
            <div className="ml-4">
              <h1
                className="text-white mt-5 text-3xl"
                style={{ fontFamily: "Dancing Script" }}
              >
                Pre-Built Templates
              </h1>
              <p
                className="text-white text-xl mt-2"
                style={{
                  fontFamily: "Edu NSW ACT Foundation",
                  maxWidth: "20rem",
                }}
              >
                Browse our gallery of thousands of templates, or create and save
                your own templates
              </p>
            </div>
          </div>
          <div className="flex items-center mt-8 md:mt-0 md:ml-11">
            <HiOutlineDeviceMobile className="text-white text-5xl" />
            <div className="ml-4">
              <h1
                className="text-white mt-5 text-3xl"
                style={{ fontFamily: "Dancing Script" }}
              >
                Mobile Friendly
              </h1>
              <p
                className="text-white text-xl mt-2"
                style={{
                  fontFamily: "Edu NSW ACT Foundation",
                  maxWidth: "20rem",
                }}
              >
                Get a fully responsive, mobile friendly portfolio that works
                flawlessly in any modern browser
              </p>
            </div>
          </div>
        </div>

        {/* Ending of the second work */}
      </div>
    </div>
  );
};

export default Why;
