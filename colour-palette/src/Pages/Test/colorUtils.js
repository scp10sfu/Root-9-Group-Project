/**
* Converts RGB values to HEX format.
* @param {number} r - The red value (0 to 255).
* @param {number} g - The green value (0 to 255).
* @param {number} b - The blue value (0 to 255).
* @returns {string} The HEX representation of the RGB values.
*/
export const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
  const hex = x.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}).join('');


/**
* Converts HEX values to RGB format.
* @param {string} hex - The HEX color code.
* @returns {object} The RGB representation of the HEX value.
*/
export const hexToRgb = (hex) => {
  // Remove the hash if it's included
  hex = hex.replace(/^#/, '');

  // check if hex is valid (numbers and length of 3 or 6)
  if (!/^[0-9a-f]{3}([0-9a-f]{3})?$/i.test(hex)) {
    return null;
  }

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
* @throws {Error} Invalid RGB value.
* @returns {string} The CMYK representation of the RGB values.
*/
export const rgbToCmyk = (r, g, b) => {
  // Validate the RGB values
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    throw new Error('Invalid RGB value');
  }

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
  console.log(c, m, y, k);
  return [c, m, y, k];
};


/**
* Determines whether the text in the colour block should be light or dark.
* @param {string} hexColor - The HEX color code.
* @returns {string} The text color.
*/
export const getTextColor = (hexColor) => {
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
* Converts RGB values to HSL format.
* @param {number} r - The red value (0 to 255).
* @param {number} g - The green value (0 to 255).
* @param {number} b - The blue value (0 to 255).
* @returns {Array} The HSL representation of the RGB values.
*/
export const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // grayscale
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
};