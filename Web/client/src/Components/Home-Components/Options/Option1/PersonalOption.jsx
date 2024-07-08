import React from "react";

const PersonalOption = () => {
  return (
    <div className="w-full md:w-1/2 px-8 my-8 md:my-0">
      <div className="bg-blue-500 rounded-2xl md:w-fit pt-8 pb-10 md:pt-16 md:pb-10">
        <div className="mx-8">
          <h1 className="text-white font-bold text-xl md:text-3xl">
            Personal Use
          </h1>
          <h1 className="text-white text-sm md:text-xl mt-3">
            Enhance your interview skills and ace your next interview with these
            sample questions to get more in-depth insights of interviews.
          </h1>
          <div>
            <div className="text-sm md:text-lg text-white border-white border-2 w-fit p-2 mt-4 md:mt-8 cursor-pointer hover:bg-white hover:text-black font-bold duration-500">
              <a href="/login">Get Started</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalOption;
