import React, { useState } from 'react';

export const Toast = (type, message, onClose ) => {
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