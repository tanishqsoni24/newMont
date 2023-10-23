import React from "react";
import Rhombus from "../Images/Rhombus.gif";

function Spinner() {

  return (
    // <div style={containerStyle}>
    <svg xmlns="http://www.w3.org/2000/svg" className="w-16" viewBox="0 0 200 200">
      <circle
        fill="#1927FF"
        stroke="#1927FF"
        stroke-width="15"
        r="15"
        cx="40"
        cy="65"
      >
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="2"
          values="65;135;65;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.4"
        ></animate>
      </circle>
      <circle
        fill="#1927FF"
        stroke="#1927FF"
        stroke-width="15"
        r="15"
        cx="100"
        cy="65"
      >
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="2"
          values="65;135;65;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.2"
        ></animate>
      </circle>
      <circle
        fill="#1927FF"
        stroke="#1927FF"
        stroke-width="15"
        r="15"
        cx="160"
        cy="65"
      >
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="2"
          values="65;135;65;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="0"
        ></animate>
      </circle>
    </svg>
    // <img src={Rhombus} style={{width:'42px'}} alt="loading"  />
    // </div>
  );
}

export default Spinner;
