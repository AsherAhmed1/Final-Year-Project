import React from "react";

const HowTo = () => {
  return (
    <div className="md:flex">
      <div className="mt-8 md:mt-44 md:mb-32 mb-16 w-fit md:ml-60 ml-8">
        <h1
          style={{ fontFamily: "Dancing Script" }}
          className="text-black text-2xl md:text-4xl w-72 md:w-96 underline"
        >
          How to Make a Portfolio Online
        </h1>
        <p
          style={{ fontFamily: "Edu NSW ACT Foundation" }}
          className="md:w-52 w-60 md:text-xl text-base mt-4"
        >
          You will get a professional portfolio. Aportfolio provides the best
          portfolio pdf as a Resume.
        </p>
        <div className="mt-6">
          <h1
            style={{ fontFamily: "Dancing Script" }}
            className="text-base md:text-xl cursor-pointer duration-500 w-fit p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
          >
            Turn PDF into Portfolio
          </h1>
        </div>
      </div>

      <div className="md:mt-8 md:mb-32 mb-16 ml-8 md:ml-24 md:w-96 w-60">
        <div>
          <h1
            style={{ fontFamily: "Dancing Script" }}
            className="text-xl md:text-3xl font-bold"
          >
            1. Create Portfolio Content
          </h1>
          <p
            style={{ fontFamily: "Edu NSW ACT Foundation" }}
            className="text-base md:text-xl mt-4"
          >
            Our tool is very easy to use. Choose the template design from the
            template page and add detail or you can add detail by just uploading
            pdf. Make your portfolio in just seconds.
          </p>
        </div>
        <div>
          <h1
            style={{ fontFamily: "Dancing Script" }}
            className="text-xl md:text-3xl font-bold mt-4"
          >
            2. Customize
          </h1>
          <p
            style={{ fontFamily: "Edu NSW ACT Foundation" }}
            className="text-base md:text-xl mt-4"
          >
            Add videos, links or adjust the settings of the Portfolio, including
            colors and other branding elements.
          </p>
        </div>
        <div>
          <h1
            style={{ fontFamily: "Dancing Script" }}
            className="text-xl md:text-3xl font-bold mt-4"
          >
            3. Publish and Share
          </h1>
          <p
            style={{ fontFamily: "Edu NSW ACT Foundation" }}
            className="text-base md:text-xl mt-4"
          >
            Choose the desired visibility option, then publish and share the
            Portfolio on social media, email, your website or anywhere else you
            wish! You can also download the Resume design as PDF.
          </p>
        </div>
        <div>
          <h1
            style={{ fontFamily: "Dancing Script" }}
            className="text-xl md:text-3xl font-bold mt-4"
          >
            4. Analyze
          </h1>
          <p
            style={{ fontFamily: "Edu NSW ACT Foundation" }}
            className="text-base md:text-xl mt-4"
          >
            You’ll know how popular your publications become. We track every
            click, share and download in real time, as well as places and
            sources where your portfolio was accessed. View a detailed report
            for every page of your portfolio, or view all your Aportfolio
            statistics directly in Analytics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowTo;
