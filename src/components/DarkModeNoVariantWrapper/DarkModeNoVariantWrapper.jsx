/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { ComponentsTextArea } from "../ComponentsTextArea";
import { Type } from "../Type";
import { TypeBody } from "../TypeBody";
import "./style.css";

export const DarkModeNoVariantWrapper = ({
  darkMode,
  variant,
  alignment,
  typeOfContext,
  COMPONENTSTextAreaDarkMode = "off",
  COMPONENTSTextAreaDarkMode1 = "off",
  className,
}) => {
  return (
    <div
      className={`dark-mode-no-variant-wrapper type-of-context-${typeOfContext} ${variant} alignment-${alignment} dark-mode-${darkMode} ${className}`}
    >
      {["ballroom-of-dreams", "no", "nostalgic-memories"].includes(typeOfContext) && (
        <div className="text-block">
          {variant === "headline" && (
            <>
              <div className="eyebrow-7">TITLE</div>
              <div className="text-16">Board Title</div>
            </>
          )}

          {variant === "directional-m" && (
            <>
              <Type
                className="type-instance"
                eyebrowClassName={`${darkMode ? "type-h-instance" : "class-7"}`}
                text={
                  typeOfContext === "ballroom-of-dreams"
                    ? "Ballroom of Dreams"
                    : typeOfContext === "nostalgic-memories"
                    ? "Nostalgic Memories"
                    : undefined
                }
                textClassName={`${darkMode && "COMPONENTS-text-4"}`}
              />
              <TypeBody
                className={`${typeOfContext === "ballroom-of-dreams" && "COMPONENTS-text-6"} ${
                  typeOfContext === "nostalgic-memories" && "class-8"
                }`}
                eyebrowClassName={`${darkMode && "COMPONENTS-text-5"}`}
                text="CONCEPT"
                text1={
                  typeOfContext === "ballroom-of-dreams"
                    ? "The moodboard encapsulates a captivating and enchanting atmosphere with its carefully curated elements. Rich, warm colors dominate the palette, creating a cozy and comforting ambiance. Ball images evoke a sense of playfulness and movement, while the moon and stars add a touch of celestial magic. Oil paints introduce a tactile and artistic dimension, infusing the moodboard with depth and texture. Together, these components form a harmonious visual narrative that invites viewers to embark on a dreamy journey through a world awash in the embrace of warm, earthy hues."
                    : typeOfContext === "nostalgic-memories"
                    ? "This moodboard captures the serene beauty of rural landscapes and the innocent charm of childhood. A vast field of rye stretches out, painting a picture of open space and freedom. Sheep dot the landscape, evoking a sense of gentle, pastoral tranquility. The oil paintings in soft, pastel tones offer a glimpse into the world through a child&#39;s eyes, imbuing the moodboard with a whimsical and nostalgic quality. Sunflowers bring a touch of vibrant warmth, symbolizing happiness. Together, these elements weave a narrative of idyllic countryside simplicity, blending nostalgia with the exuberance of youth in a harmonious and visually stunning composition."
                    : undefined
                }
                textClassName={`${darkMode && "COMPONENTS-text-4"}`}
              />
            </>
          )}
        </div>
      )}

      {variant === "directional-l" && (
        <>
          <div className="COMPONENTS-text-7">
            <div className="eyebrow-8">TITLE</div>
            <div className="text-17">Board Title</div>
          </div>
          <div className="background-and">
            <div className="COMPONENTS-text-8">
              <div className="eyebrow-9">CONCEPT</div>
              <p className="text-18">
                Use this for a description of your wonderful board. Inspiration can often be elusive, yet it&#39;s the
                driving force behind our creative endeavours. Our moodboard concept is designed to capture that
                intangible essence and turn it into a tangible source of inspiration. With a harmonious blend of
                colours, images, and layouts, our moodboard empowers you to create, explore, and uncover the hidden
                treasures of your imagination. It&#39;s a canvas for your ideas, a playground for your creativity, and a
                tool for finding your unique spark of inspiration in the world of design.
              </p>
            </div>
          </div>
        </>
      )}

      {variant === "directional-m" && !darkMode && typeOfContext === "default" && (
        <>
          <ComponentsTextArea darkMode={COMPONENTSTextAreaDarkMode} stateProp="finished" type="title" />
          <ComponentsTextArea
            className="COMPONENTS-text-area-2"
            darkMode={COMPONENTSTextAreaDarkMode1}
            stateProp="finished"
            type="text"
            typeBodyText={
              alignment === "top-left"
                ? "Use this for a description of your wonderful board. Inspiration can often be elusive, yet it&#39;s the driving force behind our creative endeavours. Our moodboard concept is designed to capture that intangible essence and turn it into a tangible source of inspiration. With a harmonious blend of colours, images, and layouts, our moodboard empowers you to create, explore, and uncover the hidden treasures of your imagination. It&#39;s a canvas for your ideas, a playground for your creativity, and a tool for finding your unique spark of inspiration in the world of design."
                : undefined
            }
          />
        </>
      )}

      {variant === "directional-m" && typeOfContext === "default" && darkMode && (
        <>
          <Type
            className={`${alignment === "top-left" ? "COMPONENTS-text-6" : "type-instance"}`}
            eyebrowClassName="type-h-instance"
            text="Board Title"
            textClassName="COMPONENTS-text-4"
          />
          <TypeBody
            className="COMPONENTS-text-6"
            eyebrowClassName="COMPONENTS-text-5"
            text="CONCEPT"
            text1="Use this for a description of your wonderful board. Inspiration can often be elusive, yet it&#39;s the driving force behind our creative endeavours. Our moodboard concept is designed to capture that intangible essence and turn it into a tangible source of inspiration. With a harmonious blend of colours, images, and layouts, our moodboard empowers you to create, explore, and uncover the hidden treasures of your imagination. It&#39;s a canvas for your ideas, a playground for your creativity, and a tool for finding your unique spark of inspiration in the world of design."
            textClassName="COMPONENTS-text-4"
          />
        </>
      )}
    </div>
  );
};

DarkModeNoVariantWrapper.propTypes = {
  darkMode: PropTypes.bool,
  variant: PropTypes.oneOf(["headline", "directional-l", "directional-m"]),
  alignment: PropTypes.oneOf(["top-left", "default"]),
  typeOfContext: PropTypes.oneOf(["nostalgic-memories", "ballroom-of-dreams", "no", "default"]),
  COMPONENTSTextAreaDarkMode: PropTypes.string,
  COMPONENTSTextAreaDarkMode1: PropTypes.string,
};
