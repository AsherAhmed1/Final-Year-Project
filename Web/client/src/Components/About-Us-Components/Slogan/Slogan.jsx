import React from "react";

const Slogan = () => {
  return (
    <div>
      <div className="bg-black md:mt-44 mt-20 pb-24 mb-44">
        <h1
          style={{ fontFamily: "Dancing Script" }}
          className="text-white text-center text-2xl md:text-5xl md:mx-0 mx-4 pt-16"
        >
          Join over 0 people who use{" "}
          <span className="underline">Aportfolio</span> in various ways
        </h1>
        <div>
          <h1
            style={{ fontFamily: "Dancing Script" }}
            className="text-white bg-blue-700 hover:bg-blue-900 duration-500 cursor-pointer text-sm md:text-xl text-center w-fit p-2 rounded-lg m-auto mt-10 "
          >
            Create Your Portfolio
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Slogan;
