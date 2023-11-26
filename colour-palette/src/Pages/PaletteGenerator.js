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
    const [chatHistory, setChatHistory] = useState([]);
    const [numberOfColors, setNumberOfColors] = useState(8); // Default number of colors
    const [allColors, setAllColors] = useState([]); // All colors fetched from the API
    

    /* ************************************************************************ */
    /* ********************* SAME AS COLOUR EXTRACTOR ************************* */
    /* ************************************************************************ */

    /**
     * Converts HEX values to RGB format.
     * @param {string} hex - The HEX color code.
     * @returns {object} The RGB representation of the HEX value.
     */
    const hexToRgb = (hex) => {
        // Remove the hash if it's included
        hex = hex.replace(/^#/, '');

        // Parse the hex values to separate R, G, B components
        let bigint = parseInt(hex, 16);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;

        // Return an object with the R, G, B values
        return { r, g, b };
    }

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

        return { c, m, y, k };
    };



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


    /**
   * SkeletonLoader Component
   * A component representing a skeleton loader with color information.
   * NOTE: keep this an empty container!
   * @returns {JSX.Element} - The rendered SkeletonLoader component.
   */
    const SkeletonLoader = () => (
        <>
            <div className="main-section col-xs-36 col-md-24 grid-container nested-grid">
                {/* First dominant colour */}
                <div className="wrapper-2-col secondary-section col-xs-36 col-md-18">
                    <div key={0} className="loader-square-bottom-align" style={{ backgroundColor: 'rgba(196, 196, 196, 0.25)' }}>
                        <p className="color-name">{defaultColor.name}</p>
                        <p className="color-hex">HEX: {defaultColor.hex}</p>
                        <p className="color-rgb">RGB: {defaultColor.rgb}</p>
                        <p className="color-cmyk">CMYK: {defaultColor.cmyk}</p>
                    </div>
                </div>
                {/* Second dominant colour */}
                <div className="wrapper-2-col secondary-section col-xs-36 col-md-18">
                    <div key={1} className="loader-square-bottom-align" style={{ backgroundColor: 'rgba(196, 196, 196, 0.25)' }}>
                        <p className="color-name">{defaultColor.name}</p>
                        <p className="color-hex">HEX: {defaultColor.hex}</p>
                        <p className="color-rgb">RGB: {defaultColor.rgb}</p>
                        <p className="color-cmyk">CMYK: {defaultColor.cmyk}</p>
                    </div>
                </div>

                <div className="wrapper-4-col secondary-section col-xs-36 col-md-9">
                    <div key={2} className="loader-square-top-align" style={{ backgroundColor: 'rgba(196, 196, 196, 0.25)' }}>
                        <p className="color-name">{defaultColor.name}</p>
                        <p className="color-hex">HEX: {defaultColor.hex}</p>
                        <p className="color-rgb">RGB: {defaultColor.rgb}</p>
                        <p className="color-cmyk">CMYK: {defaultColor.cmyk}</p>
                    </div>
                </div>
                <div className="wrapper-4-col secondary-section col-xs-36 col-md-9">
                    <div key={3} className="loader-square-top-align" style={{ backgroundColor: 'rgba(196, 196, 196, 0.25)' }}>
                        <p className="color-name">{defaultColor.name}</p>
                        <p className="color-hex">HEX: {defaultColor.hex}</p>
                        <p className="color-rgb">RGB: {defaultColor.rgb}</p>
                        <p className="color-cmyk">CMYK: {defaultColor.cmyk}</p>
                    </div>
                </div>
                <div className="wrapper-4-col secondary-section col-xs-36 col-md-9">
                    <div key={4} className="loader-square-top-align" style={{ backgroundColor: 'rgba(196, 196, 196, 0.25)' }}>
                        <p className="color-name">{defaultColor.name}</p>
                        <p className="color-hex">HEX: {defaultColor.hex}</p>
                        <p className="color-rgb">RGB: {defaultColor.rgb}</p>
                        <p className="color-cmyk">CMYK: {defaultColor.cmyk}</p>
                    </div>
                </div>
                <div className="wrapper-4-col secondary-section col-xs-36 col-md-9">
                    <div key={5} className="loader-square-top-align" style={{ backgroundColor: 'rgba(196, 196, 196, 0.25)' }}>
                        <p className="color-name">{defaultColor.name}</p>
                        <p className="color-hex">HEX: {defaultColor.hex}</p>
                        <p className="color-rgb">RGB: {defaultColor.rgb}</p>
                        <p className="color-cmyk">CMYK: {defaultColor.cmyk}</p>
                    </div>
                </div>
            </div>
        </>
    );

    /**
* Default Color Object
* Represents a default color with optional properties.
*/
    const defaultColor = {
        name: "Silver",
        // rgba: "196, 196, 196, 0.25"
        hex: "#C4C4C4",
        rgb: "196, 196, 196",
        cmyk: "0, 0, 0, 23.1"
    };

    /**
  * Color Variables
  * Variables representing colors based on the 'colors' array.
  */
    const firstColor = colors.length >= 1 ? colors[0] : defaultColor;
    const secondColor = colors.length >= 2 ? colors[1] : defaultColor;
    const thirdColor = colors.length >= 3 ? colors[2] : defaultColor;
    const fourthColor = colors.length >= 4 ? colors[3] : defaultColor;
    const fifthColor = colors.length >= 5 ? colors[4] : defaultColor;
    const sixthColor = colors.length >= 6 ? colors[5] : defaultColor;


    /**
     * ColourBoxBottom Component
     * A component representing a colour box with color information aligned to bottom.
     * @param {object} color - The color object.
     * @returns {JSX.Element} - The rendered ColourBoxBottom component.
     */
    const ColourBoxBottom = ({ color }) => {
        const textColor = getTextColor(color.hex);
        const [isCopyIconFilled, setIsCopyIconFilled] = useState(false);

        const copyToClipboard = (text) => {
            navigator.clipboard.writeText(text).then(() => {
                // toast.success('Copied to clipboard!', { autoClose: 1500 });
                setShowToast(true);
                setToastMessage('Copied to clipboard!');

                setTimeout(() => {
                    setShowToast(false);
                }, 1500); // Auto-close after 2 seconds

                // Change the copy icon to filled for a second
                setIsCopyIconFilled(true);
                setTimeout(() => {
                    setIsCopyIconFilled(false);
                }, 750);
            });
        };

        return (
            <div className="color-bottom-align" style={{ backgroundColor: color.hex }}>

                <div className="color-name-container">
                    <p className="color-name" style={{ color: textColor }}>{color.name}</p>

                    <button
                        className="copy-icon"
                        onClick={() => copyToClipboard(`${color.name}\nHEX: ${color.hex}\nRGB: ${color.rgb}\nCMYK: ${color.cmyk}`)}
                        aria-label="Copy to clipboard"
                    >
                        {textColor === 'rgba(18, 18, 18, 1)' ? (
                            isCopyIconFilled ? <CopyIconDarkFilled /> : <CopyIconDarkUnfilled />
                        ) : (
                            isCopyIconFilled ? <CopyIconWhiteFilled /> : <CopyIconWhiteUnfilled />
                        )}
                    </button>
                </div>

                <p className="color-hex" style={{ color: textColor }}>HEX: {color.hex}</p>
                <p className="color-rgb" style={{ color: textColor }}>RGB: {color.rgb}</p>
                <p className="color-cmyk" style={{ color: textColor }}>CMYK: {color.cmyk}</p>

            </div>

        );
    };


    /**
     * ColourBoxTop Component
     * A component representing a colour box with color information aligned to top.
     * @param {object} color - The color object.
     * @returns {JSX.Element} - The rendered ColourBoxTop component.
     */
    const ColourBoxTop = ({ color }) => {
        const textColor = getTextColor(color.hex);
        const [isCopyIconFilled, setIsCopyIconFilled] = useState(false);

        const copyToClipboard = (text) => {
            navigator.clipboard.writeText(text).then(() => {
                // toast.success('Copied to clipboard!', { autoClose: 1500 });
                setShowToast(true);
                setToastMessage('Copied to clipboard!');

                setTimeout(() => {
                    setShowToast(false);
                }, 1500); // Auto-close after 2 seconds

                // Change the copy icon to filled for a second
                setIsCopyIconFilled(true);
                setTimeout(() => {
                    setIsCopyIconFilled(false);
                }, 750);

            });
        };

        return (
            <div className="color-top-align" style={{ backgroundColor: color.hex }}>

                <div className="color-name-container">
                    <p className="color-name" style={{ color: textColor }}>{color.name}</p>

                    <button
                        className="copy-icon"
                        onClick={() => copyToClipboard(`${color.name}\nHEX: ${color.hex}\nRGB: ${color.rgb}\nCMYK: ${color.cmyk}`)}
                        aria-label="Copy to clipboard"
                    >
                        {textColor === 'rgba(18, 18, 18, 1)' ? (
                            isCopyIconFilled ? <CopyIconDarkFilled /> : <CopyIconDarkUnfilled />
                        ) : (
                            isCopyIconFilled ? <CopyIconWhiteFilled /> : <CopyIconWhiteUnfilled />
                        )}
                    </button>
                </div>

                <p className="color-hex" style={{ color: textColor }}>HEX: {color.hex}</p>
                <p className="color-rgb" style={{ color: textColor }}>RGB: {color.rgb}</p>
                <p className="color-cmyk" style={{ color: textColor }}>CMYK: {color.cmyk}</p>

            </div>
        );
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
            // Set the API URL
            const apiUrl = 'https://paleta-11d0ba2b2f2b.herokuapp.com' || 'http://localhost:3000';
            console.log(`API URL being used: ${apiUrl}`); // Debug: Log the API URL

            // Make the POST request
            const response = await axios.post(`${apiUrl}/get_palette`, { prompt });
            console.log('Response from API:', response); // Debug: Log the response

            // Assuming response.data.colors is an array of hex color strings
            const colorPromises = response.data.colors.map(async (hex) => {
                const rgb = hexToRgb(hex);
                const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
                const name = await fetchColorName(hex);
                return { hex, rgb: `${rgb.r}, ${rgb.g}, ${rgb.b}`, cmyk: `${cmyk.c}, ${cmyk.m}, ${cmyk.y}, ${cmyk.k}`, name };
            });
            const colorObjects = await Promise.all(colorPromises);
            setColors(colorObjects);

            // TODO: check it!
            setAllColors(response.data.colors || []); // Store all colors

            const userMessage = { role: 'user', message: prompt };
            setChatHistory((prevHistory) => [...prevHistory, userMessage]);

            setFullResponse(response.data.fullResponse || ""); // Update with full response
        } catch (error) {
            console.error("Error:", error);
            setFullResponse('Failed to get the color palette. Please try again.');
        } finally {
            setIsLoading(false);

            setPrompt('');  // Clear the input field
        }
    };

    
    const handleColorSelection = (num) => {
        setNumberOfColors(num); // Update the number of colors without calling API
    };

    // Get the colors to display based on the selected number
    const displayedColors = allColors.slice(0, numberOfColors);


    useEffect(() => {
        // Scroll to the bottom of the chat when chatHistory changes
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [chatHistory]);

    return (

        <div className="palette-generator" style={backgroundStyle}>

            <div className="background">
                {Array.from({ length: 20 }, (_, i) => (
                    <span key={i} style={{ color: `var(--color${i + 1})` }}></span>
                ))}
            </div>

            {/* Toast message */}
            {showToast && (
                <Toast
                    message={toastMessage}
                    onClose={() => {
                        setShowToast(false);
                        setToastMessage('');
                    }}
                />
            )}

            <Layout>
                <div className="grid-container general">
                    <div className="col-xs-36 col-md-36"></div>

                    {/* The main content - left part */}
                    <div className="main-section col-xs-36 col-md-12 grid-container nested-grid">
                        <div className="col-xs-36 col-md-25">
                            <header className="text_block_text">Palette Generator</header>
                        </div>

                        <div className="col-xs-36 col-md-25">
                            <header className="text_block_subtext">Generate wonderful palettes.
                            </header>
                        </div>


                        {/* FOR CHAT */}
                        <div className="chat-container col-xs-36 col-md-25">
                            <div className="request-info-text">
                                Enter Request:
                            </div>

                            <main class="main flow">
                                <div class="main__cards cards">
                                    <div class="cards__inner">
                                        <div class="cards__card card">
                                            <h2 class="card__heading">Ultimate</h2>
                                            <p class="card__price">$29.99</p>
                                            <ul role="list" class="card__bullets flow">
                                                <li>Access to all premium workouts and nutrition plans</li>
                                                <li>24/7 Priority support</li>
                                                <li>1-on-1 virtual coaching session every month</li>
                                                <li>Exclusive content and early access to new features</li>
                                            </ul>
                                            <a href="#ultimate" class="card__cta cta">Go Ultimate</a>
                                        </div>
                                    </div>

                                    <div class="overlay cards__inner"></div>
                                </div>
                            </main>


                            <div className="chat-container box">

                                {/* Display chat messages */}
                                {chatHistory.map((message, index) => (
                                    <div key={index} className={message.role === 'user' ? 'user-message' : 'ai-message'}>
                                        {message.message}
                                    </div>
                                ))}
                            </div>

                            <div className="text-input-container">
                                <form onSubmit={handleSubmit}>
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

                                <div className="color-choices">
                                    {[4, 6, 8, 10, 15].map((num) => (
                                        <button
                                            type="button" // Ensure the button does not submit the form
                                            key={num}
                                            className={`color-choice-button ${num === numberOfColors ? 'selected' : ''}`}
                                            onClick={() => handleColorSelection(num)}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>

                                <div id="palette-response">
                                    {fullResponse && <p className="palette-response-text">{fullResponse}</p>}
                                </div>

                                {/* <div id="palette">
                                    <div className="color-swatches">
                                        {displayedColors.map((color, index) => (
                                            <div key={index} className="color-swatch" style={{ backgroundColor: color }}></div>
                                        ))}


                                        <div id="palette-response">
                                            {fullResponse && <p className="palette-response-text">{fullResponse}</p>}
                                        </div>
                                    </div>
                                </div> */}
                            </div>

                        </div>

                    </div>

                    {/* Conditional rendering based on isLoading state */}
                    {/* The main content - right part */}
                    {isLoading ? (<SkeletonLoader />)
                        : (<>
                            <div className="main-section col-xs-36 col-md-24 grid-container nested-grid">
                                <div className="wrapper-2-col secondary-section col-xs-36 col-md-18">
                                    <ColourBoxBottom color={colors.length >= 1 ? colors[0] : defaultColor} />
                                </div>
                                <div className="wrapper-2-col secondary-section col-xs-36 col-md-18">
                                    <ColourBoxBottom color={colors.length >= 2 ? colors[1] : defaultColor} />
                                </div>
                                <div className="wrapper-4-col secondary-section col-xs-36 col-md-9">
                                    <ColourBoxTop color={colors.length >= 3 ? colors[2] : defaultColor} />
                                </div>
                                <div className="wrapper-4-col secondary-section col-xs-36 col-md-9">
                                    <ColourBoxTop color={colors.length >= 4 ? colors[3] : defaultColor} />
                                </div>
                                <div className="wrapper-4-col secondary-section col-xs-36 col-md-9">
                                    <ColourBoxTop color={colors.length >= 5 ? colors[4] : defaultColor} />
                                </div>
                                <div className="wrapper-4-col secondary-section col-xs-36 col-md-9">
                                    <ColourBoxTop color={colors.length >= 6 ? colors[5] : defaultColor} />
                                </div>

                            </div>
                        </>)}

                    <div className="col-xs-36 col-md-36"></div>
                </div>
            </Layout>

        </div>
    );
}

export default PaletteGenerator;