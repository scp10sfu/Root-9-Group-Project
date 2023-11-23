import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PaletteGenerator.css";

function PaletteGenerator() {
  const [colors, setColors] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Move this inside the component

  useEffect(() => {
    const form = document.getElementById("paletteForm");
    const colorSwatches = document.getElementById("colorSwatches");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const prompt = document.getElementById("prompt").value;

      // Set loading to true
      setIsLoading(true);

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
      } finally {
        // Set loading to false regardless of the outcome
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <div className="palette-generator">
      <h2>Ask for a Color Palette</h2>
      <form id="paletteForm">
        <label htmlFor="prompt">Describe the picture you want to draw:</label>
        <br />
        <input type="text" id="prompt" name="prompt" required />
        <br />
        <input type="submit" value="Get Palette" />
      </form>
      {isLoading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
      <div id="palette">
        <p>Color Palette:</p>
        <div className="color-swatches" id="colorSwatches"></div>
      </div>
    </div>
  );
}

export default PaletteGenerator;
