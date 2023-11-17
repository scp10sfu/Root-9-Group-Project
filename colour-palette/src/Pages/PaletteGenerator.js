import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PaletteGenerator.css';
// import '../Components/Button.css';
// import Layout from '../Components/Layout';

function PaletteGenerator() {
    const [paletteSize, setPaletteSize] = useState(5); // Default size
    const [palette, setPalette] = useState([]);

    /**
    * Fetches color name from the API based on HEX code.
    * @param {string} hex - HEX color code.
    * @returns {Promise<string>} Resolves with the color details (name, rgb, cmyk).
    */
    const fetchColorDetails = async (hex) => {
        const response = await axios.get(`https://www.thecolorapi.com/id?hex=${hex}`);
        const { r, g, b } = response.data.rgb;
        const cmyk = rgbToCmyk(r, g, b);
        return {
            hex: `#${hex}`,
            rgb: `(${r}, ${g}, ${b})`,
            cmyk: `(${cmyk.join(', ')})`,
            name: response.data.name.value,
        };
    };

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

    // Function to fetch random color palette
    const fetchRandomPalette = async () => {
        try {
            const response = await axios.get(`https://www.colr.org/json/colors/random/${paletteSize}`);
            const hexColors = response.data.colors.map(color => color.hex);
            const colorDetailsPromises = hexColors.map(hex => fetchColorDetails(hex));
            const colorDetails = await Promise.all(colorDetailsPromises); // This defines colorDetails
            localStorage.setItem('colorPalette', JSON.stringify(colorDetails)); // Save to local storage
            setPalette(colorDetails);
        } catch (error) {
            console.error('Error fetching color palette:', error);
            setPalette([]);
        }
    };

    useEffect(() => {
        const savedPalette = JSON.parse(localStorage.getItem('colorPalette') || '[]');
        if (savedPalette.length > 0) {
            setPalette(savedPalette);
        }
    }, []);
    // Handles the change in the number of colors selected by the user
    const handlePaletteSizeChange = (event) => {
        setPaletteSize(event.target.value);
    };

    return (
        <div className="PaletteGenerator">
            <div className="palette-controls">
                <label htmlFor="paletteSize">Select palette size (4-10): </label>
                {/* <input
                    id="paletteSize"
                    type="number"
                    min="4"
                    max="10"
                    value={paletteSize}
                    onChange={handlePaletteSizeChange}
                /> */}
                <form action="#" class="my-number-color">

                    <div popup id="testtest">
                        <select name="number" id="num" value={paletteSize} onChange={handlePaletteSizeChange}>
                            <option value="select">Select a number</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                </form>

                <button onClick={fetchRandomPalette}></button>


            </div>
            <div className="palette-display">
                {palette.length > 0 ? (
                    palette.map((color, index) => (
                        <div key={index} className="color-detail" style={{ backgroundColor: color.hex }}>
                            <div className="color-info">
                                <p>{color.name}</p>
                                <p>HEX: {color.hex}</p>
                                <p>RGB: {color.rgb}</p>
                                <p>CMYK: {color.cmyk}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No palette generated yet. Use the controls above to generate one.</p>
                )}
            </div>
        </div>
    );
}
export default PaletteGenerator;
