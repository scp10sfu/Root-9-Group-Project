/**
 * ColorPicker component for extracting palettes from images.
 * ColorPicker.js
 * @component
 */
 import React, { useState, useRef, useEffect } from 'react';
 import ColorThief from 'colorthief';
 import axios from 'axios';
 import { ReactComponent as UploadIcon } from '../images/icon-upload.svg';
 
 function ColorPicker() {
   const [numberOfColors, setNumberOfColors] = useState(10);
   const [image, setImage] = useState(null);
   const [colors, setColors] = useState([]);
   const [isImagePreviewActive, setIsImagePreviewActive] = useState(true);
   const imgRef = useRef(null);
   const colorThief = new ColorThief();
   const [backgroundStyle, setBackgroundStyle] = useState({});
 
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
    * Extracts colors from the loaded image using ColorThief and updates the state.
    * @returns {Promise<void>} A Promise that resolves when the extraction is complete.
    */
   const extractColors = async () => {
     if (imgRef.current && imgRef.current.complete) {
       try {
         const palette = colorThief.getPalette(imgRef.current, numberOfColors);
         const colorPromises = palette.map(async (rgb) => {
           const hex = rgbToHex(...rgb);
           const cmyk = rgbToCmyk(...rgb);
           const name = await fetchColorName(hex);
           return { hex, rgb: `rgb(${rgb.join(', ')})`, cmyk: `cmyk(${cmyk.join(', ')})`, name };
         });
         const colorObjects = await Promise.all(colorPromises);
         setColors(colorObjects);
 
         // Update the background style based on the extracted colors
         const background = {};
         for (let i = 0; i < colorObjects.length; i++) {
           background[`--color${i + 1}`] = colorObjects[i]?.hex;
         }
         setBackgroundStyle(background);
       } catch (error) {
         console.error('Error extracting the colors:', error);
       }
     }
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
 
   useEffect(() => {
     const currentImgRef = imgRef.current;
     if (image) {
       extractColors();
     }
     if (currentImgRef && currentImgRef.complete) {
       extractColors();
     }
     if (imgRef.current && imgRef.current.complete) {
       extractColors();
     }
     return () => {
       if (imgRef.current) {
         imgRef.current.removeEventListener('load', extractColors);
       }
     };
   }, [numberOfColors]);
 
   const handleNumberChange = (number) => {
     setNumberOfColors(number);
     extractColors();
   };
 
   const handleImageChange = (event) => {
     if (event.target.files && event.target.files.length > 0) {
       const file = event.target.files[0];
       const reader = new FileReader();
 
       reader.onload = (e) => {
         setImage(e.target.result);
         localStorage.setItem('savedImage', e.target.result);
         setIsImagePreviewActive(false);
       };
       reader.readAsDataURL(file);
     }
   };
 
   const handleClosePreview = () => {
     setImage(null);
     setColors([]);
     setIsImagePreviewActive(true);
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
 
   const NumberButton = ({ number, isActive }) => (
     <button
       className={`number-button ${isActive ? 'active' : ''}`}
       onClick={() => handleNumberChange(number)}
     >
       {number}
     </button>
   );
 
   return (
     <div className="ColorPicker" style={backgroundStyle}>
       <div className="background">
         {Array.from({ length: 20 }, (_, i) => (
           <span key={i} style={{ color: `var(--color${i + 1})` }}></span>
         ))}
       </div>
       <main className="app-content">
         <section className="content-block">
           <header className="text_block">
             <h1>Color Extractor</h1>
             <p>Extract wonderful palettes from your image.</p>
           </header>
 
           {isImagePreviewActive && (
             <section className="upload-area">
               <input type="file" accept="image/*" onChange={handleImageChange} id="fileInput" />
               <label htmlFor="fileInput">
                 <header className="text_block">
                   <div className="text_block_text">
                     <UploadIcon className="upload-icon" style={{ width: '30px', height: '30px' }} />
                     <p>Click or drag image to upload</p>
                   </div>
                   <div className="text_block_subtext">
                     <i className="info-icon">i</i> Max file size: XX MB
                   </div>
                 </header>
               </label>
             </section>
           )}
 
           {image && (
             <div className="image-preview">
               <button className="close-button" onClick={handleClosePreview}>
                 <span>&times;</span>
               </button>
               <img
                 ref={imgRef}
                 src={image}
                 alt="To extract colors from"
                 crossOrigin="anonymous"
                 onLoad={extractColors}
               />
             </div>
           )}
 
           <section className="color-controls">
             <p className="number-of-colors-label">The number of plate</p>
             {[4, 6, 8, 10].map((number) => (
               <NumberButton
                 key={number}
                 number={number}
                 isActive={numberOfColors === number}
               />
             ))}
           </section>
         </section>
 
         <section className={`color-palette ${colors.length === 2 ? 'two-colors' : colors.length === 8 ? 'eight-colors' : ''}`}>
           {colors.map((colorObj, index) => (
             <div key={index} className="color" style={{ backgroundColor: colorObj.hex }}>
               <p className="color-name">{colorObj.name}</p>
               <p className="color-hex">HEX: {colorObj.hex}</p>
               <p className="color-rgb">RGB: {colorObj.rgb}</p>
               <p className="color-cmyk">CMYK: {colorObj.cmyk}</p>
             </div>
           ))}
         </section>
       </main>
     </div>
   );
 }
 
 export default ColorPicker;
 