// SkeletonLoader.js
import React from 'react';
import './SkeletonLoader.css';

/**
* Default Color Object
* Represents a default color with optional properties.
* @typedef {Object} DefaultColor
* @property {string} [hex] - The HEX representation of the color.
* @property {string} [rgb] - The RGB representation of the color.
* @property {string} [cmyk] - The CMYK representation of the color.
* @property {string} [name] - The name of the color.
*/
export const defaultColor = {
    name: "Silver",
    rgba: "196, 196, 196, 0.25"
    // hex: "#C4C4C4",
    // rgb: "196, 196, 196",
    // cmyk: "0, 0, 0, 23.1"
};

/**
  * SkeletonLoader Component
  * A component representing a skeleton loader with color information.
  * NOTE: keep this an empty container!
  * @returns {JSX.Element} - The rendered SkeletonLoader component.
  */
const SkeletonLoader = () => (
    <>
        <div className="main-section col-xs-36 col-md-24 grid-container nested-grid">
            {/* First dominant colour */}
            <div className="wrapper-2-col secondary-section col-xs-36 col-md-18">
                <div className="loader-square-bottom-align">
                    <div className="color-name-container">
                        <p className="color-name" style={{ color: defaultColor }}>Name</p>
                    </div>
                    <p className="color-hex" style={{ color: defaultColor }}>HEX: {defaultColor.hex}</p>
                    <p className="color-rgb" style={{ color: defaultColor }}>RGB: {defaultColor.rgb}</p>
                    <p className="color-cmyk" style={{ color: defaultColor }}>CMYK: {defaultColor.cmyk}</p>
                </div>
            </div>

            {/* Second dominant colour */}
            <div className="wrapper-2-col secondary-section col-xs-36 col-md-18">
                <div className="loader-square-bottom-align">
                    <div className="color-name-container">
                        <p className="color-name" style={{ color: defaultColor }}>Name</p>
                    </div>
                    <p className="color-hex" style={{ color: defaultColor }}>HEX: {defaultColor.hex}</p>
                    <p className="color-rgb" style={{ color: defaultColor }}>RGB: {defaultColor.rgb}</p>
                    <p className="color-cmyk" style={{ color: defaultColor }}>CMYK: {defaultColor.cmyk}</p>
                </div>
            </div>

            <div className="wrapper-4-col secondary-section col-xs-36 col-md-9">
                <div className="loader-square-top-align">
                    <div className="color-name-container">
                        <p className="color-name" style={{ color: defaultColor }}>Name</p>
                    </div>
                    <p className="color-hex" style={{ color: defaultColor }}>HEX: {defaultColor.hex}</p>
                    <p className="color-rgb" style={{ color: defaultColor }}>RGB: {defaultColor.rgb}</p>
                    <p className="color-cmyk" style={{ color: defaultColor }}>CMYK: {defaultColor.cmyk}</p>
                </div>
            </div>
            <div className="wrapper-4-col secondary-section col-xs-36 col-md-9">
                <div className="loader-square-top-align">
                    <div className="color-name-container">
                        <p className="color-name" style={{ color: defaultColor }}>Name</p>
                    </div>
                    <p className="color-hex" style={{ color: defaultColor }}>HEX: {defaultColor.hex}</p>
                    <p className="color-rgb" style={{ color: defaultColor }}>RGB: {defaultColor.rgb}</p>
                    <p className="color-cmyk" style={{ color: defaultColor }}>CMYK: {defaultColor.cmyk}</p>
                </div>
            </div>
            <div className="wrapper-4-col secondary-section col-xs-36 col-md-9">
                <div className="loader-square-top-align">
                    <div className="color-name-container">
                        <p className="color-name" style={{ color: defaultColor }}>Name</p>
                    </div>
                    <p className="color-hex" style={{ color: defaultColor }}>HEX: {defaultColor.hex}</p>
                    <p className="color-rgb" style={{ color: defaultColor }}>RGB: {defaultColor.rgb}</p>
                    <p className="color-cmyk" style={{ color: defaultColor }}>CMYK: {defaultColor.cmyk}</p>
                </div>
            </div>
            <div className="wrapper-4-col secondary-section col-xs-36 col-md-9">
                <div className="loader-square-top-align">
                    <div className="color-name-container">
                        <p className="color-name" style={{ color: defaultColor }}>Name</p>
                    </div>
                    <p className="color-hex" style={{ color: defaultColor }}>HEX: {defaultColor.hex}</p>
                    <p className="color-rgb" style={{ color: defaultColor }}>RGB: {defaultColor.rgb}</p>
                    <p className="color-cmyk" style={{ color: defaultColor }}>CMYK: {defaultColor.cmyk}</p>
                </div>
            </div>
        </div>
    </>
);

export default SkeletonLoader;