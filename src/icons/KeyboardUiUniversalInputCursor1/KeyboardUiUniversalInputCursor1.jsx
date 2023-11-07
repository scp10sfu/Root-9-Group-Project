/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const KeyboardUiUniversalInputCursor1 = ({ color = "#121212", className }) => {
  return (
    <svg
      className={`keyboard-ui-universal-input-cursor-1 ${className}`}
      fill="none"
      height="20"
      viewBox="0 0 2 20"
      width="2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        clipRule="evenodd"
        d="M0 1C0 0.447715 0.447715 0 1 0C1.55228 0 2 0.447715 2 1V19C2 19.5523 1.55228 20 1 20C0.447715 20 0 19.5523 0 19V1Z"
        fill={color}
        fillRule="evenodd"
      />
    </svg>
  );
};

KeyboardUiUniversalInputCursor1.propTypes = {
  color: PropTypes.string,
};
