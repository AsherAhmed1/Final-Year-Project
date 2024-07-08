import React from "react";

const Heading = () => {
  return (
    <div>
      <div className="mt-44 md:mb-0 mb-44">
        <div className="px-4">
          <div style={{ fontFamily: "Dancing Script" }}>
            <h1 className="text-7xl font-bold md:text-6xl ml-5 md:w-full">
              <span className="underline text-7xl">Get In Touch With Us</span>
            </h1>
          </div>

          <div style={{ fontFamily: "Edu NSW ACT Foundation" }}>
            <p className="text-xl md:text-3xl md:mt-8 mt-4 ml-5 mr-5 mx-auto">
              Transform your virtual meetings with VisuMeet's advanced sentiment
              analysis and real-time emotion detection. Experience seamless
              interactions backed by robust security and guaranteed uptime. From
              interviews to classroom sessions, VisuMeet enhances comprehension
              and engagement. Harness the power of technology to make informed
              decisions and foster collaboration. Join the future of online
              communication with VisuMeet today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heading;
