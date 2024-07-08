import React from "react";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Template from "../Template-Components/Template";

function Templates() {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/templates":
        document.title = "VisuMeet - Templates";
        break;
      default:
        document.title = "VisuMeet";
        break;
    }
  }, [location.pathname]);

  return (
    <div>
      {/* Template Page */}
      <div>
        <Template />
      </div>
      {/* Template Page */}
    </div>
  );
}

export default Templates;
