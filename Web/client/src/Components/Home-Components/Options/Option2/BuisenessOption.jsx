import React from "react";

const BusinessOption = () => {
  return (
    <div className="w-full md:w-1/2 px-8 my-8 md:my-0">
      <div className="bg-black rounded-2xl md:w-fit pt-8 pb-10 md:pt-16 md:pb-10">
        <div className="mx-8">
          <h1 className="text-white font-bold text-xl md:text-3xl">
            Business Use
          </h1>
          <h1 className="text-white text-sm md:text-xl mt-3">
            Transform your hiring process with our website's streamlined
            interview platform, with Sentiment Analysis and Emotion-Detection.{" "}
          </h1>
          <div className="">
            <div className="md:text-lg text-sm text-white border-white border-2 w-fit p-2 mt-8 cursor-pointer hover:bg-white hover:text-black font-bold duration-500">
              <a href="/login">Get Started</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessOption;
