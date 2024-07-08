import React from "react";
import image from "../../../img/image1.jpg";

const Thoughts = () => {
  return (
    <div className="md:mt-44 mt-32 bg-blue-700 pt-32 pb-32 text-white">
      <div className="flex md:flex-row flex-col items-center justify-around mx-4 md:mx-32">
        <div className="md:w-[20rem]">
          <img src={image} alt="founder" className="rounded-full" />
        </div>
        <div className="md:w-1/2">
          <h1
            style={{ fontFamily: "Dancing Script" }}
            className="text-center md:text-left text-5xl md:mt-0 mt-8"
          >
            InfoBros
          </h1>

          <h1
            style={{ fontFamily: "Edu NSW ACT Foundation" }}
            className="text-center md:text-left mt-5 text-xl"
          >
            Your portfolio is the reflection of your hard work and creativity,
            and it deserves to be showcased in a way that truly highlights your
            unique talents. With Aportfolio, you can create a stunning and
            personalized portfolio that not only impresses potential clients and
            employers but also elevates your professional brand to the next
            level.
          </h1>
          <h1 style={{ fontFamily: "Dancing Script" }} className="text-center md:text-left text-lg mt-4">
            Syed Asher Ahmed Kazmi
          </h1>
          <h1 style={{ fontFamily: "Dancing Script" }} className="text-center md:text-left text-lg">Founder of InfoBros</h1>
        </div>
      </div>
    </div>
  );
};

export default Thoughts;
