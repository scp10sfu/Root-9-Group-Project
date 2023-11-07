/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import { KeyboardUiUniversalInputCursor1 } from "../../icons/KeyboardUiUniversalInputCursor1";
import { Type } from "../Type";
import { TypeBody } from "../TypeBody";
import "./style.css";

export const ComponentsTextArea = ({
  type,
  stateProp,
  darkMode,
  className,
  minHeightClassName,
  minHeight = "/img/min-height-constraint-1.png",
  minHeightClassNameOverride,
  imgClassName,
  typeBodyText,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    type: type || "title",
    state: stateProp || "default",
    darkMode: darkMode || "off",
  });

  return (
    <div
      className={`COMPONENTS-text-area ${state.state} ${state.type} ${className}`}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
      onClick={() => {
        dispatch("click_982");
      }}
    >
      {(state.state === "default" ||
        (state.state === "empty" && state.type === "text") ||
        state.state === "text-filled-w-cursor" ||
        state.state === "text-filled-w-o-cursor" ||
        state.state === "text-filled" ||
        (state.state === "with-cursor" && state.type === "text")) && (
        <>
          <div
            className={`input-element-text state-${state.state} type-${state.type} ${state.darkMode}`}
            onClick={() => {
              dispatch("click");
            }}
          >
            {(state.state === "text-filled-w-o-cursor" || (state.state === "default" && state.type === "title")) && (
              <div className="input-element">
                <div className="div">
                  {(state.darkMode === "on" || (state.darkMode === "off" && state.state === "default")) && (
                    <>Board Title</>
                  )}

                  {state.darkMode === "off" && state.state === "text-filled-w-o-cursor" && (
                    <div className="text-2">Board Title</div>
                  )}
                </div>
              </div>
            )}

            {state.state === "text-filled-w-cursor" && (
              <>
                <div className="div-wrapper">
                  <div className="text-2">Board Title</div>
                </div>
                <KeyboardUiUniversalInputCursor1 className="keyboard-UI" color="#121212" />
              </>
            )}

            {state.type === "text" && (
              <>
                <div className="typography">
                  <div className="text-3">CONCEPT</div>
                </div>
                <div className="character-count">
                  <div className="typography-2">
                    <div className="text-4">
                      {["default", "empty", "with-cursor"].includes(state.state) && <>0/100</>}

                      {state.state === "text-filled" && <>92/100</>}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div
            className={`COMPONENTS-text state-${state.state} type-0-${state.type} dark-mode-2-${state.darkMode}`}
            onClick={() => {
              dispatch("click_864");
            }}
          >
            <div className="eyebrow-2">
              {state.type === "title" && <>TITLE</>}

              {state.type === "text" && (
                <>
                  <img
                    className={`min-height ${
                      ["default", "text-filled"].includes(state.state)
                        ? minHeightClassName
                        : ["empty", "with-cursor"].includes(state.state)
                        ? imgClassName
                        : undefined
                    }`}
                    alt="Min height"
                    src={
                      ["default", "text-filled"].includes(state.state)
                        ? minHeight
                        : ["empty", "with-cursor"].includes(state.state)
                        ? "/img/min-height-constraint-1.png"
                        : undefined
                    }
                  />
                  <div className="input-element-2">
                    {["default", "text-filled"].includes(state.state) && (
                      <div className="text-5">
                        {state.state === "default" && <>Placeholder</>}

                        {state.state === "text-filled" && (
                          <p className="text-wrapper-6">
                            Use this for a description of your wonderful board. Inspiration can often be elusive, yet
                            it&#39;s the driving force behind our creative endeavours. Our moodboard concept is designed
                            to capture that intangible essence and turn it into a tangible source of inspiration. With a
                            harmonious blend of colours, images, and layouts, our moodboard empowers you to create,
                            explore, and uncover the hidden treasures of your imagination. It&#39;s a canvas for your
                            ideas, a playground for your creativity, and a tool for finding your unique spark of
                            inspiration in the world of design.
                          </p>
                        )}
                      </div>
                    )}

                    {["empty", "with-cursor"].includes(state.state) && (
                      <KeyboardUiUniversalInputCursor1
                        className="keyboard-ui-universal-input-cursor-1"
                        color={state.darkMode === "on" ? "white" : "#121212"}
                      />
                    )}

                    {state.state === "with-cursor" && (
                      <div className="input-element-3">
                        <div className="text-6">Placeholder</div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}

      {(state.state === "cursor" ||
        (state.state === "empty" && state.type === "title") ||
        state.state === "finished-on-hover" ||
        state.state === "with-cursor-w-cursor" ||
        (state.state === "with-cursor" && state.type === "title")) && (
        <div className="overlap-group">
          {state.type === "title" && state.state === "finished-on-hover" && (
            <>
              <div className="COMPONENTS-text-wrapper">
                <Type
                  className="type-h"
                  eyebrowClassName={`${state.darkMode === "on" ? "class" : "class-2"}`}
                  text="Board Title"
                  textClassName={`${state.darkMode === "on" && "type-body-2"}`}
                />
              </div>
              <img className="v" alt="V" src={state.darkMode === "on" ? "/img/v.svg" : "/img/v-1.svg"} />
            </>
          )}

          {(state.type === "title" || (state.darkMode === "off" && state.type === "text")) && (
            <div className="overlap-group-wrapper">
              <div className="overlap-group-2">
                {state.type === "text" && (
                  <>
                    <div className="COMPONENTS-cursor" />
                    <TypeBody className="type-body-instance" text="CONCEPT" />
                  </>
                )}

                {state.state === "finished-on-hover" && <div className="ellipse" />}

                {["cursor", "empty", "with-cursor-w-cursor", "with-cursor"].includes(state.state) && (
                  <div className={`eyebrow-3 dark-mode-8-${state.darkMode}`}>TITLE</div>
                )}

                {state.type === "title" && state.state === "finished-on-hover" && (
                  <div className={`COMPONENTS-cursor-2 dark-mode-9-${state.darkMode}`} />
                )}
              </div>
            </div>
          )}

          {state.darkMode === "off" && state.type === "text" && <img className="img" alt="V" src="/img/v-1.svg" />}

          {state.type === "text" && state.darkMode === "on" && (
            <>
              <TypeBody
                className="type-body-2-instance"
                eyebrowClassName="instance-node"
                text="CONCEPT"
                textClassName="type-body-2"
              />
              <div className="cursor-2">
                <div className="overlap-group-3">
                  <div className="ellipse-2" />
                  <div className="COMPONENTS-cursor-3" />
                </div>
              </div>
              <img className="img" alt="V" src="/img/v.svg" />
            </>
          )}

          {["cursor", "empty", "with-cursor-w-cursor", "with-cursor"].includes(state.state) && (
            <div
              className={`input-element-text-2 state-7-${state.state} dark-mode-10-${state.darkMode}`}
              onClick={() => {
                dispatch("click_728");
              }}
            >
              {["cursor", "with-cursor-w-cursor", "with-cursor"].includes(state.state) && (
                <div className="text-area-content">
                  {state.darkMode === "off" && (
                    <div className="text-cursor">
                      <KeyboardUiUniversalInputCursor1 className="keyboard-UI" color="#121212" />
                      <div className="input-element-4">
                        {state.state === "with-cursor" && <div className="text-7">Board Title</div>}
                      </div>
                    </div>
                  )}

                  {state.darkMode === "on" && (
                    <>
                      <img
                        className={`min-height-2 ${
                          ["with-cursor-w-cursor", "with-cursor"].includes(state.state)
                            ? minHeightClassNameOverride
                            : undefined
                        }`}
                        alt="Min height"
                        src="/img/min-height-constraint-1.png"
                      />
                      <div className="text-cursor-2">
                        {state.state === "with-cursor-w-cursor" && (
                          <div className="div-wrapper">
                            <div className="text-8">Board Title</div>
                          </div>
                        )}

                        <KeyboardUiUniversalInputCursor1 className="keyboard-UI" color="white" />
                        {["cursor", "with-cursor"].includes(state.state) && (
                          <div className="input-element-5">
                            {state.state === "with-cursor" && <div className="text-9">Board Title</div>}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {state.type === "title" && state.state === "finished" && (
        <Type
          className="type-h2"
          eyebrowClassName={`${state.darkMode === "on" ? "class" : "class-2"}`}
          text="Board Title"
          textClassName={`${state.darkMode === "on" && "type-body-2"}`}
        />
      )}

      {state.type === "text" && state.state === "finished" && (
        <TypeBody
          className="COMPONENTS-text-2"
          eyebrowClassName={`${state.darkMode === "on" && "instance-node"}`}
          text="CONCEPT"
          text1={typeBodyText}
          textClassName={`${state.darkMode === "on" && "type-body-2"}`}
        />
      )}
    </div>
  );
};

function reducer(state, action) {
  if (state.darkMode === "off" && state.state === "default" && state.type === "title") {
    switch (action) {
      case "click":
        return {
          darkMode: "off",
          state: "with-cursor",
          type: "title",
        };
    }
  }

  if (state.darkMode === "on" && state.state === "default" && state.type === "title") {
    switch (action) {
      case "click":
        return {
          darkMode: "on",
          state: "with-cursor",
          type: "title",
        };
    }
  }

  if (state.darkMode === "on" && state.state === "empty" && state.type === "title") {
    switch (action) {
      case "click_728":
        return {
          darkMode: "on",
          state: "cursor",
          type: "title",
        };
    }
  }

  if (state.darkMode === "off" && state.state === "cursor" && state.type === "title") {
    switch (action) {
      case "click_728":
        return {
          darkMode: "off",
          state: "text-filled-w-cursor",
          type: "title",
        };
    }
  }

  if (state.darkMode === "on" && state.state === "cursor" && state.type === "title") {
    switch (action) {
      case "click_728":
        return {
          darkMode: "on",
          state: "with-cursor-w-cursor",
          type: "title",
        };
    }
  }

  if (state.darkMode === "off" && state.state === "with-cursor" && state.type === "title") {
    switch (action) {
      case "click_728":
        return {
          darkMode: "off",
          state: "cursor",
          type: "title",
        };
    }
  }

  if (state.darkMode === "on" && state.state === "with-cursor" && state.type === "title") {
    switch (action) {
      case "click_728":
        return {
          darkMode: "on",
          state: "cursor",
          type: "title",
        };
    }
  }

  if (state.darkMode === "off" && state.state === "text-filled-w-cursor" && state.type === "title") {
    switch (action) {
      case "click":
        return {
          darkMode: "off",
          state: "finished",
          type: "title",
        };
    }
  }

  if (state.darkMode === "on" && state.state === "with-cursor-w-cursor" && state.type === "title") {
    switch (action) {
      case "click_728":
        return {
          darkMode: "on",
          state: "finished",
          type: "title",
        };
    }
  }

  if (state.darkMode === "off" && state.state === "finished" && state.type === "title") {
    switch (action) {
      case "mouse_enter":
        return {
          darkMode: "off",
          state: "finished-on-hover",
          type: "title",
        };
    }
  }

  if (state.darkMode === "on" && state.state === "finished" && state.type === "title") {
    switch (action) {
      case "mouse_enter":
        return {
          darkMode: "on",
          state: "finished-on-hover",
          type: "title",
        };
    }
  }

  if (state.darkMode === "off" && state.state === "default" && state.type === "text") {
    switch (action) {
      case "click_864":
        return {
          darkMode: "off",
          state: "with-cursor",
          type: "text",
        };
    }
  }

  if (state.darkMode === "on" && state.state === "default" && state.type === "text") {
    switch (action) {
      case "click_864":
        return {
          darkMode: "on",
          state: "with-cursor",
          type: "text",
        };
    }
  }

  if (state.darkMode === "off" && state.state === "empty" && state.type === "text") {
    switch (action) {
      case "click_891":
        return {
          darkMode: "off",
          state: "text-filled",
          type: "text",
        };
    }
  }

  if (state.darkMode === "on" && state.state === "empty" && state.type === "text") {
    switch (action) {
      case "click_891":
        return {
          darkMode: "on",
          state: "text-filled",
          type: "text",
        };
    }
  }

  if (state.darkMode === "off" && state.state === "with-cursor" && state.type === "text") {
    switch (action) {
      case "click_891":
        return {
          darkMode: "off",
          state: "empty",
          type: "text",
        };
    }
  }

  if (state.darkMode === "on" && state.state === "with-cursor" && state.type === "text") {
    switch (action) {
      case "click_891":
        return {
          darkMode: "on",
          state: "empty",
          type: "text",
        };
    }
  }

  if (state.darkMode === "off" && state.state === "text-filled" && state.type === "text") {
    switch (action) {
      case "click_864":
        return {
          darkMode: "off",
          state: "finished",
          type: "text",
        };
    }
  }

  if (state.darkMode === "on" && state.state === "text-filled" && state.type === "text") {
    switch (action) {
      case "click_864":
        return {
          darkMode: "on",
          state: "finished",
          type: "text",
        };
    }
  }

  if (state.darkMode === "off" && state.state === "finished" && state.type === "text") {
    switch (action) {
      case "mouse_enter":
        return {
          darkMode: "off",
          state: "finished-on-hover",
          type: "text",
        };
    }
  }

  if (state.darkMode === "off" && state.state === "finished-on-hover" && state.type === "text") {
    switch (action) {
      case "mouse_leave":
        return {
          darkMode: "off",
          state: "finished",
          type: "text",
        };

      case "click_982":
        return {
          darkMode: "off",
          state: "text-filled",
          type: "text",
        };
    }
  }

  if (state.darkMode === "on" && state.state === "finished" && state.type === "text") {
    switch (action) {
      case "mouse_enter":
        return {
          darkMode: "on",
          state: "finished-on-hover",
          type: "text",
        };
    }
  }

  if (state.darkMode === "on" && state.state === "finished-on-hover" && state.type === "text") {
    switch (action) {
      case "mouse_leave":
        return {
          darkMode: "on",
          state: "finished",
          type: "text",
        };

      case "click_982":
        return {
          darkMode: "on",
          state: "text-filled",
          type: "text",
        };
    }
  }

  if (state.darkMode === "off" && state.state === "finished-on-hover" && state.type === "title") {
    switch (action) {
      case "click_982":
        return {
          darkMode: "off",
          state: "with-cursor",
          type: "title",
        };

      case "mouse_leave":
        return {
          darkMode: "off",
          state: "finished",
          type: "title",
        };
    }
  }

  if (state.darkMode === "on" && state.state === "finished-on-hover" && state.type === "title") {
    switch (action) {
      case "click_982":
        return {
          darkMode: "on",
          state: "with-cursor",
          type: "title",
        };

      case "mouse_leave":
        return {
          darkMode: "on",
          state: "finished",
          type: "title",
        };
    }
  }

  return state;
}

ComponentsTextArea.propTypes = {
  type: PropTypes.oneOf(["text", "title"]),
  stateProp: PropTypes.oneOf([
    "text-filled",
    "finished-on-hover",
    "text-filled-w-o-cursor",
    "finished",
    "text-filled-w-cursor",
    "default",
    "cursor",
    "with-cursor-w-cursor",
    "empty",
    "with-cursor",
  ]),
  darkMode: PropTypes.oneOf(["off", "on"]),
  minHeight: PropTypes.string,
  typeBodyText: PropTypes.string,
};
