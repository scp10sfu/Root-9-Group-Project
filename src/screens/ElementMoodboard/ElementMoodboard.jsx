import React from "react";
import { ComponentsContent } from "../../components/ComponentsContent";
import { TypeStandardDark } from "../../components/TypeStandardDark";
import { ComponentsButtons1 } from "../../icons/ComponentsButtons1";
import { ComponentsButtons2 } from "../../icons/ComponentsButtons2";
import { ComponentsButtons3 } from "../../icons/ComponentsButtons3";
import { ComponentsButtons4 } from "../../icons/ComponentsButtons4";
import "./style.css";

export const ElementMoodboard = () => {
  return (
    <div className="element-moodboard">
      <div className="moodboard-generator-wrapper">
        <div className="moodboard-generator-2">
          <div className="overlap-group-6">
            <div className="COMPONENTS-grid">
              <div className="COMPONENTS-grid-2">
                <div className="frame-6" />
                <div className="image-2" />
                <div className="frame-7" />
                <div className="image-3" />
                <div className="image-4" />
                <div className="image-5" />
                <div className="image-6" />
                <div className="image-7" />
                <div className="image-8" />
                <div className="image-9" />
                <div className="image-10" />
              </div>
            </div>
            <ComponentsContent
              COMPONENTSTextAreaMinHeight="/img/min-height-constraint.png"
              COMPONENTSTextAreaMinHeightClassName="COMPONENTS-content-block"
              TOOL="moodboard-generator"
              alignment="top-left"
              className="design-component-instance-node"
              darkMode="off"
              enabled
              image="off"
              type="example-with-text-5"
            />
            <TypeStandardDark
              className="design-component-instance-node"
              icon={<ComponentsButtons4 className="icon-instance-node" />}
              icon1={<ComponentsButtons2 className="components-buttons-2" />}
              icon2={<ComponentsButtons1 className="icon-instance-node" />}
              override={<ComponentsButtons3 className="icon-instance-node" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
