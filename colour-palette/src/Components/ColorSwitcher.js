// ColorSwitcher.js

import React, { useContext } from 'react';
import { ColorContext } from '../App';

const ColorSwitcher = () => {
  const { darkTheme, toggleTheme } = useContext(ColorContext);

  return (
    <div className="theme-switcher">
      <button onClick={toggleTheme}>
        {darkTheme ? 'Switch to Light' : 'Switch to Dark'}
      </button>
    </div>
  );
};

export default ColorSwitcher;
