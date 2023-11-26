/**
 * ColourExtractor component for extracting palettes from images.
 * ColourExtractor.js
 * @component
 */
import React, { useState, useRef, useEffect } from 'react';
import ColorThief from 'colorthief';
import axios from 'axios';
import { ReactComponent as UploadIcon } from '../images/icon-upload-dark.svg';
import { ReactComponent as InfoIcon } from '../images/icon-info-dark.svg';
import { ReactComponent as CloseIconWhite } from '../images/icon-close-white.svg';
import { ReactComponent as CloseIconDark } from '../images/icon-close-dark.svg';
import { ReactComponent as CopyIconWhiteUnfilled } from '../images/icon-copy-white-unfilled.svg';
import { ReactComponent as CopyIconDarkUnfilled } from '../images/icon-copy-dark-unfilled.svg';
import { ReactComponent as CopyIconWhiteFilled } from '../images/icon-copy-white-filled.svg';
import { ReactComponent as CopyIconDarkFilled } from '../images/icon-copy-dark-filled.svg';

import Layout from '../Components/Layout';
import './ColourExtractor.css';
import Toast from '../Components/Toast';

function ColourExtractor() {
  const [numberOfColors, setNumberOfColors] = useState(6);  // Number of colors to extract (6 by default)
  const [image, setImage] = useState(null);                 // Holds the image URL
  const [colors, setColors] = useState([]);                 // Stores an array of the extracted colors
  const [isImagePreviewActive, setIsImagePreviewActive] = useState(true);
  const imgRef = useRef(null);                              // Create a reference to the img tag
  const colorThief = new ColorThief();
  const [isLightImage, setIsLightImage] = useState(false);
  const [backgroundStyle, setBackgroundStyle] = useState({});
  const [isLoadingAndExtracting, setIsLoadingAndExtracting] = useState(false);  // Add loading state for image upload
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const MAX_FILE_SIZE_MB = 10;

  /**
  * Converts RGB values to HEX format.
  * @param {number} r - The red value (0 to 255).
  * @param {number} g - The green value (0 to 255).
  * @param {number} b - The blue value (0 to 255).
  * @returns {string} The HEX representation of the RGB values.
  */
  const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');

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

    return [c, m, y, k];
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
    * Extracts colors from the loaded image using ColorThief and updates the state.
    * @returns {Promise<void>} A Promise that resolves when the extraction is complete.
    */
  const extractColors = async () => {
    setIsLoadingAndExtracting(true);
    if (imgRef.current && imgRef.current.complete) {
      try {
        // NOTE: The value is set to 10, so we do not make multiple requests to the API
        const palette = colorThief.getPalette(imgRef.current, 10);
        const colorPromises = palette.map(async (rgb) => {
          const hex = rgbToHex(...rgb);
          const cmyk = rgbToCmyk(...rgb);
          const name = await fetchColorName(hex);
          return { hex, rgb: `${rgb.join(', ')}`, cmyk: `${cmyk.join(', ')}`, name };
        });
        const colorObjects = await Promise.all(colorPromises);
        setColors(colorObjects);

        // Update the background style based on the extracted colors
        const background = {};
        for (let i = 0; i < colorObjects.length; i++) {
          background[`--color${i + 1}`] = colorObjects[i]?.hex;
        }
        setBackgroundStyle(background);
        setIsLoadingAndExtracting(false);

        // Determine whether the image is light or dark
        const dominantColor = colorThief.getColor(imgRef.current);
        const brightness = (dominantColor[0] * 299 + dominantColor[1] * 587 + dominantColor[2] * 114) / 1000;
        setIsLightImage(brightness > 30);

        const [hue, saturation, lightness] = colorThief.getHSL(imgRef.current);
        const isLightBackground = lightness > 70 ? true : false;
        const isHighSaturation = saturation > 50 ? true : false;

        setIsLightImage(isLightBackground || isHighSaturation);

      } catch (error) {
        console.error('Error extracting the colors:', error);
      }
      finally {
        // Set loading state to false after extraction is complete (whether successful or not)
        setIsLoadingAndExtracting(false);
      }
    }
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
  * Effect hook to update the colors when numberOfColors changes.
  * @effect
  * @param {number} numberOfColors - Number of colors to extract.
  * @returns {function} Cleanup function.
  */
  useEffect(() => {
    if (image) {
      setIsLoadingAndExtracting(true);
      extractColors();                      // Perform the API call
      setIsLoadingAndExtracting(false);     // Set loading state to false once API call is complete
    }
  }, [numberOfColors]);


  /**
  * Handles the change in the number of colors.
  * @param {object} event - The change event.
  */
  const handleNumberChange = (number) => {
    setNumberOfColors(number);
  };


  /**
  * Handles the file upload.
  * @param {object} event - The file change event.
  */
  const handleImageChange = (event) => {
    setIsLoadingAndExtracting(true);
    try {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];

        // Check if file size exceeds the limit
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
          throw new Error(`The file exceeds the limit of ${MAX_FILE_SIZE_MB} MB`);
        }

        const reader = new FileReader();

        reader.onload = (e) => {
          setImage(e.target.result);                            // Set image URL to display it
          localStorage.setItem('savedImage', e.target.result);  // Save image data to local storage
          setIsImagePreviewActive(false);                       // Set image preview active
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error('Error handling image change:', error);

      // Reset to default values
      setIsLoadingAndExtracting(false);
      setIsImagePreviewActive(true);
      setImage('');
      setBackgroundStyle({});
      setNumberOfColors(6);

      // Display a toast message for the file size limit exceeded error
      setToastMessage(error.message);
      setShowToast(true);
    }

    // Note: We don't need to set isLoadingAndExtracting to false here,
    // as the extraction process (extractColors function) will handle it
  };


  /**
  * Handles closing the image preview.
  */
  const handleClosePreview = () => {
    setIsLoadingAndExtracting(false);
    setImage(null);                   // Reset the image state to close the preview
    setColors([]);                    // Clear the colors when closing the preview
    setIsImagePreviewActive(true);    // Set image preview inactive
    setNumberOfColors(6);             // Reset the number of colors to 6 (default value)
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
          <div key={0} className="loader-square-bottom-align" style={{ backgroundColor: firstColor.hex }}>
            <p className="color-name">{firstColor.name}</p>
            <p className="color-hex">HEX: {firstColor.hex}</p>
            <p className="color-rgb">RGB: {firstColor.rgb}</p>
            <p className="color-cmyk">CMYK: {firstColor.cmyk}</p>
          </div>
        </div>
        {/* Second dominant colour */}
        <div className="wrapper-2-col secondary-section col-xs-36 col-md-18">
          <div key={1} className="loader-square-bottom-align" style={{ backgroundColor: secondColor.hex }}>
            <p className="color-name">{secondColor.name}</p>
            <p className="color-hex">HEX: {secondColor.hex}</p>
            <p className="color-rgb">RGB: {secondColor.rgb}</p>
            <p className="color-cmyk">CMYK: {secondColor.cmyk}</p>
          </div>
        </div>

        <div className="wrapper-4-col secondary-section col-xs-36 col-md-9">
          <div key={2} className="loader-square-top-align" style={{ backgroundColor: thirdColor.hex }}>
            <p className="color-name">{thirdColor.name}</p>
            <p className="color-hex">HEX: {thirdColor.hex}</p>
            <p className="color-rgb">RGB: {thirdColor.rgb}</p>
            <p className="color-cmyk">CMYK: {thirdColor.cmyk}</p>
          </div>
        </div>
        <div className="wrapper-4-col secondary-section col-xs-36 col-md-9">
          <div key={3} className="loader-square-top-align" style={{ backgroundColor: fourthColor.hex }}>
            <p className="color-name">{fourthColor.name}</p>
            <p className="color-hex">HEX: {fourthColor.hex}</p>
            <p className="color-rgb">RGB: {fourthColor.rgb}</p>
            <p className="color-cmyk">CMYK: {fourthColor.cmyk}</p>
          </div>
        </div>
        <div className="wrapper-4-col secondary-section col-xs-36 col-md-9">
          <div key={4} className="loader-square-top-align" style={{ backgroundColor: fifthColor.hex }}>
            <p className="color-name">{fifthColor.name}</p>
            <p className="color-hex">HEX: {fifthColor.hex}</p>
            <p className="color-rgb">RGB: {fifthColor.rgb}</p>
            <p className="color-cmyk">CMYK: {fifthColor.cmyk}</p>
          </div>
        </div>
        <div className="wrapper-4-col secondary-section col-xs-36 col-md-9">
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


  return (

    <div className="colour-extractor" style={backgroundStyle}>

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
              <header className="text_block_text">Colour Extractor</header>
            </div>
            <div className="col-xs-36 col-md-25">
              <header className="text_block_subtext">Extract wonderful palettes from your image.
              </header>
            </div>

            {isImagePreviewActive && (

              <div className="upload-container col-xs-36 col-md-25">
                <div className="upload-area">
                  <input type="file" accept="image/*" onChange={handleImageChange} id="fileInput" />
                  <label htmlFor="fileInput">
                    <div className="text_block_text">
                      <UploadIcon className="upload-icon-dark" style={{ width: '40px', height: '40px' }} />
                      <div className='text'>Click or drag file to this area to upload</div>
                    </div>
                    <div className="subtext">
                      <InfoIcon className="info-icon-dark" style={{ width: '21px', height: '21px' }} />  Max file size: {MAX_FILE_SIZE_MB} MB
                    </div>
                  </label>
                </div>
              </div>
            )}

            {image && (
              <>
                <div className="col-xs-36 col-md-25" onClick={(e) => e.stopPropagation()}>
                  <div className="image-preview">
                    <button className="close-button" onClick={handleClosePreview}>
                      {isLightImage ? <CloseIconWhite /> : <CloseIconDark />}
                    </button>

                    <img
                      ref={imgRef}
                      src={image}
                      alt="To extract colors from"
                      crossOrigin="anonymous"
                      onLoad={extractColors}
                    />
                  </div>
                </div>
              </>
            )}

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

          {/* Conditional rendering based on isLoadingAndExtracting state */}
          {/* The main content - right part */}
          {isLoadingAndExtracting ? (<SkeletonLoader />)
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
            </>)}

          {/* DO NOT DELETE THIS! */}
          <div className="footer col-xs-36 col-md-36"></div>
        </div>

      </Layout>

    </div>
  );
}

export default ColourExtractor;