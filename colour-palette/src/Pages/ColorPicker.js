/**
 * ColorPicker component for extracting palettes from images.
 * ColorPicker.js
 * @component
 */
import React, { useState, useRef } from 'react';
import ColorThief from 'colorthief';
import axios from 'axios';
import { ReactComponent as UploadIcon } from '../images/icon-upload.svg';
// import ColorSwitcher from '../Components/ColorSwitcher'; 
// import { ColorContext } from '../App';
// TODO: add theme switcher to nav bar component
// TODO: add SVG icons
// const debounce = (fn, delay) => {
//   let timeoutId;
//   return function(...args) {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => fn(...args), delay);
//   };
// };
function ColorPicker() {
  const [numberOfColors, setNumberOfColors] = useState(10);  // Number of colors to extract (5 by default)
  // const { darkTheme, toggleTheme } = useContext(ColorContext);
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
  * Extracts colors from the loaded image using ColorThief and updates the state.
  * @returns {Promise<void>} A Promise that resolves when the extraction is complete.
  */
   const extractColors = async () => {
    if (imgRef.current && imgRef.current.complete) {
      try {
        // Use the state 'numberOfColors' to determine how many colors to get from the image
        const palette = colorThief.getPalette(imgRef.current, numberOfColors);
        const colorPromises = palette.map(async (rgb) => {
          const hex = rgbToHex(...rgb);
          const cmyk = rgbToCmyk(...rgb);
          const name = await fetchColorName(hex);
          return { hex, rgb: `rgb(${rgb.join(', ')})`, cmyk: `cmyk(${cmyk.join(', ')})`, name };
        });
        const colorObjects = await Promise.all(colorPromises);
        setColors(colorObjects); // Updates the color palette display
        
        // Update the background style based on the extracted colors
        setBackgroundStyle({
          '--color1': colorObjects[0]?.hex,
          '--color2': colorObjects[1]?.hex,
          '--color3': colorObjects[2]?.hex,
          '--color4': colorObjects[3]?.hex,
          '--color5': colorObjects[4]?.hex,
          '--color6': colorObjects[5]?.hex,
          '--color7': colorObjects[6]?.hex,
          '--color8': colorObjects[7]?.hex,
          '--color9': colorObjects[8]?.hex,
          '--color10': colorObjects[9]?.hex,
          '--color11': colorObjects[10]?.hex,
          // ... add more if you're extracting more than 8 colors
        });
      } catch (error) {
        console.error('Error extracting the colors:', error);
      }
    }
  };
  // // Create a debounced version of extractColors
  // const debouncedExtractColors = debounce(async () => {
  //   if (imgRef.current && imgRef.current.complete) {
  //     try {
  //       const palette = colorThief.getPalette(imgRef.current, numberOfColors);
  //       const colorPromises = palette.map(async (rgb) => {
  //         const hex = rgbToHex(...rgb);
  //         const cmyk = rgbToCmyk(...rgb);
  //         const name = await fetchColorName(hex);
  //         return { hex, rgb: `rgb(${rgb.join(', ')})`, cmyk: `cmyk(${cmyk.join(', ')})`, name };
  //       });
  //       const colorObjects = await Promise.all(colorPromises);
  //       setColors(colorObjects); // Updates the color palette display

  //       // Update the background style based on the extracted colors
  //       setBackgroundStyle({
  //         '--color1': colorObjects[0]?.hex,
  //         '--color2': colorObjects[1]?.hex,
  //         '--color3': colorObjects[2]?.hex,
  //         '--color4': colorObjects[3]?.hex,
  //         '--color5': colorObjects[4]?.hex,
  //         '--color6': colorObjects[5]?.hex,
  //         '--color7': colorObjects[6]?.hex,
  //         '--color8': colorObjects[7]?.hex,
  //         '--color9': colorObjects[8]?.hex,
  //         '--color10': colorObjects[9]?.hex,
  //         '--color11': colorObjects[10]?.hex,
  //         // ... add more if you're extracting more than 8 colors
  //       });
  //     } catch (error) {
  //       console.error('Error extracting the colors:', error);
  //     }
  //   }
  // }, 500); // 500ms delay
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
    // const savedImage = localStorage.getItem('savedImage');
    // const savedColors = JSON.parse(localStorage.getItem('extractedColors') || '[]');
    
    // if (savedImage) {
    //   setImage(savedImage);
    //   setIsImagePreviewActive(false);
    // }
    
    // if (savedColors.length > 0) {
    //   setColors(savedColors);
    // }
    
    // if (savedColors.length > 0) {
    // setColors(savedColors);
    // }

    //  // Load the saved number of colors
    // const savedNumberOfColors = localStorage.getItem('savedNumberOfColors');
    // if (savedNumberOfColors) {
    // setNumberOfColors(parseInt(savedNumberOfColors, 10));
    // }
    // Hold the current value of imgRef.current
    const currentImgRef = imgRef.current;
    if (image) { // Check if there is an image uploaded
      extractColors(); // This will extract colors again when 'numberOfColors' changes
    }
    if (currentImgRef && currentImgRef.complete) {
      extractColors();
    }
    if (imgRef.current && imgRef.current.complete) {
      extractColors();
    }
    // Clean up the event listener if it was added
    return () => {
      if (imgRef.current) {
        imgRef.current.removeEventListener('load', extractColors);
      }
    };
    // This function will be called to clean up when the component is unmounted or before the effect runs again
  }, [numberOfColors]);

  /**
  * Handles the change in the number of colors.
  * @param {object} event - The change event.
  */
   const handleNumberChange = (number) => {
    setNumberOfColors(number);
    extractColors(); // Update the state
    //debouncedExtractColors();  // Call the debounced version of extractColors
  };
  
  

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
  /** 
   * function to change rgb to cmyk
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


  const NumberButton = ({ number, isActive }) => (
    <button
      className={`number-button ${isActive ? 'active' : ''}`}
      onClick={() => handleNumberChange(number)}
    >
      {number}
    </button>
  );
  
  
  

  return (
    
    <div className="ColorPicker" style={backgroundStyle}>
      {/* <ColorSwitcher /> */}
      {/* Animated background */}
    {/* Animated background */}
    <div className="background">
      {Array.from({ length: 20 }, (_, i) => (
        <span key={i} style={{ color: `var(--color${i + 1})` }}></span>
      ))}
    </div>
      <main className="app-content">
        {/* Left column */}
        <section className="content-block">

          <header className="text_block">
            <h1>Color Extractor</h1>
            <p>Extract wonderful palettes from your image.</p>
          </header>

          {isImagePreviewActive && (
            <section className="upload-area">
              <input type="file" accept="image/*" onChange={handleImageChange} id="fileInput" />
              <label htmlFor="fileInput">
                <header className="text_block">
                  <div className="text_block_text">
                    <UploadIcon className="upload-icon" style={{ width: '30px', height: '30px' }} />
                    <p>Click or drag image to upload</p>
                  </div>
                  <div className="text_block_subtext">
                    <i className="info-icon">i</i> Max file size: XX MB
                  </div>
                </header>
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

<section className="color-controls">
  <p className="number-of-colors-label">The number of plate</p>
  {[4, 6, 8, 10].map((number) => (
    <NumberButton
      key={number}
      number={number}
      isActive={numberOfColors === number}
      setNumberOfColors={setNumberOfColors}
    />
  ))}
    </section>
        </section>

        {/* Right column */}
       <section className={`color-palette ${colors.length === 2 ? 'two-colors' : colors.length === 8 ? 'eight-colors' : ''}`}>
       {colors.map((colorObj, index) => (
  <div key={index} className="color" style={{ backgroundColor: colorObj.hex }}>
    <p className="color-name">{colorObj.name}</p>
    <p className="color-hex">HEX: {colorObj.hex}</p>
    <p className="color-rgb">RGB: {colorObj.rgb}</p>
    <p className="color-cmyk">CMYK: {colorObj.cmyk}</p>
  </div>
))}

</section>
      
      </main>
    </div>
  );
}

export default ColorPicker;