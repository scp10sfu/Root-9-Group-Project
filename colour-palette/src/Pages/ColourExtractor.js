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
import Toast from '../Components/Toast';
import NumberButton from '../Components/NumberButton';
import BackgroundColour from '../Components/BackgroundColour';
import SkeletonLoader from '../Components/SkeletonLoader';
import { defaultColor } from '../Components/SkeletonLoader';
import './ColourExtractor.css';


/**
 * ColourExtractor Component
 * @returns {JSX.Element} The rendered ColourExtractor component.
 */
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
  * @throws {Error} Invalid RGB value.
  * @returns {string} The CMYK representation of the RGB values.
  */
  const rgbToCmyk = (r, g, b) => {
    // Validate the RGB values
    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
      throw new Error('Invalid RGB value');
    }

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
   * Converts RGB values to HSL format.
   * @param {number} r - The red value (0 to 255).
   * @param {number} g - The green value (0 to 255).
   * @param {number} b - The blue value (0 to 255).
   * @returns {Array} The HSL representation of the RGB values.
   */
  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // grayscale
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return [h * 360, s * 100, l * 100];
  };



  /**
    * Extracts colors from the loaded image using ColorThief and updates the state.
    * @returns {Promise<void>} A Promise that resolves when the extraction is complete.
    */
  const extractColors = async () => {
    setIsLoadingAndExtracting(true);
    // if (imgRef.current && imgRef.current.complete) {
      try {
        console.log('Extracting colors...');
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

        localStorage.removeItem('savedBackground');
        localStorage.setItem('savedBackground', JSON.stringify(background));
        console.log('Saved background colours to local storage');

        // Determine whether the image is light or dark
        const dominantColor = colorThief.getColor(imgRef.current);
        const brightness = (dominantColor[0] * 299 + dominantColor[1] * 587 + dominantColor[2] * 114) / 1000;
        const [hue, saturation, lightness] = rgbToHsl(dominantColor[0], dominantColor[1], dominantColor[2]);
        const isLightBackground = lightness > 70 ? true : false;
        const isHighSaturation = saturation > 50 ? true : false;

        setIsLightImage(isLightBackground || isHighSaturation || brightness > 30);

      } catch (error) {
        console.error('Error extracting the colors:', error);
      }
      finally {
        // Set loading state to false after extraction is complete (whether successful or not)
        setIsLoadingAndExtracting(false);
      }
    // }
  };


  /**
  * Fetches color name from the API based on HEX code.
  * @param {string} hex - HEX color code.
  * @returns {Promise<string>} Resolves with the color name.
  */
  const fetchColorName = async (hex) => {
    try {
      const response = await axios.get(`https://www.thecolorapi.com/id?hex=${hex.replace('#', '')}`);
      return response.data.name.value || 'Unknown';
    } catch (error) {
      console.error('Error fetching the color name:', error);
      return 'Unknown'; // Fallback to HEX if the name can't be fetched
    }
  };


  /**
  * Effect hook to update the colors when numberOfColors changes.
  * @param {number} numberOfColors - Number of colors to extract.
  * @returns {function} Cleanup function.
  * @effect
  */
  useEffect(() => {
    // Check if the page is just loaded and colors are saved in localStorage
    const savedBackground = localStorage.getItem('savedBackground');
    if (savedBackground && !image) {
      setBackgroundStyle(JSON.parse(savedBackground));

    } else if (image) {
      setIsLoadingAndExtracting(true);
      extractColors();                      // Perform the API call
      setIsLoadingAndExtracting(false);     // Set loading state to false once API call is complete
    }

    // Attach event listener for beforeunload
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [numberOfColors, image]);


  // Function to handle beforeunload event
  const handleBeforeUnload = () => {
    console.log('Clearing local storage on page refresh.');
    localStorage.removeItem('savedBackground');
  };

  /**
  * Handles the change in the number of colors.
  * @param {number} number - The number of colors.
  * @returns {void}
  * @callback
  */
  const handleNumberChange = (number) => {
    setNumberOfColors(number);
    console.log('Number of colors changed to', number);
  };

  /**
   * Different file types that can be uploaded.
   * See https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
   */
  const fileTypes = [
    "image/apng",
    "image/avif",
    "image/gif",
    "image/jpeg",  // includes .jpg, .jpeg, .jfif, .pjpeg, .pjp
    "image/png",
    "image/svg+xml",
    "image/webp",
    "image/bmp",
    "image/x-icon",
    "image/tiff",
  ];

  /**
  * Checks if the file type is valid.
  * @param {object} file - The file object.
  * @returns {boolean} True if the file type is valid, false otherwise.
  */
  function validFileType(file) {
    console.log('File type is', file.type);
    return fileTypes.includes(file.type);
  }

  /**
  *  Handles file upload and sets the image URL.
  * @param {object} event - The file change event.
  * @returns {void}
  */
  const handleImageChange = (event) => {
    setIsLoadingAndExtracting(true);
    try {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];

        if (!validFileType(file)) {
          throw new Error('Invalid file type! Please upload an image');
        }

        // Check if file size exceeds the limit
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
          throw new Error(`The file exceeds the limit of ${MAX_FILE_SIZE_MB} MB`);
        }

        const reader = new FileReader();

        reader.onload = (e) => {
          setImage(e.target.result);                            // Set image URL to display it
          // localStorage.setItem('savedImage', e.target.result);  // Save image data to local storage
          setIsImagePreviewActive(false);                       // Set image preview active

          // Update the background style with saved colors from localStorage
          const savedBackground = localStorage.getItem('savedBackground');
          if (savedBackground) {
            setBackgroundStyle(JSON.parse(savedBackground));
          }
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

    // Auto-hide the toast after a certain duration (e.g., 3000 milliseconds)
    setTimeout(() => {
      setShowToast(false);
      setToastMessage(null);
    }, 3000);

    // Note: We don't need to set isLoadingAndExtracting to false here,
    // as the extraction process (extractColors function) will handle it
  };


  /**
  * Handles closing the image preview.
  * @returns {void}
  */
  const handleClosePreview = () => {
    setIsLoadingAndExtracting(false);
    setImage(null);                   // Reset the image state to close the preview
    setColors([]);                    // Clear the colors when closing the preview
    setIsImagePreviewActive(true);    // Set image preview inactive
    setNumberOfColors(6);             // Reset the number of colors to 6 (default value)
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
      setShowToast(true);
      setToastMessage('Copied to clipboard!');

      setTimeout(() => {
        setShowToast(false);
        setToastMessage(null);
      }, 1500);

      toggleCopyIcon();

      setTimeout(() => {
        toggleCopyIcon();
      }, 300);
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

  
  // Return the rendered component
  return (

    <div className="colour-extractor" style={backgroundStyle}>

      <BackgroundColour colorArray=
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} style={{ color: `var(--color${i + 1})` }}></span>
        ))}
      />


      {/* Toast message */}
      {showToast && (
        <Toast
          type={showToast.type}
          message={toastMessage}
          onClose={() => {
            setShowToast(false);
            setToastMessage('');
          }}
        />
      )}

      <Layout>

        <div className="grid-container general col-xs-justify-content-center col-md-justify-content-center">
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
                  <input type="file" accept=".apng, .avif, .gif, .jpg, .jpeg, .jfif, .pjpeg, .pjp, .png, .svg, .webp, .bmp, .ico, .cur, .tif, .tiff" onChange={handleImageChange} id="fileInput" />
                  <label htmlFor="fileInput">
                    <div className="text_block_text">
                      <UploadIcon className="upload-icon-dark" style={{ width: '40px', height: '40px' }} />
                      <div className='upload-area-text'>Click or drag file to this area to upload</div>
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
                    onClick={handleNumberChange}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Conditional rendering based on isLoadingAndExtracting state */}
          {/* The main content - right part */}
          {isLoadingAndExtracting ? (<SkeletonLoader />) : (<>
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
          </>)}

          {/* DO NOT DELETE THIS! */}
          <div className="col-xs-36 col-md-36"></div>
        </div>

      </Layout>

    </div>
  );
}

export default ColourExtractor;