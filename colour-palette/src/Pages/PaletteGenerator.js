/**
 * PaletteGenerator component for generating random palettes.
 * PaletteGenerator.js
 * @component
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PaletteGenerator() {
    const [numberOfColors, setNumberOfColors] = useState(5);
    const [palette, setPalette] = useState([]);

    /**
     * Fetches a random color palette from the API.
     * @returns {Promise<void>} Resolves when the color palette is fetched and set.
     */
    const fetchRandomPalette = async () => {
        try {
            const response = await axios.get(`https://www.thecolorapi.com/scheme?mode=analogic&count=${numberOfColors}`);
            setPalette(response.data.colors.map(color => color.hex.value));
        } catch (error) {
            console.error('Error generating the colour palette:', error);
        }
    };

    /**
     * Effect hook to fetch a random color palette when the number of colors changes.
     * @param {number} numberOfColors - The number of colors in the palette.
     */
    React.useEffect(() => {
        fetchRandomPalette();
    }, [numberOfColors]);

    /**
     * Handles the change in the number of colors.
     * @param {Object} event - The event object.
     */
    const handleNumberChange = (event) => {
        const newNumberOfColors = parseInt(event.target.value, 10);
        setNumberOfColors(newNumberOfColors);
    };

    /**
     * Handles the regeneration of the color palette.
     */
    const handleRegenerate = () => {
        fetchRandomPalette();
    };

    return (
        <div className="PaletteGenerator">
            {/* <ColorSwitcher /> */}

            <main className="app-content">
                {/* Left column */}
                <section className="content-block">

                    <header className="text_block">
                        <h1>Palette Generator</h1>
                        <p>Generate a random color palette.</p>
                    </header>

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
                    <button onClick={handleRegenerate}>Generate</button>
                </section>

                {/* Right column */}
                <section className="color-palette">
                    {palette.map((colorObj, index) => (
                        <div key={index} className="color" style={{ backgroundColor: colorObj.hex }}>
                            <p className="color-name">{colorObj.name}</p>
                            <p className="color-hex">{colorObj.hex}</p>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
}

export default PaletteGenerator;