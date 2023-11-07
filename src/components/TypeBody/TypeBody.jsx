/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const TypeBody = ({
  className,
  text = "BACKGROUND",
  eyebrowClassName,
  textClassName,
  text1 = "Use this for a description of your wonderful board. Inspiration can often be elusive, yet it&#39;s the driving force behind our creative endeavours. Our moodboard concept is designed to capture that intangible essence and turn it into a tangible source of inspiration. With a harmonious blend of colours, images, and layouts, our moodboard empowers you to create, explore, and uncover the hidden treasures of your imagination. It&#39;s a canvas for your ideas, a playground for your creativity, and a tool for finding your unique spark of inspiration in the world of design.",
}) => {
  return (
    <div className={`type-body ${className}`}>
      <div className={`eyebrow-6 ${eyebrowClassName}`}>{text}</div>
      <p className={`text-15 ${textClassName}`}>{text1}</p>
    </div>
  );
};

TypeBody.propTypes = {
  text: PropTypes.string,
  text1: PropTypes.string,
};
