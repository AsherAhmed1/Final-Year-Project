import React from "react";

const Heading = () => {
  return (
    <div className="mt-44 md:mb-0 mb-44">
      <div className="px-4">
        <div style={{ fontFamily: "Dancing Script" }}>
          <h1 className="text-4xl font-bold md:text-6xl text-center md:w-full">
            Welcome to VisuMeet <br></br> Where Interviews Meet {" "}
            <span className="underline">Innovation!</span>
          </h1>
        </div>

        <div style={{ fontFamily: "Edu NSW ACT Foundation" }}>
          <p className="text-center text-xl md:text-3xl md:mt-8 mt-4 ml-5 mr-5 mx-auto">
            VisuMeet is a visionary company dedicated to revolutionizing the
            interview and video conferencing experience. With a focus on
            leveraging advanced machine learning techniques, we have developed a
            cutting-edge web application that provides real-time sentiment
            analysis, confidence level checks, and detailed interview
            transcripts. Our mission is to empower companies with deeper
            insights into candidate emotions, enthusiasm, and expertise,
            enabling them to make informed hiring decisions. By going beyond
            traditional video conferencing, we offer a comprehensive solution
            that enhances the interview process, streamlines decision-making,
            and builds stronger teams. Join us at VisuMeet and discover the
            future of interviews.
          </p>
        </div>


      </div>
    </div>
  );
};

export default Heading;
