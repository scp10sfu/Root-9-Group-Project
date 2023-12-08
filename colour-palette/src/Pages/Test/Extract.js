// colorExtractionFunctions.js
import ColorThief from 'colorthief';
import { rgbToHex, rgbToCmyk, fetchColorName } from './colorUtils';

// Mocking ColorThief
jest.mock('colorthief', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getPalette: () => [[255, 0, 0], [0, 255, 0], [0, 0, 255]],
      getColor: () => [255, 255, 255]
    };
  });
});

const colorThief = new ColorThief();

export const extractColors = async (imgRef, setIsLoadingAndExtracting, setColors, setBackgroundStyle) => {
    setIsLoadingAndExtracting(true);
    if (imgRef.current && imgRef.current.complete) {
      try {
        console.log('Extracting colors...');
        // NOTE: The value is set to 10, so we do not make multiple requests to the API
        const palette = colorThief.getPalette(imgRef.current, 10);
        const colorPromises = palette.map(async (rgb) => {
          const hex = rgbToHex(...rgb);
          const cmyk = rgbToCmyk(...rgb);
          const name = await fetchColorName(hex);
          return { hex, rgb: `${rgb.join(', ')}`, cmyk: `${cmyk.join(', ')}`, name };
        });
        const colorObjects = await Promise.all(colorPromises);
        setColors(colorObjects);

        // Update the background style based on the extracted colors
        const background = {};
        for (let i = 0; i < colorObjects.length; i++) {
          background[`--color${i + 1}`] = colorObjects[i]?.hex;
        }
        setBackgroundStyle(background);

        localStorage.removeItem('savedBackground');
        localStorage.setItem('savedBackground', JSON.stringify(background));
        console.log('Saved background colours to local storage');

        // Determine whether the image is light or dark
        const dominantColor = colorThief.getColor(imgRef.current);
        const brightness = (dominantColor[0] * 299 + dominantColor[1] * 587 + dominantColor[2] * 114) / 1000;
        const [hue, saturation, lightness] = rgbToHsl(dominantColor[0], dominantColor[1], dominantColor[2]);
        const isLightBackground = lightness > 70 ? true : false;
        const isHighSaturation = saturation > 50 ? true : false;

        setIsLightImage(isLightBackground || isHighSaturation || brightness > 30);

      } catch (error) {
        console.error('Error extracting the colors:', error);
      }
      finally {
        // Set loading state to false after extraction is complete (whether successful or not)
        setIsLoadingAndExtracting(false);
      }
    }
  };


export const validFileType = (file, fileTypes) => {
  
    console.log('File type is', file.type);
    return fileTypes.includes(file.type);
  
};

export const handleImageChange = async (event, setImage, setIsLoadingAndExtracting, setIsImagePreviewActive, setBackgroundStyle, MAX_FILE_SIZE_MB) => {
  setIsLoadingAndExtracting(true);
    try {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];

        if (!validFileType(file)) {
          throw new Error('Invalid file type! Please upload an image');
        }

        // Check if file size exceeds the limit
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
          throw new Error(`The file exceeds the limit of ${MAX_FILE_SIZE_MB} MB`);
        }

        const reader = new FileReader();

        reader.onload = (e) => {
          setImage(e.target.result);                            // Set image URL to display it
          // localStorage.setItem('savedImage', e.target.result);  // Save image data to local storage
          setIsImagePreviewActive(false);                       // Set image preview active

          // Update the background style with saved colors from localStorage
          const savedBackground = localStorage.getItem('savedBackground');
          if (savedBackground) {
            setBackgroundStyle(JSON.parse(savedBackground));
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error('Error handling image change:', error);

      // Reset to default values
      setIsLoadingAndExtracting(false);
      setIsImagePreviewActive(true);
      setImage('');
      setBackgroundStyle({});
      setNumberOfColors(6);

      // Display a toast message for the file size limit exceeded error
      showToast('error', error.message);
      // < Toast type='error' message={error.message} />
      // <Toast type='error' message={error.message} />
    }
    
};

