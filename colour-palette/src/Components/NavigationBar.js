// NavigationBar.js
//import "./App.css";
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { createContext, useState } from 'react';
import './NavigationBar.css';
import { ReactComponent as CloseIcon } from '../images/icon-close-white.svg';
import { ReactComponent as MenuIcon } from '../images/icon-menu-dark.svg';

import About from '../Pages/About';
// import Home from '../Pages/ColourExtractor';
import ColourExtractor from '../Pages/ColourExtractor';
import PaletteGenerator from '../Pages/PaletteGenerator';
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

const MobileMenu = ({ closeMenu }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    closeMenu();
    navigate(path);
  };

  return (
    <div className="mobile-menu">
      <button onClick={() => handleNavigation('/About')}>About</button>
      <button onClick={() => handleNavigation('/ColourExtractor')}>Colour Extractor</button>
      <button onClick={() => handleNavigation('/PaletteGenerator')}>Palette Generator</button>
    </div>
  );
};

const NavigationBar = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleResize = () => {
    const newIsMobile = window.innerWidth <= 768;

    if (isMobileMenuOpen && !newIsMobile) {
      setMobileMenuOpen(false);
    }

    setIsMobile(newIsMobile);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="nav-bar">
      <div className="nav-content">
        <button className="title-page" onClick={() => { navigate('/ColourExtractor'); closeMobileMenu(); }}>Paletä</button>

        {isMobile && (
          <>
            {/* <ColorSwitcher /> */}
            <button className="mobile-menu-btn" onClick={toggleMobileMenu} style={{ zIndex: isMobileMenuOpen ? 1001 : 1000, color: isMobileMenuOpen ? 'white' : 'black' }}>
              {isMobileMenuOpen ? <CloseIcon /> : 'Menu'}
              {/* { isMobileMenuOpen ? <CloseIcon /> : <MenuIcon /> } */}
            </button>

            {isMobileMenuOpen && (

              <div className="mobile-menu-overlay">
                <div className="mobile-menu-content">
                  <button onClick={() => { navigate('/About'); closeMobileMenu(); }}>About</button>
                  <button onClick={() => { navigate('/ColourExtractor'); closeMobileMenu(); }}>Colour Extractor</button>
                  <button onClick={() => { navigate('/PaletteGenerator'); closeMobileMenu(); }}>Palette Generator</button>
                </div>
              </div>
            )}
            {isMobileMenuOpen && <MobileMenu closeMenu={closeMobileMenu} />}
          </>
        )}

        {!isMobile && (
          <>
            <div className="links">
              <button onClick={() => { navigate('/About'); closeMobileMenu(); }}>About</button>
              <button onClick={() => { navigate('/ColourExtractor'); closeMobileMenu(); }}>Colour Extractor</button>
              <button onClick={() => { navigate('/PaletteGenerator'); closeMobileMenu(); }}>Palette Generator</button>
            </div>

            {/* <ColorSwitcher /> */}
          </>
        )}

        <ColorSwitcher />

      </div>
    </nav>
  );
};

export default NavigationBar;