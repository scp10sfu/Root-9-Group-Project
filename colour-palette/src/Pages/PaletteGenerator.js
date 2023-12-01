import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ColorThief from 'colorthief';
import './PaletteGenerator.css';

import Layout from '../Components/Layout';
import Toast from '../Components/Toast';

import { ReactComponent as CopyIconWhiteUnfilled } from '../images/icon-copy-white-unfilled.svg';
import { ReactComponent as CopyIconDarkUnfilled } from '../images/icon-copy-dark-unfilled.svg';
import { ReactComponent as CopyIconWhiteFilled } from '../images/icon-copy-white-filled.svg';
import { ReactComponent as CopyIconDarkFilled } from '../images/icon-copy-dark-filled.svg';
import { ReactComponent as ArrowIcon } from '../images/icon-arrow.svg';

function PaletteGenerator() {
  const [prompt, setPrompt] = useState('');
  const [numberOfColors, setNumberOfColors] = useState(6); // Default number of colors
  // const [allColors, setAllColors] = useState([]); // All colors fetched from the API
  const [fullResponse, setFullResponse] = useState(''); // Full response from the API
  const [isLoading, setIsLoading] = useState(false);
  const [colors, setColors] = useState([]);
  const colorThief = new ColorThief();
  const [backgroundStyle, setBackgroundStyle] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const [additionalMessage, setAdditionalMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFullResponse(''); // Clear previous response
  
    try {
      const apiUrl = 'https://paleta-11d0ba2b2f2b.herokuapp.com' || 'http://localhost:3000';
      const response = await axios.post(`${apiUrl}/get_palette`, { prompt });
  
      const fullResponse = response.data.fullResponse;
  
      // Extracting colors and converting them to the desired format
      const colorPromises = response.data.colors.map(async (hex) => {
        const rgb = hexToRgb(hex);
        const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
        const name = await fetchColorName(hex);
        return { hex, rgb: `${rgb.r}, ${rgb.g}, ${rgb.b}`, cmyk: `${cmyk.c}, ${cmyk.m}, ${cmyk.y}, ${cmyk.k}`, name };
      });
      const colorObjects = await Promise.all(colorPromises);
      
      // Update the background style based on the extracted colors
      const background = {};
      for (let i = 0; i < colorObjects.length; i++) {
        background[`--color${i + 1}`] = colorObjects[i]?.hex;
      }
      setBackgroundStyle(background);

      // Find the index of the last HEX code in the full response
      const lastHexCode = colorObjects[colorObjects.length - 1].hex;
      const messageStartIndex = fullResponse.lastIndexOf(lastHexCode) + lastHexCode.length;
      const additionalMessage = fullResponse.slice(messageStartIndex).trim();
  
      setColors(colorObjects);
      setAdditionalMessage(additionalMessage); // Store the additional message
    } catch (error) {
      console.error('Error:', error);
      setFullResponse('Failed to get the color palette. Please try again.');
    } finally {
      setIsLoading(false);
      setPrompt('');  // Clear the input field
    }
  };

  const handleColorSelection = (num) => {
    setNumberOfColors(num); // Update the number of colors without calling API
  };

  // Get the colors to display based on the selected number
  const displayedColors = colors.slice(0, numberOfColors);

  useEffect(() => {
    // Scroll to the bottom of the chat when chatHistory changes
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chatHistory]);

  /* ************************************************************************ */
  /* ********************* SAME AS COLOUR EXTRACTOR ************************* */
  /* ************************************************************************ */

  /**
   * Converts HEX values to RGB format.
   * @param {string} hex - The HEX color code.
   * @returns {object} The RGB representation of the HEX value.
   */
  const hexToRgb = (hex) => {
    // Remove the hash if it's included
    hex = hex.replace(/^#/, '');

    // Parse the hex values to separate R, G, B components
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    // Return an object with the R, G, B values
    return { r, g, b };
  }

  /**
  * Converts RGB values to CMYK format.
  * @param {number} r - The red value (0 to 255).
  * @param {number} g - The green value (0 to 255).
  * @param {number} b - The blue value (0 to 255).
  * @returns {string} The CMEK representation of the RGB values.
  */
  const rgbToCmyk = (r, g, b) => {
    let c = 1 - (r / 255);
    let m = 1 - (g / 255);
    let y = 1 - (b / 255);
    let k = Math.min(c, Math.min(m, y));

    c = ((c - k) / (1 - k)) || 0;
    m = ((m - k) / (1 - k)) || 0;
    y = ((y - k) / (1 - k)) || 0;

    c = Math.round(c * 100);
    m = Math.round(m * 100);
    y = Math.round(y * 100);
    k = Math.round(k * 100);

    return { c, m, y, k };
  };

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
  * NumberButton Component
  * @param {number} number - The number to display on the button.
  * @param {boolean}isActive - A flag indicating whether the button is active.
  * @returns {JSX.Element} - The rendered NumberButton component.
  */
  const NumberButton = ({ number, isActive }) => (
    <button
      className={`number-button ${isActive ? 'active' : ''}`}
      onClick={() => handleNumberChange(number)}>
      {number}
    </button>
  );

  /**
  * Handles the change in the number of colors.
  * @param {object} event - The change event.
  */
  const handleNumberChange = (number) => {
    setNumberOfColors(number);
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
          <div className="loader-square-bottom-align" style={{ backgroundColor: defaultColor.hex }}>
            <div className="color-name-container">
              <p className="color-name" style={{ color: defaultColor }}>{defaultColor.name}</p>
            </div>
            <p className="color-hex" style={{ color: defaultColor }}>HEX: {defaultColor.hex}</p>
            <p className="color-rgb" style={{ color: defaultColor }}>RGB: {defaultColor.rgb}</p>
            <p className="color-cmyk" style={{ color: defaultColor }}>CMYK: {defaultColor.cmyk}</p>
          </div>
        </div>
        {/* Second dominant colour */}
        <div className="wrapper-2-col secondary-section col-xs-36 col-md-18">
          <div className="loader-square-bottom-align" style={{ backgroundColor: defaultColor.hex }}>
            <div className="color-name-container">
              <p className="color-name" style={{ color: defaultColor }}>{defaultColor.name}</p>
            </div>
            <p className="color-hex" style={{ color: defaultColor }}>HEX: {defaultColor.hex}</p>
            <p className="color-rgb" style={{ color: defaultColor }}>RGB: {defaultColor.rgb}</p>
            <p className="color-cmyk" style={{ color: defaultColor }}>CMYK: {defaultColor.cmyk}</p>
          </div>
        </div>

        <div className="wrapper-4-col secondary-section col-xs-36 col-md-9">
          <div className="loader-square-top-align" style={{ backgroundColor: defaultColor.hex }}>
            <div className="color-name-container">
              <p className="color-name" style={{ color: defaultColor }}>{defaultColor.name}</p>
            </div>
            <p className="color-hex" style={{ color: defaultColor }}>HEX: {defaultColor.hex}</p>
            <p className="color-rgb" style={{ color: defaultColor }}>RGB: {defaultColor.rgb}</p>
            <p className="color-cmyk" style={{ color: defaultColor }}>CMYK: {defaultColor.cmyk}</p>
          </div>
        </div>
        <div className="wrapper-4-col secondary-section col-xs-36 col-md-9">
          <div className="loader-square-top-align" style={{ backgroundColor: defaultColor.hex }}>
            <div className="color-name-container">
              <p className="color-name" style={{ color: defaultColor }}>{defaultColor.name}</p>
            </div>
            <p className="color-hex" style={{ color: defaultColor }}>HEX: {defaultColor.hex}</p>
            <p className="color-rgb" style={{ color: defaultColor }}>RGB: {defaultColor.rgb}</p>
            <p className="color-cmyk" style={{ color: defaultColor }}>CMYK: {defaultColor.cmyk}</p>
          </div>
        </div>
        <div className="wrapper-4-col secondary-section col-xs-36 col-md-9">
          <div className="loader-square-top-align" style={{ backgroundColor: defaultColor.hex }}>
            <div className="color-name-container">
              <p className="color-name" style={{ color: defaultColor }}>{defaultColor.name}</p>
            </div>
            <p className="color-hex" style={{ color: defaultColor }}>HEX: {defaultColor.hex}</p>
            <p className="color-rgb" style={{ color: defaultColor }}>RGB: {defaultColor.rgb}</p>
            <p className="color-cmyk" style={{ color: defaultColor }}>CMYK: {defaultColor.cmyk}</p>
          </div>
        </div>
        <div className="wrapper-4-col secondary-section col-xs-36 col-md-9">
          <div className="loader-square-top-align" style={{ backgroundColor: defaultColor.hex }}>
            <div className="color-name-container">
              <p className="color-name" style={{ color: defaultColor }}>{defaultColor.name}</p>
            </div>
            <p className="color-hex" style={{ color: defaultColor }}>HEX: {defaultColor.hex}</p>
            <p className="color-rgb" style={{ color: defaultColor }}>RGB: {defaultColor.rgb}</p>
            <p className="color-cmyk" style={{ color: defaultColor }}>CMYK: {defaultColor.cmyk}</p>
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
  * Color Variables
  * Variables representing colors based on the 'colors' array.
  */
  const firstColor = colors.length >= 1 ? colors[0] : defaultColor;
  const secondColor = colors.length >= 2 ? colors[1] : defaultColor;
  const thirdColor = colors.length >= 3 ? colors[2] : defaultColor;
  const fourthColor = colors.length >= 4 ? colors[3] : defaultColor;
  const fifthColor = colors.length >= 5 ? colors[4] : defaultColor;
  const sixthColor = colors.length >= 6 ? colors[5] : defaultColor;
  const seventhColor = colors.length >= 7 ? colors[6] : defaultColor;
  const eighthColor = colors.length >= 8 ? colors[7] : defaultColor;
  const ninthColor = colors.length >= 9 ? colors[8] : defaultColor;
  const tenthColor = colors.length >= 10 ? colors[9] : defaultColor;


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
        }, 300);
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
        }, 300);

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

  return (
    <div className="palette-generator" style={backgroundStyle}>

      <div className="background">
        {Array.from({ length: 20 }, (_, i) => (
          <span key={i} style={{ color: `var(--color${i + 1})` }}></span>
        ))}
      </div>

      {/* Toast message */}
      {showToast && (
        <Toast
          message={toastMessage}
          onClose={() => {
            setShowToast(false);
            setToastMessage('');
          }}
        />
      )}

      <Layout>
        <div className="grid-container general">
          <div className="col-xs-36 col-md-36"></div>

          {/* The main content - left part */}
          <div className="main-section col-xs-36 col-md-12 grid-container nested-grid">
            <div className="col-xs-36 col-md-25">
              <header className="text_block_text">AI Palette Generator</header>
            </div>

            <div className="col-xs-36 col-md-25">
              <header className="text_block_subtext">Generate wonderful palettes.
              </header>
            </div>

            <div className="request-info-text col-xs-36 col-md-25">
              Enter Request:
            </div>

            {/* FOR CHAT */}
            <div className="chat-container col-xs-36 col-md-25">
              

              {/* Display chat messages */}
              {/* 
              {chatHistory.map((additionalMessage, index) => (
                <div key={index} className={"user-message"}>
                  {additionalMessage.message}
                </div>
              ))}
              */}

              <div id="palette-additional-message">
                {additionalMessage && <p className="user-message">{additionalMessage}</p>}
              </div>


              {isLoading && (
                <div className="loading"></div>
              )}

            </div>


            <div className="col-xs-36 col-md-25">
              <form onSubmit={handleSubmit} className="input-container text-input-container">
                  <input
                    type="text"
                    id="prompt"
                    name="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    required
                  />
                {/* <input
                  className="col-xs-8 col-md-8"
                  type="submit"
                  value="Get"
                  disabled={isLoading}
                /> */}

                <button className="col-xs-8 col-md-8 styled-button" type="submit" disabled={isLoading}>
                  <ArrowIcon />
                </button>
              </form>
            </div>


            <div className="number-of-colors-container col-xs-36 col-md-25 grid-container-small">
              <div className="number-of-colors-text">
                NUMBER OF COLOURS:
              </div>
              <div className="number-buttons-container">
                {[4, 6, 8, 10].map((number) => (
                  <NumberButton
                    key={number}
                    number={number}
                    isActive={numberOfColors === number}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Conditional rendering based on isLoading state */}
          {/* The main content - right part */}
          {isLoading ? (<SkeletonLoader />)
            : (<>

              {/* First dominant colour */}
              <div className="main-section col-xs-36 col-md-24 grid-container nested-grid">
                <div className="wrapper-2-col secondary-section col-xs-36 col-md-18">
                  <ColourBoxBottom color={firstColor} />
                </div>

                {/* Second dominant colour */}
                <div className="wrapper-2-col secondary-section col-xs-36 col-md-18">
                  <ColourBoxBottom color={secondColor} />

                </div>

                {/* 4 colours */}
                {numberOfColors === 4 && (<>
                  <div className="wrapper-4-col secondary-section col-xs-36 col-md-18">
                    <ColourBoxTop color={thirdColor} />
                  </div>
                  <div className="wrapper-4-col secondary-section col-xs-36 col-md-18">
                    <ColourBoxTop color={fourthColor} />
                  </div>
                </>)}

                {/* 6 colours */}
                {numberOfColors === 6 && (<>
                  <div className="wrapper-4-col secondary-section col-xs-36 col-md-9">
                    <ColourBoxTop color={thirdColor} />
                  </div>
                  <div className="wrapper-4-col secondary-section col-xs-36 col-md-9">
                    <ColourBoxTop color={fourthColor} />
                  </div>
                  <div className="wrapper-4-col secondary-section col-xs-36 col-md-9">
                    <ColourBoxTop color={fifthColor} />
                  </div>
                  <div className="wrapper-4-col secondary-section col-xs-36 col-md-9">
                    <ColourBoxTop color={sixthColor} />
                  </div>
                </>)}

                {/* 8 colours */}
                {numberOfColors === 8 && (<>
                  <div className="wrapper-2-col secondary-section col-xs-36 col-md-12">
                    <ColourBoxTop color={thirdColor} />
                  </div>
                  <div className="wrapper-2-col secondary-section col-xs-36 col-md-12">
                    <ColourBoxTop color={fourthColor} />
                  </div>
                  <div className="wrapper-2-col secondary-section col-xs-36 col-md-12">
                    <ColourBoxTop color={fifthColor} />
                  </div>
                  <div className="wrapper-2-col secondary-section col-xs-36 col-md-12">
                    <ColourBoxTop color={sixthColor} />
                  </div>
                  <div className="wrapper-2-col secondary-section col-xs-36 col-md-12">
                    <ColourBoxTop color={seventhColor} />
                  </div>
                  <div className="wrapper-2-col secondary-section col-xs-36 col-md-12">
                    <ColourBoxTop color={eighthColor} />
                  </div>
                </>)}

                {/* 10 colours */}
                {numberOfColors === 10 && (<>
                  <div className="wrapper-2-col secondary-section col-xs-36 col-md-9">
                    <ColourBoxTop color={thirdColor} />
                  </div>
                  <div className="wrapper-2-col secondary-section col-xs-36 col-md-9">
                    <ColourBoxTop color={fourthColor} />
                  </div>
                  <div className="wrapper-2-col secondary-section col-xs-36 col-md-9">
                    <ColourBoxTop color={fifthColor} />
                  </div>
                  <div className="wrapper-2-col secondary-section col-xs-36 col-md-9">
                    <ColourBoxTop color={sixthColor} />
                  </div>
                  <div className="wrapper-2-col secondary-section col-xs-36 col-md-9">
                    <ColourBoxTop color={seventhColor} />
                  </div>
                  <div className="wrapper-2-col secondary-section col-xs-36 col-md-9">
                    <ColourBoxTop color={eighthColor} />
                  </div>
                  <div className="wrapper-2-col secondary-section col-xs-36 col-md-9">
                    <ColourBoxTop color={ninthColor} />
                  </div>
                  <div className="wrapper-2-col secondary-section col-xs-36 col-md-9">
                    <ColourBoxTop color={tenthColor} />
                  </div>

                </>)}

              </div>
            </>
            )}

          <div className="col-xs-36 col-md-36"></div>

        </div>
      </Layout>

    </div>
  );
}

export default PaletteGenerator;
