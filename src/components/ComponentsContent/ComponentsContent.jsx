/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { SiInfo2 } from "../../icons/SiInfo2";
import { ComponentsTextArea } from "../ComponentsTextArea";
import { DarkModeNoVariantWrapper } from "../DarkModeNoVariantWrapper";
import "./style.css";

export const ComponentsContent = ({
  darkMode,
  TOOL,
  enabled,
  image,
  alignment,
  type,
  className,
  COMPONENTSTextAreaMinHeight = "/img/min-height-constraint-1.png",
  COMPONENTSTextAreaMinHeightClassName,
  hasComponentsContent = true,
  darkModeNoVariantWrapper,
  darkModeNoVariantWrapper1,
}) => {
  return (
    <div
      className={`COMPONENTS-content ${TOOL} image-${image} type-${type} dark-mode-12-${darkMode} ${alignment} ${className}`}
    >
      {(TOOL === "palette-generator" ||
        (TOOL === "colour-picker" && image === "off") ||
        (TOOL === "colour-picker" && darkMode === "on" && image === "on")) && (
        <>
          <div className="COMPONENTS-text-3">
            <div className="text-10">
              {TOOL === "colour-picker" && <>Colour Picker</>}

              {TOOL === "palette-generator" && <>Palette Generator</>}
            </div>
            <div className="text-11">
              {TOOL === "colour-picker" && <p className="text-wrapper-6">Extract wonderful palettes from you image.</p>}

              {TOOL === "palette-generator" && <>Generate wonderful palettes.</>}
            </div>
          </div>
          <div className={`frame TOOL-${TOOL} type-0-${type} enabled-${enabled}`}>
            {TOOL === "colour-picker" && (
              <>
                <div className="eyebrow-wrapper">
                  <div className="eyebrow-4">UPLOAD IMAGE</div>
                </div>
                <div
                  className={`COMPONENTS-upload image-0-${image} enabled-0-${enabled} dark-mode-16-${darkMode} type-1-${type}`}
                >
                  {image === "off" && (
                    <>
                      <img className="v-2" alt="V" src={darkMode === "on" ? "/img/v-10.svg" : "/img/v-13.svg"} />
                      <div className="text-wrapper-2">
                        <p className="p">Click or drag file to this area to upload</p>
                        <div className="frame-2">
                          <SiInfo2
                            className="si-info"
                            color={darkMode === "on" ? "white" : "#121212"}
                            opacity={darkMode === "on" ? "0.75" : "0.5"}
                          />
                          <p className="text-wrapper-3">Max file size: XX MB</p>
                        </div>
                      </div>
                    </>
                  )}

                  {type === "example" && (
                    <div className="image-wrapper">
                      <img className="image" alt="Image" src="/img/image-5.png" />
                    </div>
                  )}
                </div>
                <div className="frame-3">
                  <div className="frame-4">
                    <div className={`text-wrapper-4 dark-mode-19-${darkMode} enabled-1-${enabled}`}>
                      Number of colours:
                    </div>
                  </div>
                  <div className={`COMPONENTS-stepper dark-mode-20-${darkMode} enabled-2-${enabled}`}>
                    <img
                      className="content"
                      alt="Content"
                      src={
                        darkMode === "off" && enabled
                          ? "/img/content-5.png"
                          : type === "default" && darkMode === "on"
                          ? "/img/content-2.png"
                          : darkMode === "off" && !enabled
                          ? "/img/content-3.png"
                          : type === "example"
                          ? "/img/content.png"
                          : undefined
                      }
                    />
                    <div className="stepper-true">
                      <div className="overlap-group-4">
                        <div className="separator" />
                        <div className="filler" />
                        <div className="top" />
                        <div className="bottom" />
                        <img
                          className="v-3"
                          alt="V"
                          src={
                            darkMode === "off" && enabled
                              ? "/img/v-18.svg"
                              : type === "default" && darkMode === "on"
                              ? "/img/v-9.svg"
                              : darkMode === "off" && !enabled
                              ? "/img/v-12.svg"
                              : type === "example"
                              ? "/img/v-5.svg"
                              : undefined
                          }
                        />
                        <img
                          className="v-4"
                          alt="V"
                          src={
                            darkMode === "off" && enabled
                              ? "/img/v-17.svg"
                              : type === "default" && darkMode === "on"
                              ? "/img/v-8.svg"
                              : darkMode === "off" && !enabled
                              ? "/img/v-11.svg"
                              : type === "example"
                              ? "/img/v-4.svg"
                              : undefined
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {TOOL === "palette-generator" && (
              <div className={`COMPONENTS-button dark-mode-24-${darkMode} enabled-5-${enabled}`}>
                {enabled && (
                  <>
                    <div className="text-12">Generate</div>
                    <img
                      className="icon-arrow"
                      alt="Icon arrow"
                      src={darkMode === "on" ? "/img/icon-arrow.svg" : "/img/icon-arrow-1.svg"}
                    />
                  </>
                )}

                {!enabled && darkMode === "on" && (
                  <>
                    <div className="rectangle" />
                    <div className="overlap">
                      <div className="rectangle-2" />
                      <div className="rectangle-3" />
                      <div className="rectangle-4" />
                    </div>
                    <div className="rectangle-5" />
                    <div className="overlap-group-5">
                      <div className="rectangle-6" />
                      <div className="rectangle-7" />
                      <div className="rectangle-8" />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {(TOOL === "moodboard-generator" || (TOOL === "colour-picker" && darkMode === "off" && image === "on")) && (
        <>
          <>
            {hasComponentsContent && (
              <>
                <>
                  {((alignment === "centered" && type === "example") ||
                    type === "example-with-text-1" ||
                    type === "example-with-text-2" ||
                    type === "example-with-text-3" ||
                    type === "example-with-text-4" ||
                    type === "example-with-text-5" ||
                    type === "example-with-text-6") && (
                    <div className="div-2">
                      {type === "example" && (
                        <>
                          <div className="COMPONENTS-text-3">
                            <div className="text-13">Colour Picker</div>
                            <p className="text-14">Extract wonderful palettes from you image.</p>
                          </div>
                          <div className="frame-5">
                            <div className="eyebrow-wrapper">
                              <div className="eyebrow-5">UPLOAD IMAGE</div>
                            </div>
                            <div className="COMPONENTS-upload-wrapper">
                              <div className="image-wrapper">
                                <img className="image" alt="Image" src="/img/image-5.png" />
                              </div>
                            </div>
                            <div className="frame-3">
                              <div className="frame-4">
                                <div className="text-wrapper-5">Number of colours:</div>
                              </div>
                              <div className="COMPONENTS-stepper-2">
                                <img className="content" alt="Content" src="/img/content-1.png" />
                                <div className="stepper-true-2">
                                  <div className="overlap-group-4">
                                    <div className="separator" />
                                    <div className="filler-2" />
                                    <div className="top" />
                                    <div className="bottom-2" />
                                    <img className="v-3" alt="V" src="/img/v-7.svg" />
                                    <img className="v-4" alt="V" src="/img/v-6.svg" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {image === "off" && (
                        <>
                          <ComponentsTextArea
                            darkMode={darkMode === "on" ? "on" : "off"}
                            minHeightClassNameOverride={`${
                              type === "example-with-text-2" && darkMode === "on" && "class-3"
                            }`}
                            stateProp={
                              type === "example-with-text-2"
                                ? "with-cursor"
                                : darkMode === "off" && type === "example-with-text-3"
                                ? "text-filled-w-cursor"
                                : type === "example-with-text-3" && darkMode === "on"
                                ? "text-filled-w-o-cursor"
                                : type === "example-with-text-4" ||
                                  (darkMode === "off" && type === "example-with-text-5") ||
                                  (darkMode === "off" && type === "example-with-text-6")
                                ? "finished"
                                : "default"
                            }
                            type="title"
                          />
                          <ComponentsTextArea
                            className="COMPONENTS-text-area-instance"
                            darkMode={darkMode === "on" ? "on" : "off"}
                            imgClassName={`${type === "example-with-text-4" && darkMode === "off" && "class-4"} ${
                              type === "example-with-text-4" && darkMode === "on" && "class-5"
                            }`}
                            minHeight={COMPONENTSTextAreaMinHeight}
                            minHeightClassName={COMPONENTSTextAreaMinHeightClassName}
                            stateProp={
                              type === "example-with-text-4"
                                ? "empty"
                                : type === "example-with-text-5"
                                ? "text-filled"
                                : type === "example-with-text-6"
                                ? "finished"
                                : "default"
                            }
                            type="text"
                          />
                        </>
                      )}
                    </div>
                  )}

                  {(type === "default" || (alignment === "top-left" && type === "example")) && (
                    <DarkModeNoVariantWrapper
                      COMPONENTSTextAreaDarkMode={darkModeNoVariantWrapper}
                      COMPONENTSTextAreaDarkMode1={darkModeNoVariantWrapper1}
                      alignment="default"
                      className={`${alignment === "top-left" && "class-6"}`}
                      darkMode={false}
                      typeOfContext="default"
                      variant="directional-m"
                    />
                  )}
                </>
              </>
            )}
          </>
        </>
      )}
    </div>
  );
};

ComponentsContent.propTypes = {
  darkMode: PropTypes.oneOf(["off", "on"]),
  TOOL: PropTypes.oneOf(["moodboard-generator", "palette-generator", "colour-picker"]),
  enabled: PropTypes.bool,
  image: PropTypes.oneOf(["off", "on"]),
  alignment: PropTypes.oneOf(["top-left", "centered"]),
  type: PropTypes.oneOf([
    "example-with-text-6",
    "example-with-text-1",
    "example-with-text-5",
    "example-with-text-3",
    "default",
    "example",
    "example-with-text-2",
    "example-with-text-4",
  ]),
  COMPONENTSTextAreaMinHeight: PropTypes.string,
  hasComponentsContent: PropTypes.bool,
  darkModeNoVariantWrapper: PropTypes.string,
  darkModeNoVariantWrapper1: PropTypes.string,
};
