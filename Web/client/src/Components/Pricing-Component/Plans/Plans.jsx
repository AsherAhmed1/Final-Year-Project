import React from "react";
import Plan1 from "./M-Plans/Plan1";
import Plan2 from "./M-Plans/Plan2";
import Plan3 from "./M-Plans/Plan3";
import Plan4 from "./M-Plans/Plan4";

const Plans = () => {
  return (
    <div>
      <div className="flex flex-wrap justify-around mt-24 mx-8">
        <Plan1 />
        <Plan2 />
        <Plan3 />
        <Plan4 />
      </div>
    </div>
  );
};

export default Plans;
