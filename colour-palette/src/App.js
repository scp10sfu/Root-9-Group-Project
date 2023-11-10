import React, { useState, useRef } from 'react';
import ColorThief from 'colorthief';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [colors, setColors] = useState([]);
  const [numberOfColors, setNumberOfColors] = useState(5);
  const imgRef = useRef(null); // Create a reference to the img tag
  const colorThief = new ColorThief();

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        setImage(e.target.result); // Set image URL to display it
        // Once the image is loaded, the onLoad event on the img element will trigger color extraction
      };

      reader.readAsDataURL(file);
    }
  };
  const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
  
  const extractColors = () => {
    if (imgRef.current && imgRef.current.complete) {
      // Ensure the image is loaded and complete
      try {
        const result = colorThief.getPalette(imgRef.current, numberOfColors);
        // Convert the RGB values to HEX and update the state
        setColors(result.map(rgb => rgbToHex(...rgb)));
      } catch (error) {
        console.error('Error extracting the colors:', error);
      }
    }
  };

  const handleNumberChange = (event) => {
    setNumberOfColors(event.target.value);
    // Trigger re-extraction of colors if the image is already loaded
    if (imgRef.current && imgRef.current.complete) {
      extractColors();
    }
  };

 

  return (
    <div className="App">
      <header className="App-header">
        <h1>Color Picker</h1>
        <p>Extract wonderful palettes from your image.</p>
      </header>
      <main>
        <section className="upload-area">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <p>Click or drag file to this area to upload</p>
        </section>
        {image && (
          // Render the image off-screen to extract the colors
          <img
            ref={imgRef}
            src={image}
            alt="To extract colors from"
            crossOrigin="anonymous" // This is important for CORS if you're loading images from an external URL
            onLoad={extractColors} // Once the image is loaded, extract the colors
            style={{ display: 'none' }} // Hide the image element
          />
        )}
        <section className="color-controls">
          <input
            type="range"
            min="1"
            max="10"
            value={numberOfColors}
            onChange={handleNumberChange}
          />
          <p>Number of colors: {numberOfColors}</p>
        </section>
        <aside className="color-palette">
          {colors.map((color, index) => (
            <div key={index} className="color" style={{ backgroundColor: color }}>
              <p>{color}</p>
            </div>
          ))}
        </aside>
      </main>
    </div>
  );
}

export default App;
