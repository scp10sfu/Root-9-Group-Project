/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const SiInfo2 = ({ color = "white", opacity = "0.75", className }) => {
  return (
    <svg
      className={`si-info-2 ${className}`}
      fill="none"
      height="14"
      viewBox="0 0 14 14"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="g" clipPath="url(#clip0_1000_400)">
        <path
          className="path"
          d="M6.99994 4.6934H7.0046M6.99994 9.1622V6.3692M12.5859 6.9278C12.5859 10.0129 10.085 12.5138 6.99994 12.5138C3.91488 12.5138 1.41394 10.0129 1.41394 6.9278C1.41394 3.84273 3.91488 1.3418 6.99994 1.3418C10.085 1.3418 12.5859 3.84273 12.5859 6.9278Z"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeOpacity={opacity}
          strokeWidth="0.8379"
        />
      </g>
      <defs className="defs">
        <clipPath className="clip-path" id="clip0_1000_400">
          <rect
            className="rect"
            fill="white"
            height="13.4064"
            transform="translate(0.296753 0.224609)"
            width="13.4064"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

SiInfo2.propTypes = {
  color: PropTypes.string,
  opacity: PropTypes.string,
};
