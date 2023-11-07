/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const Type = ({ className, eyebrowClassName, text = "Sketches &amp; Concepts", textClassName }) => {
  return (
    <div className={`type ${className}`}>
      <div className={`eyebrow ${eyebrowClassName}`}>TITLE</div>
      <div className={`text-wrapper ${textClassName}`}>{text}</div>
    </div>
  );
};

Type.propTypes = {
  text: PropTypes.string,
};
