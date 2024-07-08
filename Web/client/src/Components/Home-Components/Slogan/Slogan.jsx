import React from "react";

const Slogan = () => {
  return (
    <div>
      <div className="bg-black mt-44 pb-24">
        <h1
          style={{ fontFamily: "Dancing Script" }}
          className="text-white text-center text-2xl md:text-5xl pt-16"
        >
          Engage in a unique way
        </h1>
        <p
          style={{ fontFamily: "Edu NSW ACT Foundation" }}
          className="text-xs md:text-2xl text-white text-center pt-5 "
        >
          Try our application for free for 14 days. No credit card required.
        </p>
        <div>
          <h1
            style={{ fontFamily: "Dancing Script" }}
            className="text-white bg-blue-700 hover:bg-blue-900 duration-500 cursor-pointer text-sm md:text-xl text-center w-fit p-2 rounded-lg m-auto mt-6 "
          >
            <a href="/login">Get Started</a>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Slogan;
