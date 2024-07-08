import React, { useState } from "react";
import classNames from "classnames";

const Heading = () => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div>
      <div>
        <div className="mt-44 text-center">
          <h1
            style={{ fontFamily: "Dancing Script" }}
            className="text-5xl mx-8 md:text-7xl "
          >
            Plans That Match Your Need
          </h1>
          <h1
            style={{ fontFamily: "Edu NSW ACT Foundation" }}
            className="text-4xl mt-4 md:text-5xl"
          >
            Standard Plans
          </h1>
        </div>
        <div style={{ fontFamily: "Dancing Script" }} className="flex items-center justify-center mt-8">
          {/* Starting of Monthly plans */}
          <div>
            <h1
              className={classNames("text-black text-xl md:text-3xl", {
                "text-blue-500": !isSelected,
              })}
            >
              Monthly
            </h1>
          </div>
          {/* Ending of monthly plans */}

          {/* Starting of switch */}
          <div
            onClick={() => setIsSelected(!isSelected)}
            className={classNames(
              "duration-500 flex w-10 h-5 bg-blue-100 mx-4 md:mx-2 rounded-full",
              { "bg-blue-100": isSelected }
            )}
          >
            <span
              className={classNames(
                "h-5 w-5 bg-blue-500 rounded-full duration-500 cursor-pointer",
                { "ml-5": isSelected }
              )}
            />
          </div>
          {/* Ending of switch */}

          {/* Starting of yearly plans */}
          <div>
            <h1
              className={classNames("text-black text-xl md:text-3xl", {
                "text-blue-500": isSelected,
              })}
            >
              Yearly{"("}Save 20%{")"}
            </h1>
          </div>
          {/* Ending of yearly plans */}
        </div>
        <div>
          <h1 className="text-center mt-4">All prices are U.S. dollars</h1>
        </div>
      </div>
    </div>
  );
};

export default Heading;
