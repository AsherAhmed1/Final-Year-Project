import React from "react";
import Logo from "../../../img/UCPLogo.png";
import Image from "../../../img/sir.jpeg";
import { IoArrowRedo } from "react-icons/io5";

const Story = () => {
  return (
    <div>
      <div className="mt-36 ml-16 mr-16">
        <div className="bg-gray-300 p-10 rounded-t-lg">
          <div className="mt-5 mb-5 flex flex-row justify-between">
            {/* logo and text */}
            <div>
              <div>
                <img src={Logo} alt="UCP Logo" className="w-32 ml-7" />
              </div>

              <div>
                <h1 className="text-9xl font-bold text-black mt-20 ml-7">3x</h1>
                <p className="text-2xl ml-7 w-40 font-semibold">
                  faster time to evaluate
                </p>
              </div>
            </div>
            {/* Logo and text */}

            {/* Review */}

            <div>
              <div className="w-96">
                <h1
                  style={{ fontFamily: "Edu NSW ACT Foundation" }}
                  className="text-4xl"
                >
                  "Our recruitment team and candidates are much more integrated
                  during the interview process. Our recruiters have more
                  autonomy - allowing us to recruit candidates much faster than
                  usual."
                </h1>
              </div>

              <div className="flex flex-row items-center mt-3">
                <div>
                  <img
                    src={Image}
                    alt="image of the reviewer"
                    className="w-20 rounded-full mt-6"
                  />
                </div>
                <div className="ml-4">
                  <h1
                    style={{ fontFamily: "Edu NSW ACT Foundation" }}
                    className="mt-6 text-xl font-bold"
                  >
                    Usman Ahmed Raza
                  </h1>
                  <h1 className="text-base">Professor at the UCP</h1>
                </div>
              </div>
            </div>

            {/* Review */}
          </div>
        </div>

        {/* read story link */}
        <div>
          <div className="bg-gray-400 text-center p-4 flex flex-row justify-center items-center rounded-b-lg">
            <h1 className="text-xl font-semibold text-white">
              Read Customer Story
            </h1>
            <IoArrowRedo className="text-white ml-2" />
          </div>
        </div>
      </div>

      <div>
        <hr className="border border-gray-300 mt-32 " />
      </div>
    </div>
  );
};

export default Story;
