import React, { useState } from 'react';
import { ColorPicker } from "react-color-palette";
import "react-color-palette/dist/css/rcp.css";
import './PaletteGenerator.css';
import axios from 'axios';

function PaletteGenerator() {
    const [startColor, setStartColor] = useState({ hex: "#ffffff" });
    const [endColor, setEndColor] = useState({ hex: "#000000" });
    const [palette, setPalette] = useState([]);
    const [userInput, setUserInput] = useState('');

    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ] : null;
    };
    
    
å
    const rgbToHex = (r, g, b) => {
        return "#" + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    };
    
    

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
    
    

    const generatePalette = () => {
        let startRgb = hexToRgb(startColor.hex);
        let endRgb = hexToRgb(endColor.hex);
        let paletteArray = [startColor.hex];
    
        for (let i = 1; i < 9; i++) {
            let factor = i / 9;
            let interpolatedRgb = interpolateColor(startRgb, endRgb, factor);
            paletteArray.push(rgbToHex(...interpolatedRgb));
        }
    
        paletteArray.push(endColor.hex);
        setPalette(paletteArray);
    };
    
    

    const fetchColorFromAI = async () => {
        try {
            const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
                prompt: `Generate a color palette for a mood: ${userInput}. Provide start and end HEX colors.`,
                max_tokens: 60
            }, {
                headers: {
                    'Authorization': `Bearer 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`
                }
            });

            const aiResponse = response.data.choices[0].text.trim();
            const [startHex, endHex] = aiResponse.split(' '); 
            setStartColor({ hex: startHex });
            setEndColor({ hex: endHex });
        } catch (error) {
            console.error("Error fetching color from AI", error);
        }
    };

    return (
        <div className="PaletteGenerator">
            <div className="palette-controls">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Describe your mood..."
                />
                <button onClick={fetchColorFromAI}>Get Colors from AI</button>
                <button onClick={generatePalette}>Generate Palette</button>
                <div>
                    <p>Start Color:</p>
                    <ColorPicker 
                        width={456}
                        height={228}
                        color={startColor}
                        onChange={(color) => setStartColor(color)}
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
                        onChange={(color) => setEndColor(color)}
                        hideHSV
                        dark
                    />
                </div>
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
