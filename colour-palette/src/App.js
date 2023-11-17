/**
 * Main application component.
 * App.js
 * @component
 */
import React, { createContext, useState, useMemo } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import About from "./Pages/About";
import Home from "./Pages/Home";
import ColourPicker from "./Pages/ColorPicker";
import PaletteGenerator from "./Pages/PaletteGenerator";
import MoodboardGenerator from "./Pages/MoodboardGenerator";
import NotFoundPage from "./Pages/NotFoundPage";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ColorSwitcher from "./Components/ColorSwitcher";
import NavigationBar from "./Components/NavigationBar";

// TODO: add theme switcher to nav bar component

/*  navigation bar
 *  | Home (icon + title) | About | Colour Picker | Palette Generator | Moodboard Generator |
 *
 *  tech menu
 *  | Color Switcher (icon) | Export (icon) |
 */

export const ColorContext = createContext(); // Create ColorContext

const App = () => {
  const [theme, setTheme] = useState("light");
  const themeValue = useMemo(() => ({ theme, setTheme }), [theme]);

  // Router
  const navigate = useNavigate(); // gets navigation and stores it
  const navigateToHome = () => {
    navigate("/");
  };
  const navigateToAbout = () => {
    navigate("/About");
  };
  const navigateToColourPicker = () => {
    navigate("/ColourPicker");
  };
  const navigateToPaletteGenerator = () => {
    navigate("/PaletteGenerator");
  };
  const navigateToMoodboardGenerator = () => {
    navigate("/MoodboardGenerator");
  };
  const navigateToNotFoundPage = () => {
    navigate("/NotFoundPage");
  };
  const navigateToModeSwitch = () => {
    navigate("/ModeSwitch");
  };

  return (
    <ColorContext.Provider value={themeValue}>
      <div className={`App ${theme === "dark" ? "dark" : ""}`}>
        {/* Include the NavigationBar component */}
        <NavigationBar />

        {/* TODO: create nav bar as a component */}
        {/* <Header /> */}

        <div>
          <div>
            <Routes>
              <Route path="/About" element={<About />} />
              <Route path="/" element={<Home />} />
              <Route path="/ColourPicker" element={<ColourPicker />} />
              <Route path="/PaletteGenerator" element={<PaletteGenerator />} />
              <Route
                path="/MoodboardGenerator"
                element={<MoodboardGenerator />}
              />
            </Routes>
          </div>
        </div>

        <main className="app-content">
          {/*
        <header className="text_block">
        <h1>Color Picker</h1>
        <p>Extract wonderful palettes from your image.</p>
        </header> */}
        </main>
      </div>
    </ColorContext.Provider>
  );
};

export default App;
