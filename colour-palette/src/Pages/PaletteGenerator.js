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