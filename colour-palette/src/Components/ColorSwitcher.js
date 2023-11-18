import React, { useContext } from "react";
import { ColorContext } from "../App"; // Import ColorContext
import "./ColorSwitcher.css";

const ColorSwitcher = () => {
  const { theme, setTheme } = useContext(ColorContext);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="color-switcher-wrapper">
      <div className="color-switcher">
        {/* Other buttons/icons can go here */}
        <button
          onClick={toggleTheme}
          className={`theme-toggle-button ${theme}`}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        {/* Add more buttons/icons as needed */}
      </div>
    </div>
  );
};

export default ColorSwitcher;