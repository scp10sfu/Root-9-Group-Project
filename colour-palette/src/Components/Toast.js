// Toast.js

import React from 'react';
import PropTypes from 'prop-types';
import './Toast.css';

const Toast = ({ type, message, onClose }) => {
  return (
    <div className={`toast ${type}`}>
      <div className="toast-content">
        {/* Add your icon component here */}
        <span className="toast-message">{message}</span>
        <span className="toast-close" onClick={onClose}>
          &#x2715;
        </span>
      </div>
    </div>
  );
};

Toast.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'info']), // Type of toast (success, error, info)
  message: PropTypes.string.isRequired, // Message to display in the toast
  onClose: PropTypes.func.isRequired, // Callback function when the toast is closed
};

export default Toast;