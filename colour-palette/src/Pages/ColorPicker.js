/**
 * ColorPicker component for extracting palettes from images.
 * ColorPicker.js
 * @component
 */
import React, { useState, useRef } from 'react';
import ColorThief from 'colorthief';
import axios from 'axios';
import { ReactComponent as UploadIcon } from '../images/icon-upload-dark.svg';
import { ReactComponent as InfoIcon } from '../images/icon-info-dark.svg';
import Layout from '../Components/Layout';
import './ColorPicker.css';

function ColorPicker() {
  const [numberOfColors, setNumberOfColors] = useState(6);  // Number of colors to extract (5 by default)
  const [image, setImage] = useState(null);                 // Holds the image URL
  const [colors, setColors] = useState([]);                 // Stores an array of the extracted colors
  const [isImagePreviewActive, setIsImagePreviewActive] = useState(true);
  const imgRef = useRef(null);                              // Create a reference to the img tag
  const colorThief = new ColorThief();
  const [backgroundStyle, setBackgroundStyle] = useState({});

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
    * Extracts colors from the loaded image using ColorThief and updates the state.
    * @returns {Promise<void>} A Promise that resolves when the extraction is complete.
    */
  const extractColors = async () => {
    if (imgRef.current && imgRef.current.complete) {
      try {
        const palette = colorThief.getPalette(imgRef.current, numberOfColors);
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
      } catch (error) {
        console.error('Error extracting the colors:', error);
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
  React.useEffect(() => {
    // Hold the current value of imgRef.current
    const currentImgRef = imgRef.current;
    if (image) {
      extractColors();
    }
    if (currentImgRef && currentImgRef.complete) {
      extractColors();
    }
    if (imgRef.current && imgRef.current.complete) {
      extractColors();
    }
    // This function will be called to clean up when the component is unmounted or before the effect runs again
    return () => {
      // Clean up the event listener if it was added
      if (imgRef.current) {
        imgRef.current.removeEventListener('load', extractColors);
      }
    };
  }, [numberOfColors]);


  /**
  * Handles the change in the number of colors.
  * @param {object} event - The change event.
  */
  const handleNumberChange = (number) => {
    setNumberOfColors(number);
    extractColors();
  };
  // const handleNumberChange = (event) => {
  //   const newNumberOfColors = parseInt(event.target.value, 10);
  //   setNumberOfColors(newNumberOfColors);
  //   localStorage.setItem('savedNumberOfColors', newNumberOfColors); // Save number of colors to local storage
  // };

  /**
  * Handles the file upload.
  * @param {object} event - The file change event.
  */
  // When setting the image after upload
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        setImage(e.target.result); // Set image URL to display it
        localStorage.setItem('savedImage', e.target.result); // Save image data to local storage
        setIsImagePreviewActive(false); // Set image preview active
      };
      reader.readAsDataURL(file);
    }
  };

  /**
  * Handles closing the image preview.
  */
  const handleClosePreview = () => {
    setImage(null); // Reset the image state to close the preview
    setColors([]); // Clear the colors when closing the preview
    setIsImagePreviewActive(true); // Set image preview inactive
  };

  const NumberButton = ({ number, isActive }) => (
    <button
      className={`number-button ${isActive ? 'active' : ''}`}
      onClick={() => handleNumberChange(number)}
    >
      {number}
    </button>
  );

  // TODO: create a default colour with full parameters to assign it to or return an error
  const firstColor = colors.length > 0 ? colors[0] : "#000000";
  const secondColor = colors.length > 0 ? colors[1] : "#000000";
  const thirdColor = colors.length > 0 ? colors[2] : "#000000";
  const fourthColor = colors.length > 0 ? colors[3] : "#000000";
  const fifthColor = colors.length > 0 ? colors[4] : "#000000";
  const sixthColor = colors.length > 0 ? colors[5] : "#000000";
  const seventhColor = colors.length > 0 ? colors[6] : "#000000";
  const eighthColor = colors.length > 0 ? colors[7] : "#000000";
  const ninthColor = colors.length > 0 ? colors[8] : "#000000";
  const tenthColor = colors.length > 0 ? colors[9] : "#000000";

  return (

    <div className="ColorPicker" style={backgroundStyle}>
      <div className="background">
        {Array.from({ length: 20 }, (_, i) => (
          <span key={i} style={{ color: `var(--color${i + 1})` }}></span>
        ))}
      </div>
      <Layout>
        {/* <NavigationBar /> */}
        <div class="grid-container general">
          {/* The nav bar */}
          <div class="logo col-xs-6 col-md-6">Paletä</div>
          <div class="header col-xs-30 col-md-30"></div>

          {/* The main content - left part */}
          <div class="main-section col-xs-36 col-md-12 grid-container nested-grid">

            {/* <div class="col-xs-36 col-md-24 grid-container secondary-nested-grid"> */}
            {/* <div class="col-xs-36 col-md-25 secondary-nested-grid"> */}

            <div class="col-xs-36 col-md-25">
              <header className="text_block_text">Color Extractor
              </header>
            </div>   {/* Title */}
            <div class="col-xs-36 col-md-25">
              <header className="text_block_subtext">Extract wonderful palettes from your image.
              </header>
            </div>   {/* Extra information */}
            {/* <div class="col-xs-36 col-md-25">Upload image:</div>  Upload image */}
            {/* Upload image */}
            <div class="col-xs-36 col-md-25">{isImagePreviewActive && (
              <section className="upload-area">
                <input type="file" accept="image/*" onChange={handleImageChange} id="fileInput" />
                <label htmlFor="fileInput">
                  {/* <header className="text_block"> */}
                  <div className="text_block_text">
                    <UploadIcon className="upload-icon-dark" style={{ width: '40px', height: '40px' }} />
                    <div className='text'>Click or drag file to this area to upload</div>
                  </div>
                  <div className="subtext">
                    <InfoIcon className="info-icon-dark" style={{ width: '21px', height: '21px' }} />  Max file size: XX MB
                  </div>
                  {/* </header> */}
                </label>
              </section>
            )}
              {image && (
                <div className="image-preview">
                  <button className="close-button" onClick={handleClosePreview}>
                    <span>&times;</span>
                  </button>

                  <img
                    ref={imgRef}
                    src={image}
                    alt="To extract colors from"
                    crossOrigin="anonymous"
                    onLoad={extractColors}
                  />
                </div>
              )}

            </div>

            <div class="col-xs-36 col-md-25">
              <section className="color-controls">
              <div className="number-of-colors-label">The number of colours</div>
              {[4, 6, 8, 10].map((number) => (
                <NumberButton
                  key={number}
                  number={number}
                  isActive={numberOfColors === number}
                />
              ))}
            </section>

            </div>  
          </div>


          {/* The main content - right part: DOMINANT COLOURS */}
          <div class="wrapper-2-col secondary-section col-xs-36 col-md-24 grid-container nested-grid">
            {/* First dominant colour */}
            <div class="col-xs-36 col-md-18">
              <div key={0} className="color" style={{ backgroundColor: firstColor.hex }}>
                <p className="color-name">{firstColor.name}</p>
                <p className="color-hex">HEX: {firstColor.hex}</p>
                <p className="color-rgb">RGB: {firstColor.rgb}</p>
                <p className="color-cmyk">CMYK: {firstColor.cmyk}</p>
              </div>
            </div>
            {/* Second dominant colour */}
            <div class="col-xs-36 col-md-18"><div key={1} className="color" style={{ backgroundColor: secondColor.hex }}>
              <p className="color-name">{secondColor.name}</p>
              <p className="color-hex">HEX: {secondColor.hex}</p>
              <p className="color-rgb">RGB: {secondColor.rgb}</p>
              <p className="color-cmyk">CMYK: {secondColor.cmyk}</p>
            </div></div>
          </div>

          {/* 4 colours */}
          {numberOfColors === 4 &&
            <div class="wrapper-4-col secondary-section col-xs-36 col-md-24 grid-container nested-grid">
              <div class="col-xs-36 col-md-18">
                <div key={2} className="color" style={{ backgroundColor: thirdColor.hex }}>
                  <p className="color-name">{thirdColor.name}</p>
                  <p className="color-hex">HEX: {thirdColor.hex}</p>
                  <p className="color-rgb">RGB: {thirdColor.rgb}</p>
                  <p className="color-cmyk">CMYK: {thirdColor.cmyk}</p>
                </div>
              </div>
              <div class="col-xs-36 col-md-18">
                <div key={3} className="color" style={{ backgroundColor: fourthColor.hex }}>
                  <p className="color-name">{fourthColor.name}</p>
                  <p className="color-hex">HEX: {fourthColor.hex}</p>
                  <p className="color-rgb">RGB: {fourthColor.rgb}</p>
                  <p className="color-cmyk">CMYK: {fourthColor.cmyk}</p>
                </div>
              </div>
            </div>}

          {/* 6 colours */}
          {numberOfColors === 6 &&
            <div class="wrapper-4-col secondary-section col-xs-36 col-md-24 grid-container nested-grid">
              <div class="col-xs-36 col-md-9">
                <div key={2} className="color" style={{ backgroundColor: thirdColor.hex }}>
                  <p className="color-name">{thirdColor.name}</p>
                  <p className="color-hex">HEX: {thirdColor.hex}</p>
                  <p className="color-rgb">RGB: {thirdColor.rgb}</p>
                  <p className="color-cmyk">CMYK: {thirdColor.cmyk}</p>
                </div>
              </div>
              <div class="col-xs-36 col-md-9">
                <div key={3} className="color" style={{ backgroundColor: fourthColor.hex }}>
                  <p className="color-name">{fourthColor.name}</p>
                  <p className="color-hex">HEX: {fourthColor.hex}</p>
                  <p className="color-rgb">RGB: {fourthColor.rgb}</p>
                  <p className="color-cmyk">CMYK: {fourthColor.cmyk}</p>
                </div>
              </div>
              <div class="col-xs-36 col-md-9">
                <div key={4} className="color" style={{ backgroundColor: fifthColor.hex }}>
                  <p className="color-name">{fifthColor.name}</p>
                  <p className="color-hex">HEX: {fifthColor.hex}</p>
                  <p className="color-rgb">RGB: {fifthColor.rgb}</p>
                  <p className="color-cmyk">CMYK: {fifthColor.cmyk}</p>
                </div>
              </div>
              <div class="col-xs-36 col-md-9">
                <div key={5} className="color" style={{ backgroundColor: sixthColor.hex }}>
                  <p className="color-name">{sixthColor.name}</p>
                  <p className="color-hex">HEX: {sixthColor.hex}</p>
                  <p className="color-rgb">RGB: {sixthColor.rgb}</p>
                  <p className="color-cmyk">CMYK: {sixthColor.cmyk}</p>
                </div>
              </div>
            </div>}

          {/* 8 colours */}
          {numberOfColors === 8 &&
            <div class="wrapper-4-col secondary-section col-xs-36 col-md-24 grid-container nested-grid">
              <div class="col-xs-36 col-md-6">
                <div key={2} className="color" style={{ backgroundColor: thirdColor.hex }}>
                  <p className="color-name">{thirdColor.name}</p>
                  <p className="color-hex">HEX: {thirdColor.hex}</p>
                  <p className="color-rgb">RGB: {thirdColor.rgb}</p>
                  <p className="color-cmyk">CMYK: {thirdColor.cmyk}</p>
                </div>
              </div>
              <div class="col-xs-36 col-md-6">
                <div key={3} className="color" style={{ backgroundColor: fourthColor.hex }}>
                  <p className="color-name">{fourthColor.name}</p>
                  <p className="color-hex">HEX: {fourthColor.hex}</p>
                  <p className="color-rgb">RGB: {fourthColor.rgb}</p>
                  <p className="color-cmyk">CMYK: {fourthColor.cmyk}</p>
                </div>
              </div>
              <div class="col-xs-36 col-md-6">
                <div key={4} className="color" style={{ backgroundColor: fifthColor.hex }}>
                  <p className="color-name">{fifthColor.name}</p>
                  <p className="color-hex">HEX: {fifthColor.hex}</p>
                  <p className="color-rgb">RGB: {fifthColor.rgb}</p>
                  <p className="color-cmyk">CMYK: {fifthColor.cmyk}</p>
                </div>
              </div>
              <div class="col-xs-36 col-md-6">
                <div key={5} className="color" style={{ backgroundColor: sixthColor.hex }}>
                  <p className="color-name">{sixthColor.name}</p>
                  <p className="color-hex">HEX: {sixthColor.hex}</p>
                  <p className="color-rgb">RGB: {sixthColor.rgb}</p>
                  <p className="color-cmyk">CMYK: {sixthColor.cmyk}</p>
                </div>
              </div>
              <div class="col-xs-36 col-md-6">
                <div key={6} className="color" style={{ backgroundColor: seventhColor.hex }}>
                  <p className="color-name">{seventhColor.name}</p>
                  <p className="color-hex">HEX: {seventhColor.hex}</p>
                  <p className="color-rgb">RGB: {seventhColor.rgb}</p>
                  <p className="color-cmyk">CMYK: {seventhColor.cmyk}</p>
                </div>
              </div>
              <div class="col-xs-36 col-md-6">
                <div key={7} className="color" style={{ backgroundColor: eighthColor.hex }}>
                  <p className="color-name">{eighthColor.name}</p>
                  <p className="color-hex">HEX: {eighthColor.hex}</p>
                  <p className="color-rgb">RGB: {eighthColor.rgb}</p>
                  <p className="color-cmyk">CMYK: {eighthColor.cmyk}</p>
                </div>
              </div>
            </div>}

          {/* 10 colours */}
          {numberOfColors === 10 &&
            <div class="wrapper-4-col secondary-section col-xs-36 col-md-24 grid-container nested-grid">
              <div class="col-xs-36 col-md-9">
                <div key={2} className="color" style={{ backgroundColor: thirdColor.hex }}>
                  <p className="color-name">{thirdColor.name}</p>
                  <p className="color-hex">HEX: {thirdColor.hex}</p>
                  <p className="color-rgb">RGB: {thirdColor.rgb}</p>
                  <p className="color-cmyk">CMYK: {thirdColor.cmyk}</p>
                </div>
              </div>
              <div class="col-xs-36 col-md-9">
                <div key={3} className="color" style={{ backgroundColor: fourthColor.hex }}>
                  <p className="color-name">{fourthColor.name}</p>
                  <p className="color-hex">HEX: {fourthColor.hex}</p>
                  <p className="color-rgb">RGB: {fourthColor.rgb}</p>
                  <p className="color-cmyk">CMYK: {fourthColor.cmyk}</p>
                </div>
              </div>
              <div class="col-xs-36 col-md-9">
                <div key={4} className="color" style={{ backgroundColor: fifthColor.hex }}>
                  <p className="color-name">{fifthColor.name}</p>
                  <p className="color-hex">HEX: {fifthColor.hex}</p>
                  <p className="color-rgb">RGB: {fifthColor.rgb}</p>
                  <p className="color-cmyk">CMYK: {fifthColor.cmyk}</p>
                </div>
              </div>
              <div class="col-xs-36 col-md-9">
                <div key={5} className="color" style={{ backgroundColor: sixthColor.hex }}>
                  <p className="color-name">{sixthColor.name}</p>
                  <p className="color-hex">HEX: {sixthColor.hex}</p>
                  <p className="color-rgb">RGB: {sixthColor.rgb}</p>
                  <p className="color-cmyk">CMYK: {sixthColor.cmyk}</p>
                </div>
              </div>
              <div class="col-xs-36 col-md-9">
                <div key={6} className="color" style={{ backgroundColor: seventhColor.hex }}>
                  <p className="color-name">{seventhColor.name}</p>
                  <p className="color-hex">HEX: {seventhColor.hex}</p>
                  <p className="color-rgb">RGB: {seventhColor.rgb}</p>
                  <p className="color-cmyk">CMYK: {seventhColor.cmyk}</p>
                </div>
              </div>
              <div class="col-xs-36 col-md-9">
                <div key={7} className="color" style={{ backgroundColor: eighthColor.hex }}>
                  <p className="color-name">{eighthColor.name}</p>
                  <p className="color-hex">HEX: {eighthColor.hex}</p>
                  <p className="color-rgb">RGB: {eighthColor.rgb}</p>
                  <p className="color-cmyk">CMYK: {eighthColor.cmyk}</p>
                </div>
              </div>
              <div class="col-xs-36 col-md-9">
                <div key={8} className="color" style={{ backgroundColor: ninthColor.hex }}>
                  <p className="color-name">{ninthColor.name}</p>
                  <p className="color-hex">HEX: {ninthColor.hex}</p>
                  <p className="color-rgb">RGB: {ninthColor.rgb}</p>
                  <p className="color-cmyk">CMYK: {ninthColor.cmyk}</p>
                </div>
              </div>
              <div class="col-xs-36 col-md-9">
                <div key={9} className="color" style={{ backgroundColor: tenthColor.hex }}>
                  <p className="color-name">{tenthColor.name}</p>
                  <p className="color-hex">HEX: {tenthColor.hex}</p>
                  <p className="color-rgb">RGB: {tenthColor.rgb}</p>
                  <p className="color-cmyk">CMYK: {tenthColor.cmyk}</p>
                </div>
              </div>
            </div>}
        </div>
      </Layout>
    </div>

  );
}

export default ColorPicker;