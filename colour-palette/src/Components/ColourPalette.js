// ColourPalette.js

import React from 'react';
import { defaultColor } from '../Components/SkeletonLoader';


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
        }, 300);
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
        }, 300);

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