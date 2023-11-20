// NavigationBar.js
//import "./App.css";
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { createContext, useState } from 'react';
import './NavigationBar.css';

import About from '../Pages/About';
import Home from '../Pages/Home';
import ColourExtractor from '../Pages/ColourExtractor';
import PaletteGenerator from '../Pages/PaletteGenerator';
import MoodboardGenerator from '../Pages/MoodboardGenerator';
import ColorSwitcher from "./ColorSwitcher";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="App" id={theme}>
      </div>
    </ThemeContext.Provider>
  )
}


const NavigationBar = () => {
  // Router
  const navigate = useNavigate();
  const navigateToHome = () => { navigate('/'); };
  const navigateToAbout = () => { navigate('/About'); };
  const navigateToColourExtractor = () => { navigate('/ColourExtractor'); };
  const navigateToPaletteGenerator = () => { navigate('/PaletteGenerator'); };
  const navigateToMoodboardGenerator = () => { navigate('/MoodboardGenerator'); };
  const navigateToNotFoundPage = () => { navigate('/NotFoundPage'); };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth <= 768;

      // Close the mobile menu if it's open and the screen width exceeds the threshold
      if (isMobileMenuOpen && !newIsMobile) {
        setMobileMenuOpen(false);
      }

      setIsMobile(newIsMobile);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderLinks = () => {
    if (isMobile) {
      return (
        <div className={`menu-icon ${isMobileMenuOpen ? 'close-icon' : ''}`} onClick={toggleMobileMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>

          {isMobileMenuOpen && (
          <div className="mobile-links">
            <button onClick={navigateToAbout}>About</button>
            <button onClick={navigateToColourExtractor}>Colour Extractor</button>
            <button onClick={navigateToPaletteGenerator}>Palette Generator</button>
            <button onClick={navigateToMoodboardGenerator}>Moodboard Generator</button>
          </div>
        )}

        </div>
      );
    } else {
      return (
        <div className="links">
          <button onClick={navigateToAbout}>About</button>
          <button onClick={navigateToColourExtractor}>Colour Extractor</button>
          <button onClick={navigateToPaletteGenerator}>Palette Generator</button>
          <button onClick={navigateToMoodboardGenerator}>Moodboard Generator</button>
        </div>
      );
    }
  };

  // return (
  //   <nav className={`nav-bar ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
  //     <div className='nav-content'>
  //       <button className="title-page" onClick={navigateToHome}>Paletä</button>

  //       <div className={`menu-icon ${isMobileMenuOpen ? 'close-icon' : ''}`} onClick={toggleMobileMenu}>
  //         {/* Hamburger icon or close icon */}
  //         <div className="bar"></div>
  //         <div className="bar"></div>
  //         <div className="bar"></div>
  //       </div>

  //       <div className={`links ${isMobileMenuOpen ? 'mobile-links' : ''}`}>
  //         <button onClick={navigateToAbout}>About</button>
  //         <button onClick={navigateToColourExtractor}>Colour Extractor</button>
  //         <button onClick={navigateToPaletteGenerator}>Palette Generator</button>
  //         <button onClick={navigateToMoodboardGenerator}>Moodboard Generator</button>
  //       </div>

        {/* <div className="links">
          <button onClick={navigateToAbout}>About</button>
          <button onClick={navigateToColourExtractor}>Colour Extractor</button>
          <button onClick={navigateToPaletteGenerator}>Palette Generator</button>
          <button onClick={navigateToMoodboardGenerator}>Moodboard Generator</button>
        
          <div class="menu-toggle">
          <ion-icon name="menu"></ion-icon>
        </div>
        <div class="overlay">
          <div class="close-btn">
            <ion-icon name="close"></ion-icon>
          </div>
          <div class="menu">
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#projects">Projects</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </div> */}


        return (
          <nav className={`nav-bar ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
            <div className='nav-content'>
              <button className="title-page" onClick={navigateToHome}>Paletä</button>
              {renderLinks()}
    
        <ColorSwitcher />

        
      </div>
    </nav>
  );
};

export default NavigationBar;