import React from "react";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Pricings from "../Components/Pricing-Component/Pricing";

function Pricing() {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/pricing":
        document.title = "VisuMeet - Pricing";
        break;
      default:
        document.title = "VisuMeet";
        break;
    }
  }, [location.pathname]);

  return (
    <div>
      {/* Pricing Page */}
      <div>
        <Pricings />
      </div>
      {/* Pricing Page */}
    </div>
  );
}

export default Pricing;
