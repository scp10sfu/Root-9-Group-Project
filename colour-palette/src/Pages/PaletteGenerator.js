import React, { useState } from "react";
import axios from "axios";
import "./PaletteGenerator.css";

function PaletteGenerator() {
    const [prompt, setPrompt] = useState('');
    const [colors, setColors] = useState([]);
    const [fullResponse, setFullResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
