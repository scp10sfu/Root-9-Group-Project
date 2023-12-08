import axios from 'axios';

 /**
  * Fetches color name from the API based on HEX code.
  * @param {string} hex - HEX color code.
  * @returns {Promise<string>} Resolves with the color name.
  */

  export const fetchColorName = async (hex) => {
    try {
      const response = await axios.get(`https://www.thecolorapi.com/id?hex=${hex.replace('#', '')}`);
      return response.data.name.value || 'Unknown';
    } catch (error) {
      console.error('Error fetching the color name:', error);
      return 'Unknown'; // Fallback to HEX if the name can't be fetched
    }
  };