// BackgroundColour.js

import React, { useEffect, useState } from 'react';
import './BackgroundColour.css';

// Save colors to localStorage
const saveColorsToLocal = (colors) => {
    localStorage.setItem('savedBackground', JSON.stringify(colors));
};

// Load colors from localStorage
const loadColorsFromLocal = () => {
    const savedColorsJson = localStorage.getItem('savedBackground');
    return savedColorsJson ? JSON.parse(savedColorsJson) : [];
};

/**
 * BackgroundColour Component
 * @param {Array} colorArray - An array of colors for the background.
 * @returns {JSX.Element} - The rendered BackgroundColour component.
 */
const BackgroundColour = ({ colorArray }) => {
    const [backgroundStyle, setBackgroundStyle] = useState({});

    useEffect(() => {
        // Retrieve saved background state from local storage
        const savedBackground = JSON.parse(localStorage.getItem('savedBackground'));

        // Set default background colors
        if (savedBackground) {
            setBackgroundStyle(savedBackground);
        } else {
            setBackgroundStyle(colorArray);
        }
    }, [colorArray]); // Corrected dependency array

    return (
        <div className="background">
            {colorArray.map((color, index) => (
                <span key={index} style={{ color: `var(--color${index + 1})` }}></span>
            ))}
        </div>
    );
};

export default BackgroundColour;