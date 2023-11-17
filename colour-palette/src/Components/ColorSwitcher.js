// ColorSwitcher.js

import React, { useContext } from 'react';
//import { ColorContext } from '../App';
import { createContext, useState } from 'react';
import ReactSwitch from "react-switch";

{/*const ColorSwitcher = () => {
  const { darkTheme, toggleTheme } = useContext(ColorContext);

  return (
    <div className="theme-switcher">
      <button onClick={toggleTheme}>
        {darkTheme ? 'Switch to Light' : 'Switch to Dark'}
      </button>
    </div>
  );
};
export default ColorSwitcher;*/}


{/*
trying to have a theme switch bar, added switch bar, might be some library not connect
did not show as expected, ideally when user toggles then will show different mode 
-cindy 
*/ }
export const ThemeContext = createContext(null);
function App(){
  const[theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  return(
      <ThemeContext.Provider value = {{theme, setTheme}}>
        <div className= "App" id={theme}>
          <div className="switch" >
            <label>{theme === "light" ? "Light Mode" : "Dark Mode"}</label>
          <ReactSwitch onChange={toggleTheme} checked={theme=== "dark"}/>
          </div>
        </div>
      </ThemeContext.Provider>

  )}

