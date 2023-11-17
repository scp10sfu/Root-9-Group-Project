import React, { useState } from 'react';
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/dist/css/rcp.css";
import './PaletteGenerator.css';

function PaletteGenerator() {
    const [startColor, setStartColor] = useColor("hex", "#ffffff");
    const [endColor, setEndColor] = useColor("hex", "#000000");
    const [palette, setPalette] = useState([]);

    const interpolateColor = (color1, color2, factor) => {
        if (arguments.length < 3) { 
            factor = 0.5; 
        }
        var result = color1.slice();
        for (var i = 0; i < 3; i++) {
            result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
        }
        return result;
    };

    const hexToRgb = (hex) => {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ] : null;
    };

    const rgbToHex = (r, g, b) => {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    };

    const generatePalette = () => {
        let startRgb = hexToRgb(startColor.hex);
        let endRgb = hexToRgb(endColor.hex);
        let paletteArray = [startColor.hex]; // Start with the start color

        for (let i = 1; i < 9; i++) { // Generate 8 intermediate colors
            let factor = i / 9;
            let interpolatedRgb = interpolateColor(startRgb, endRgb, factor);
            paletteArray.push(rgbToHex(...interpolatedRgb));
        }

        paletteArray.push(endColor.hex); // End with the end color
        setPalette(paletteArray);
    };

    return (
        <div className="PaletteGenerator">
            <div className="palette-controls">
                <div>
                    <p>Start Color:</p>
                    <ColorPicker 
                        width={456}
                        height={228}
                        color={startColor}
                        onChange={setStartColor}
                        hideHSV
                        dark
                    />
                </div>
                <div>
                    <p>End Color:</p>
                    <ColorPicker 
                        width={456}
                        height={228}
                        color={endColor}
                        onChange={setEndColor}
                        hideHSV
                        dark
                    />
                </div>
                <button onClick={generatePalette}>Generate Palette</button>
            </div>
            <div className="palette-display">
                {palette.length > 0 && palette.map((color, index) => (
                    <div key={index} className="color-block" style={{ backgroundColor: color }}>
                        {color}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PaletteGenerator;
