import React, { useState, useRef } from 'react';
import ColorThief from 'colorthief';
import { ReactComponent as UploadIcon } from './images/icon-upload.svg';
import './App.css';

function App() {
  const [image, setImage] = useState(null); // Holds the image URL
  const [colors, setColors] = useState([]); // Stores an array of the extracted colors
  const [numberOfColors, setNumberOfColors] = useState(5);  // Number of colors to extract (5 by default)
  const [isImagePreviewActive, setIsImagePreviewActive] = useState(true);
  const imgRef = useRef(null); // Create a reference to the img tag
  const colorThief = new ColorThief(); 
  // const [loading, setLoading] = useState(false); // Loading state

  const [darkTheme, setDarkTheme] = useState(false); // Stores the current theme
  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  } ;

  // Handle the file upload
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        setImage(e.target.result); // Set image URL to display it
        setIsImagePreviewActive(false); // Set image preview active
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle closing the image preview
  const handleClosePreview = () => {
    setImage(null); // Reset the image state to close the preview
    setColors([]); // Clear the colors when closing the preview
    setIsImagePreviewActive(true); // Set image preview inactive
  };

  // Convert RGB values to HEX format
  const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
  

// Extract colors from the loaded image using ColorThief, and update the state
const extractColors = () => {
  // Ensure the image is loaded and complete
  if (imgRef.current && imgRef.current.complete) {
    try {
      const result = colorThief.getPalette(imgRef.current, numberOfColors, 10);
      setColors(result.map(rgb => rgbToHex(...rgb)));
    } catch (error) {
      console.error('Error extracting the colors:', error);
    }
  }
};

// useEffect hook to update the colors when numberOfColors changes
React.useEffect(() => {
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

const handleNumberChange = (event) => {
  const newNumberOfColors = parseInt(event.target.value, 10);
  setNumberOfColors(newNumberOfColors);
};


  // Render the app
  return (
    <div className="App" data-theme={darkTheme ? 'dark' : 'light'}>
      {/* Theme switcher button */}
      <div className="theme-switcher">
        <button onClick={toggleTheme}>
          {darkTheme ? 'Switch to Light' : 'Switch to Dark'}
        </button>
      </div>

      <main className="app-content">
        {/* Left column */}
        <section className="content-block">

        <header className="text_block">
        <h1>Color Picker</h1>
        <p>Extract wonderful palettes from your image.</p>
        </header>

            {isImagePreviewActive && (
            <section className="upload-area">
              <input type="file" accept="image/*" onChange={handleImageChange} id="fileInput" />
              <label htmlFor="fileInput">
              <header className="text_block">
                <div className="text_block_text">
                <UploadIcon className="upload-icon" style={{ width: '30px', height: '30px' }} />
                  <p>Click or drag file to this area to upload</p>
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
              <input
                type="range"
                min="2" 
                max="10"
                value={numberOfColors}
                onChange={handleNumberChange}
              />
              <p>Number of colors: {numberOfColors}</p>
            </section>
          {/* </div> */}
        </section>
        
        {/* Right column */}
        <section className="color-palette">
          {colors.map((color, index) => (
          <div key={index} className="color" style={{ backgroundColor: color }}>
            <p>{color}</p>
          </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;

