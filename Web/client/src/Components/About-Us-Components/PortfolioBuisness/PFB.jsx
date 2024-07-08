import * as React from "react";
import image from "../../../img/template1/pic3.png";

const PFB = () => {
  return (
    <div className="bg-white">
      <div>
        <div>
          <h1
            style={{ fontFamily: "Dancing Script" }}
            className="pt-32 text-center md:mt-36 mt-24 md:text-5xl text-3xl underline"
          >
            Interactive Buisness Portfolios For Marketing
          </h1>
          <p
            style={{ fontFamily: "Edu NSW ACT Foundation" }}
            className="text-xl md:text-3xl text-center mx-4 md:mx-10 mt-4 md:mt-8"
          >
            Are you tired of presenting your business portfolio in a static and
            boring format? Upgrade your game and impress your audience with
            interactive business portfolios. With features like clickable links,
            videos, GIFs, and product tags, you can keep your viewers hooked for
            longer and deliver a more engaging experience. Say goodbye to
            traditional PDFs and hello to dynamic Portfolios that showcase your
            brand in a whole new way. Give your marketing a boost and stand out
            from the competition with interactive business portfolios.
          </p>
        </div>

        <div className="flex md:flex-row flex-col md:justify-around mt-16 md:mx-10 items-center ">
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

export default PFB;
