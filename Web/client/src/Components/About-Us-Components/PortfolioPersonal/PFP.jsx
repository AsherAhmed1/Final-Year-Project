import * as React from "react";
import image from "../../../img/template1/pic3.png";

const PFP = () => {
  return (
    <div className="bg-white mt-8">
      <div>
        <div>
          <h1
            style={{ fontFamily: "Dancing Script" }}
            className="pt-32 text-center md:text-5xl text-3xl underline"
          >
            Interactive Personal Portfolios For Personal Use
          </h1>
          <p
            style={{ fontFamily: "Edu NSW ACT Foundation" }}
            className="text-xl md:text-3xl text-center mx-4 md:mx-10 mt-4 md:mt-8"
          >
            Take your portfolio game to the next level with interactive personal
            portfolios. Featuring clickable links, videos, animations, and tags,
            these portfolios keep your viewers engaged and deliver an immersive
            experience. Say goodbye to traditional paper or PDF portfolios and
            embrace the dynamic and captivating world of interactive personal
            portfolios. Stand out from the crowd and showcase your skills,
            achievements, and personality in a whole new way. Upgrade your
            portfolio game and impress your employers like never before!
          </p>
        </div>

        <div className="flex md:flex-row flex-col justify-around mt-16 items-center md:mx-10 ">
          <img
            src={image}
            alt="template1"
            className="h-96 w-64 hover:scale-105 duration-500 cursor-pointer md:mt-0 mt-12"
          />
          <img
            src={image}
            alt="template1"
            className="h-96 w-64 hover:scale-105 duration-500 cursor-pointer md:mt-0 mt-12"
          />
          <img
            src={image}
            alt="template1"
            className="h-96 w-64 hover:scale-105 duration-500 cursor-pointer md:mt-0 mt-12"
          />
          <img
            src={image}
            alt="template1"
            className="h-96 w-64 hover:scale-105 duration-500 cursor-pointer md:mt-0 mt-12"
          />
        </div>

        <div style={{ fontFamily: "Edu NSW ACT Foundation" }}>
          <h1 className="text-center mt-12 md:mt-16 md:mx-10 mx-8 text-xl md:text-3xl pb-32">
            Crafting a portfolio that truly stands out from the competition
            requires more than just showcasing your work. Elevate your game with
            an interactive business portfolio that engages your audience and
            leaves a lasting impression. With cutting-edge features like
            customizable layouts, immersive multimedia, and seamless navigation,
            you can create a portfolio that not only showcases your skills, but
            also captures the attention of potential clients.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PFP;
