import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ColorThief from 'colorthief';
import { ReactComponent as CopyIconWhiteUnfilled } from '../images/icon-copy-white-unfilled.svg';
import { ReactComponent as CopyIconDarkUnfilled } from '../images/icon-copy-dark-unfilled.svg';
import { ReactComponent as CopyIconWhiteFilled } from '../images/icon-copy-white-filled.svg';
import { ReactComponent as CopyIconDarkFilled } from '../images/icon-copy-dark-filled.svg';
import { ReactComponent as ArrowIcon } from '../images/icon-arrow-long.svg';
import { rgbToHex, hexToRgb, rgbToCmyk, getTextColor, rgbToHsl } from './Test/colorUtils';

import Layout from '../Components/Layout';
import Toast from '../Components/Toast';
import NumberButton from '../Components/NumberButton';
import SkeletonLoader from '../Components/SkeletonLoader';
import BackgroundColour from '../Components/BackgroundColour';
import { defaultColor } from '../Components/SkeletonLoader';
import './PaletteGenerator.css';

function PaletteGenerator() {
  const [prompt, setPrompt] = useState('');
  const [numberOfColors, setNumberOfColors] = useState(6); // Default number of colors
  // const [allColors, setAllColors] = useState([]); // All colors fetched from the API
  const [fullResponse, setFullResponse] = useState(''); // Full response from the API
  const [isLoading, setIsLoading] = useState(false);
  const [colors, setColors] = useState([]);
  const colorThief = new ColorThief();
  const [backgroundStyle, setBackgroundStyle] = useState({});
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');
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

      localStorage.removeItem('savedBackground');
      localStorage.setItem('savedBackground', JSON.stringify(background));

      // Find the index of the last HEX code in the full response
      const lastHexCode = colorObjects[colorObjects.length - 1].hex;
      const messageStartIndex = fullResponse.lastIndexOf(lastHexCode) + lastHexCode.length;
      const additionalMessage = fullResponse.slice(messageStartIndex).trim();

      setColors(colorObjects);
      setAdditionalMessage(additionalMessage); // Store the additional message


      // Add the additional message to chat history
      setChatHistory((prevHistory) => [
        ...(prevHistory || []),
        {
          message: additionalMessage,
          type: "user-message",
        },
      ]);

    } catch (error) {
      console.error('Error:', error);
      setFullResponse('Failed to get the color palette. Please try again.');

      // Add an error message to chat history if needed
      setChatHistory((prevHistory) => [
        ...(prevHistory || []),
        {
          message: 'Failed to get the color palette. Please try again.',
          type: "error-message",
        },
      ]);
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
    // Check if the page is just loaded and colors are saved in localStorage
    const savedBackground = localStorage.getItem('savedBackground');
    if (savedBackground) {
     setBackgroundStyle(JSON.parse(savedBackground));
    }

    // Add a welcome message to chatHistory when component mounts
    setChatHistory([
      {
        message: "Welcome to the AI Palette Generator! Type a request to get started.",
        type: "system", // Use this type to style system messages differently
      },
    ]);

    // Scroll to the bottom of the chat when chatHistory changes
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Attach event listener for beforeunload
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Function to handle beforeunload event
  const handleBeforeUnload = () => {
    console.log('Clearing local storage on page refresh.');
    localStorage.removeItem('savedBackground');
  };

  /* ************************************************************************ */
  /* ********************* SAME AS COLOUR EXTRACTOR ************************* */
  /* ************************************************************************ */

  /** 
   * Displays a toast message.
   * @param {string} type - The type of the toast message (e.g., 'success', 'error', 'info').
   * @param {string} message - The message to display.
   * @returns {void}
  */
  const showToast = (type, message) => {
    setToastType(type);
    setToastMessage(message);
    setToastVisible(true);
  
    // Automatically hide the toast after a certain duration (e.g., 3000 milliseconds)
    setTimeout(() => {
      setToastVisible(false);
      setToastMessage(null);
      setToastType(null);
    }, 1500);
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
  * Handles the change in the number of colors.
  * @param {object} event - The change event.
  */
  const handleNumberChange = (number) => {
    setNumberOfColors(number);
  };


  /**
  * Custom hook for handling copy icon state.
  * @returns {[boolean, Function]} - State and function to toggle state.
  */
  const useCopyIconState = () => {
    const [isCopyIconFilled, setIsCopyIconFilled] = useState(false);
  
    const toggleCopyIcon = () => {
      setIsCopyIconFilled((prevIsCopyIconFilled) => !prevIsCopyIconFilled);
    };
  
    return [isCopyIconFilled, toggleCopyIcon];
  };


/**
 * ColourBox Component
 * A component representing a colour box with color information aligned either to top or bottom.
 * @param {object} color - The color object.
 * @param {string} align - The alignment of color information (either 'top' or 'bottom').
 * @returns {JSX.Element} - The rendered ColourBox component.
 */
const ColourBox = ({ color, align }) => {
  const [isCopyIconFilled, toggleCopyIcon] = useCopyIconState();

  if (!color || typeof color.hex === 'undefined') {
    color = defaultColor;
  }

  const textColor = getTextColor(color.hex);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {

      showToast('info', 'Copied to clipboard!');
      
      toggleCopyIcon();
    });
  };

  return (
    <div className={`color-box color-${align}-align`} style={{ backgroundColor: color.hex }}>
      <div className="color-name-container">
        <p className="color-name" style={{ color: textColor }}>
          {color.name}
        </p>
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

  const ColourBoxBottom = ({ color }) => <ColourBox color={color} align="bottom" />;
  const ColourBoxTop = ({ color }) => <ColourBox color={color} align="top" />;



  /* ************************************************************************ */
  /* ************************************************************************ */
  /* ************************************************************************ */

  return (
    <div className="palette-generator" style={backgroundStyle}>

      <BackgroundColour colorArray=
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} style={{ color: `var(--color${i + 1})` }}></span>
        ))}
      />
      
      {/* Toast message */}
      {toastVisible && (
        <Toast
          type={toastType}
          message={toastMessage}
          onClose={() => {
            setToastVisible(false);
            setToastMessage('');
            setToastType('');
          }}
        />
      )}

      <Layout>
      <div className="grid-container general col-xs-justify-content-center col-md-justify-content-center">
        <div className="col-xs-36 col-md-36"></div>

          {/* The main content - left part */}
          <div className="main-section col-xs-36 col-md-12 grid-container nested-grid">
            <div className="col-xs-36-center col-md-25">
              <header className="text_block_text">AI Palette Generator</header>
            </div>

            <div className="col-xs-36-center col-md-25">
              <header className="text_block_subtext">Generate wonderful palettes.
              </header>
            </div>

            <div className="request-info-text col-xs-36 col-md-25">
              Enter Request:
            </div>

            {/* FOR CHAT */}
            <div className="chat-container glassmorphic-with-boarder col-xs-36 col-md-25">


              {/* Display chat messages */}

              {chatHistory.map((message, index) => (
                <div key={index} className={"user-message"}>
                  {message.message}
                </div>
              ))}


              {/* <div id="palette-additional-message">
                {additionalMessage && <p className="user-message">{additionalMessage}</p>}
              </div> */}


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
                  placeholder="Enter request here"
                  required
                  className="styled-input"
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
                    onClick={handleNumberChange}
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
                <div className="glassmorphic-simple wrapper-2-col secondary-section col-xs-36 col-md-18">
                  <ColourBoxBottom color={colors[0]} />
                </div>

                {/* Second dominant colour */}
                <div className="glassmorphic-simple wrapper-2-col secondary-section col-xs-36 col-md-18">
                  <ColourBoxBottom color={colors[1]} />

                </div>

                {/* 4 colours */}
                {numberOfColors === 4 && (<>
                  <div className="glassmorphic-simple wrapper-4-col secondary-section col-xs-36 col-md-18">
                    <ColourBoxTop color={colors[2]} />
                  </div>
                  <div className="glassmorphic-simple wrapper-4-col secondary-section col-xs-36 col-md-18">
                    <ColourBoxTop color={colors[3]} />
                  </div>
                </>)}

                {/* 6 colours */}
                {numberOfColors === 6 && (<>
                  <div className="glassmorphic-simple wrapper-4-col secondary-section col-xs-36 col-md-9">
                    <ColourBoxTop color={colors[2]} />
                  </div>
                  <div className="glassmorphic-simple wrapper-4-col secondary-section col-xs-36 col-md-9">
                    <ColourBoxTop color={colors[3]} />
                  </div>
                  <div className="glassmorphic-simple wrapper-4-col secondary-section col-xs-36 col-md-9">
                    <ColourBoxTop color={colors[4]} />
                  </div>
                  <div className="glassmorphic-simple wrapper-4-col secondary-section col-xs-36 col-md-9">
                    <ColourBoxTop color={colors[5]} />
                  </div>
                </>)}

                {/* 8 colours */}
                {numberOfColors === 8 && (<>
                  <div className="glassmorphic-simple wrapper-2-col secondary-section col-xs-36 col-md-12">
                    <ColourBoxTop color={colors[2]} />
                  </div>
                  <div className="glassmorphic-simple wrapper-2-col secondary-section col-xs-36 col-md-12">
                    <ColourBoxTop color={colors[3]} />
                  </div>
                  <div className="glassmorphic-simple wrapper-2-col secondary-section col-xs-36 col-md-12">
                    <ColourBoxTop color={colors[4]} />
                  </div>
                  <div className="glassmorphic-simple wrapper-2-col secondary-section col-xs-36 col-md-12">
                    <ColourBoxTop color={colors[5]} />
                  </div>
                  <div className="glassmorphic-simple wrapper-2-col secondary-section col-xs-36 col-md-12">
                    <ColourBoxTop color={colors[6]} />
                  </div>
                  <div className="glassmorphic-simple wrapper-2-col secondary-section col-xs-36 col-md-12">
                    <ColourBoxTop color={colors[7]} />
                  </div>
                </>)}

                {/* 10 colours */}
                {numberOfColors === 10 && (<>
                  <div className="glassmorphic-simple wrapper-2-col secondary-section col-xs-36 col-md-9">
                    <ColourBoxTop color={colors[2]} />
                  </div>
                  <div className="glassmorphic-simple wrapper-2-col secondary-section col-xs-36 col-md-9">
                    <ColourBoxTop color={colors[3]} />
                  </div>
                  <div className="glassmorphic-simple wrapper-2-col secondary-section col-xs-36 col-md-9">
                    <ColourBoxTop color={colors[4]} />
                  </div>
                  <div className="glassmorphic-simple wrapper-2-col secondary-section col-xs-36 col-md-9">
                    <ColourBoxTop color={colors[5]} />
                  </div>
                  <div className="glassmorphic-simple wrapper-2-col secondary-section col-xs-36 col-md-9">
                    <ColourBoxTop color={colors[6]} />
                  </div>
                  <div className="glassmorphic-simple wrapper-2-col secondary-section col-xs-36 col-md-9">
                    <ColourBoxTop color={colors[7]} />
                  </div>
                  <div className="glassmorphic-simple wrapper-2-col secondary-section col-xs-36 col-md-9">
                    <ColourBoxTop color={colors[8]} />
                  </div>
                  <div className="glassmorphic-simple wrapper-2-col secondary-section col-xs-36 col-md-9">
                    <ColourBoxTop color={colors[9]} />
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
