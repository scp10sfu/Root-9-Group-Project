import React, { useState, useRef, useEffect } from 'react';
import ColorThief from 'colorthief';
import axios from "axios";
import "./PaletteGenerator.css";

import Layout from '../Components/Layout';
import Toast from '../Components/Toast';

import { ReactComponent as CopyIconWhiteUnfilled } from '../images/icon-copy-white-unfilled.svg';
import { ReactComponent as CopyIconDarkUnfilled } from '../images/icon-copy-dark-unfilled.svg';
import { ReactComponent as CopyIconWhiteFilled } from '../images/icon-copy-white-filled.svg';
import { ReactComponent as CopyIconDarkFilled } from '../images/icon-copy-dark-filled.svg';


function PaletteGenerator() {
    const [prompt, setPrompt] = useState('');
    const [colors, setColors] = useState([]);
    const [fullResponse, setFullResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const colorThief = new ColorThief();
    const [backgroundStyle, setBackgroundStyle] = useState({});
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    /* ************************************************************************ */
    /* ********************* SAME AS COLOUR EXTRACTOR ************************* */
    /* ************************************************************************ */
    
    
    /**
   * Determines whether the text in the colour block should be light or dark.
   * @param {string} hexColor - The HEX color code.
   * @returns {string} The text color.
   */
  const getTextColor = (hexColor) => {
    if (!hexColor || typeof hexColor !== 'string' || !hexColor.match(/^#[0-9a-fA-F]{6}$/)) {
      // Return a default color or handle the error in a way that fits your application
      return 'rgba(18, 18, 18, 1)';
    }

    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    // Calculate relative luminance
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

    // Choose the text color based on luminance
    return luminance > 128 ? 'rgba(18, 18, 18, 1)' : 'rgba(255, 255, 255, 1)';
  };


  /**
    * Fetches color name from the API based on HEX code.
    * @param {string} hex - HEX color code.
    * @returns {Promise<string>} Resolves with the color name.
    */
  const fetchColorName = async (hex) => {
    try {
      const response = await axios.get(`https://www.thecolorapi.com/id?hex=${hex.replace('#', '')}`);
      return response.data.name.value;
    } catch (error) {
      console.error('Error fetching the color name:', error);
      return hex; // Fallback to HEX if the name can't be fetched
    }
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
            <div class="wrapper-2-col secondary-section col-xs-36 col-md-18">
              <div key={0} className="loader-square-bottom-align" style={{ backgroundColor: firstColor.hex }}>
                <p className="color-name">{firstColor.name}</p>
                <p className="color-hex">HEX: {firstColor.hex}</p>
                <p className="color-rgb">RGB: {firstColor.rgb}</p>
                <p className="color-cmyk">CMYK: {firstColor.cmyk}</p>
              </div>
            </div>
            {/* Second dominant colour */}
            <div class="wrapper-2-col secondary-section col-xs-36 col-md-18">
              <div key={1} className="loader-square-bottom-align" style={{ backgroundColor: secondColor.hex }}>
                <p className="color-name">{secondColor.name}</p>
                <p className="color-hex">HEX: {secondColor.hex}</p>
                <p className="color-rgb">RGB: {secondColor.rgb}</p>
                <p className="color-cmyk">CMYK: {secondColor.cmyk}</p>
              </div>
            </div>
    
            <div class="wrapper-4-col secondary-section col-xs-36 col-md-9">
              <div key={2} className="loader-square-top-align" style={{ backgroundColor: thirdColor.hex }}>
                <p className="color-name">{thirdColor.name}</p>
                <p className="color-hex">HEX: {thirdColor.hex}</p>
                <p className="color-rgb">RGB: {thirdColor.rgb}</p>
                <p className="color-cmyk">CMYK: {thirdColor.cmyk}</p>
              </div>
            </div>
            <div class="wrapper-4-col secondary-section col-xs-36 col-md-9">
              <div key={3} className="loader-square-top-align" style={{ backgroundColor: fourthColor.hex }}>
                <p className="color-name">{fourthColor.name}</p>
                <p className="color-hex">HEX: {fourthColor.hex}</p>
                <p className="color-rgb">RGB: {fourthColor.rgb}</p>
                <p className="color-cmyk">CMYK: {fourthColor.cmyk}</p>
              </div>
            </div>
            <div class="wrapper-4-col secondary-section col-xs-36 col-md-9">
              <div key={4} className="loader-square-top-align" style={{ backgroundColor: fifthColor.hex }}>
                <p className="color-name">{fifthColor.name}</p>
                <p className="color-hex">HEX: {fifthColor.hex}</p>
                <p className="color-rgb">RGB: {fifthColor.rgb}</p>
                <p className="color-cmyk">CMYK: {fifthColor.cmyk}</p>
              </div>
            </div>
            <div class="wrapper-4-col secondary-section col-xs-36 col-md-9">
              <div key={5} className="loader-square-top-align" style={{ backgroundColor: sixthColor.hex }}>
                <p className="color-name">{sixthColor.name}</p>
                <p className="color-hex">HEX: {sixthColor.hex}</p>
                <p className="color-rgb">RGB: {sixthColor.rgb}</p>
                <p className="color-cmyk">CMYK: {sixthColor.cmyk}</p>
              </div>
            </div>
          </div>
        </>
      );

      /**
  * Default Color Object
  * Represents a default color with optional properties.
  */
  const defaultColor = {
    name: "Silver",
    rgba: "196, 196, 196, 0.25"
    // hex: "#C4C4C4",
    // rgb: "196, 196, 196",
    // cmyk: "0, 0, 0, 23.1"
  };

  /**
   * ColourBoxBottom Component
   * A component representing a colour box with color information aligned to bottom.
   * @param {object} color - The color object.
   * @returns {JSX.Element} - The rendered ColourBoxBottom component.
   */
  const ColourBoxBottom = ({ color }) => {
    const textColor = getTextColor(color.hex);
    const [isCopyIconFilled, setIsCopyIconFilled] = useState(false);

    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text).then(() => {
        // toast.success('Copied to clipboard!', { autoClose: 1500 });
        setShowToast(true);
        setToastMessage('Copied to clipboard!');

        setTimeout(() => {
          setShowToast(false);
        }, 1500); // Auto-close after 2 seconds

        // Change the copy icon to filled for a second
        setIsCopyIconFilled(true);
        setTimeout(() => {
          setIsCopyIconFilled(false);
        }, 750);
      });
    };

    return (
      <div className="color-bottom-align" style={{ backgroundColor: color.hex }}>

        <div className="color-name-container">
          <p className="color-name" style={{ color: textColor }}>{color.name}</p>

          <button
            className="copy-icon"
            onClick={() => copyToClipboard(`${color.name}\nHEX: ${color.hex}\nRGB: ${color.rgb}\nCMYK: ${color.cmyk}`)}
            aria-label="Copy to clipboard"
          >
            {textColor === 'rgba(18, 18, 18, 1)' ? (
              isCopyIconFilled ? <CopyIconDarkFilled /> : <CopyIconDarkUnfilled />
            ) : (
              isCopyIconFilled ? <CopyIconWhiteFilled /> : <CopyIconWhiteUnfilled />
            )}
          </button>
        </div>

        <p className="color-hex" style={{ color: textColor }}>HEX: {color.hex}</p>
        <p className="color-rgb" style={{ color: textColor }}>RGB: {color.rgb}</p>
        <p className="color-cmyk" style={{ color: textColor }}>CMYK: {color.cmyk}</p>

      </div>

    );
  };


  /**
   * ColourBoxTop Component
   * A component representing a colour box with color information aligned to top.
   * @param {object} color - The color object.
   * @returns {JSX.Element} - The rendered ColourBoxTop component.
   */
  const ColourBoxTop = ({ color }) => {
    const textColor = getTextColor(color.hex);
    const [isCopyIconFilled, setIsCopyIconFilled] = useState(false);

    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text).then(() => {
        // toast.success('Copied to clipboard!', { autoClose: 1500 });
        setShowToast(true);
        setToastMessage('Copied to clipboard!');

        setTimeout(() => {
          setShowToast(false);
        }, 1500); // Auto-close after 2 seconds

        // Change the copy icon to filled for a second
        setIsCopyIconFilled(true);
        setTimeout(() => {
          setIsCopyIconFilled(false);
        }, 750);

      });
    };

    return (
      <div className="color-top-align" style={{ backgroundColor: color.hex }}>

        <div className="color-name-container">
          <p className="color-name" style={{ color: textColor }}>{color.name}</p>

          <button
            className="copy-icon"
            onClick={() => copyToClipboard(`${color.name}\nHEX: ${color.hex}\nRGB: ${color.rgb}\nCMYK: ${color.cmyk}`)}
            aria-label="Copy to clipboard"
          >
            {textColor === 'rgba(18, 18, 18, 1)' ? (
              isCopyIconFilled ? <CopyIconDarkFilled /> : <CopyIconDarkUnfilled />
            ) : (
              isCopyIconFilled ? <CopyIconWhiteFilled /> : <CopyIconWhiteUnfilled />
            )}
          </button>
        </div>

        <p className="color-hex" style={{ color: textColor }}>HEX: {color.hex}</p>
        <p className="color-rgb" style={{ color: textColor }}>RGB: {color.rgb}</p>
        <p className="color-cmyk" style={{ color: textColor }}>CMYK: {color.cmyk}</p>

      </div>
    );
  };

  

  /* ************************************************************************ */
  /* ************************************************************************ */
  /* ************************************************************************ */


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setFullResponse(''); // Clear previous response
        setColors([]); // Clear previous colors

        try {
            // Update this URL to point to your Node.js server endpoint
            const response = await axios.post("http://localhost:3000/get_palette", { prompt });
            setColors(response.data.colors || []);
            setFullResponse(response.data.fullResponse || ""); // Update with full response
        } catch (error) {
            console.error("Error:", error);
            setFullResponse('Failed to get the color palette. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="palette-generator">
            <h2>Ask for a Color Palette</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="prompt">
                    Describe the picture you want to draw:
                </label>
                <br />
                <input
                    type="text"
                    id="prompt"
                    name="prompt"
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    required
                />
                <br />
                <input type="submit" value="Get Palette" disabled={isLoading} />
            </form>
            {isLoading && (
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            )}
            <div id="palette-response">
                {fullResponse && <p className="palette-response-text">{fullResponse}</p>}
            </div>
            <div id="palette">
                {colors.length > 0 && (
                    <div className="color-swatches">
                        {colors.map((color, index) => (
                            <div key={index} className="color-swatch" style={{ backgroundColor: color }}></div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PaletteGenerator;