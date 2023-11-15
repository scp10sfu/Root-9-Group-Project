import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PaletteGenerator.css';
function MyPaletteGenerator() {
    const [paletteSize, setPaletteSize] = useState(5); // Default size
    const [palette, setPalette] = useState([]);

    // Fetches a random color palette from the API based on the selected size.
      // Function to fetch color details (name, rgb, cmyk) for each hex color
      const getColorDetails = async (hex) => {
        const rgbResponse = await axios.get(`https://www.thecolorapi.com/id?hex=${hex}`);
        const { r, g, b } = rgbResponse.data.rgb;
        const cmyk = rgbToCmyk(r, g, b);
        return {
            hex: `#${hex}`,
            rgb: `(${r}, ${g}, ${b})`,
            cmyk: `(${cmyk.join(', ')})`,
            name: rgbResponse.data.name.value,
        };
    };
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
            const colorDetailsPromises = hexColors.map(hex => getColorDetails(hex));
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
                    <label for="user_number">choose a number</label>
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
                <button onClick={fetchRandomPalette}>Generate Palette</button>
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
export default MyPaletteGenerator;
