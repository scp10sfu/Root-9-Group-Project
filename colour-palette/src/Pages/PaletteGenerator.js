import React, { useState } from 'react';
import axios from 'axios';
import './PaletteGenerator.css';

function PaletteGenerator() {
  const [prompt, setPrompt] = useState('');
  const [numberOfColors, setNumberOfColors] = useState(8); // Default number of colors
  const [allColors, setAllColors] = useState([]); // All colors fetched from the API
  const [fullResponse, setFullResponse] = useState(''); // Full response from the API
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFullResponse(''); // Clear previous response

    try {
      const response = await axios.post('/get_palette', { prompt });
      setAllColors(response.data.colors || []); // Store all colors
      setFullResponse(response.data.fullResponse || ''); // Store the full response
    } catch (error) {
      console.error('Error:', error);
      setFullResponse('Failed to get the color palette. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleColorSelection = (num) => {
    setNumberOfColors(num); // Update the number of colors without calling API
  };

  // Get the colors to display based on the selected number
  const displayedColors = allColors.slice(0, numberOfColors);

  return (
    <div className="palette-generator">
      <h2>Ask for a Color Palette</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="prompt">
          Describe the picture you want to draw:
        </label>
        <input
          type="text"
          id="prompt"
          name="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
        <input type="submit" value="Get Palette" disabled={isLoading} />
      </form>
      {isLoading && <div className="spinner"></div>}
      <div className="color-choices">
        {[4, 6, 8, 10, 15].map((num) => (
          <button
            type="button" // Ensure the button does not submit the form
            key={num}
            className={`color-choice-button ${num === numberOfColors ? 'selected' : ''}`}
            onClick={() => handleColorSelection(num)}
          >
            {num}
          </button>
        ))}
      </div>
      <div id="palette-response">
        {fullResponse && <p className="palette-response-text">{fullResponse}</p>}
      </div>
      <div id="palette">
        <div className="color-swatches">
          {displayedColors.map((color, index) => (
            <div key={index} className="color-swatch" style={{ backgroundColor: color }}></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PaletteGenerator;
