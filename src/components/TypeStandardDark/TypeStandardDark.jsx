/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { ComponentsButtons5 } from "../../icons/ComponentsButtons5";
import { ComponentsButtons6 } from "../../icons/ComponentsButtons6";
import { ComponentsButtons7 } from "../../icons/ComponentsButtons7";
import { ComponentsButtons8 } from "../../icons/ComponentsButtons8";
import "./style.css";

export const TypeStandardDark = ({
  className,
  icon = <ComponentsButtons8 className="COMPONENTS-buttons" />,
  override = <ComponentsButtons7 className="COMPONENTS-buttons" />,
  icon1 = <ComponentsButtons6 className="components-buttons-6" />,
  icon2 = <ComponentsButtons5 className="COMPONENTS-buttons" />,
}) => {
  return (
    <div className={`type-standard-dark ${className}`}>
      <div className="text-left">Title</div>
      <div className="nav-bar-for-images-wrapper">
        <div className="nav-bar-for-images">
          <div className="nav-menu">
            {icon}
            {override}
            {icon1}
            {icon2}
          </div>
          <div className="text-right">Subtitle</div>
        </div>
      </div>
    </div>
  );
};
