import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PaletteGenerator.css";

// Define a regular expression pattern to match HEX color codes
const HEX_COLOR_PATTERN = /#[0-9A-Fa-f]{6}\b/;

function PaletteGenerator() {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const form = document.getElementById("paletteForm");
    const colorSwatches = document.getElementById("colorSwatches");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const prompt = document.getElementById("prompt").value;

      try {
        const response = await axios.post("/get_palette", { prompt });
        const { data } = response;

        // Clear previous colors
        while (colorSwatches.firstChild) {
          colorSwatches.removeChild(colorSwatches.firstChild);
        }

        if (data.colors.length > 0) {
          data.colors.forEach((color) => {
            const colorSwatch = document.createElement("div");
            colorSwatch.className = "color-swatch";
            colorSwatch.style.backgroundColor = color;
            colorSwatches.appendChild(colorSwatch);
          });
        } else {
          const errorMessage = document.createElement("p");
          errorMessage.textContent = "No HEX color codes could be identified.";
          colorSwatches.appendChild(errorMessage);
        }

        setColors(data.colors);
      } catch (error) {
        console.error("Error:", error);
      }
    });
  }, []);

  return (
    <div>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Color Palette Generator</title>
          <style>
            {`
            body { font-family: Arial, sans-serif; margin: 20px; }
            .color-swatches { display: flex; margin-top: 20px; }
            .color-swatch {
                width: 50px; height: 50px; margin: 2px;
                border: 1px solid #000; /* Add border to see the swatch clearly */
            }
          `}
          </style>
        </head>
        <body>
          <h2>Ask for a Color Palette</h2>
          <form id="paletteForm">
            <label htmlFor="prompt">
              Describe the picture you want to draw:
            </label>
            <br />
            <input
              type="text"
              id="prompt"
              name="prompt"
              required
            />
            <br />
            <input
              type="submit"
              value="Get Palette"
            />
          </form>
          <div id="palette">
            <p>Color Palette:</p>
            <div
              className="color-swatches"
              id="colorSwatches"
            ></div>
          </div>
        </body>
      </html>
    </div>
  );
}

export default PaletteGenerator;
