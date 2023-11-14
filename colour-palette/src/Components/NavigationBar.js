// NavigationBar.js

import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import './NavigationBar.css';

import About from '../Pages/About';
import Home from '../Pages/Home';
import ColourPicker from '../Pages/ColorPicker';
import PaletteGenerator from '../Pages/PaletteGenerator';
import MoodboardGenerator from '../Pages/MoodboardGenerator';

const NavigationBar = () => {
  // Router
  const navigate = useNavigate();
  const navigateToHome = () => { navigate('/'); };
  const navigateToAbout = () => { navigate('/About'); };
  const navigateToColourPicker = () => { navigate('/ColourPicker'); };
  const navigateToPaletteGenerator = () => { navigate('/PaletteGenerator'); };
  const navigateToMoodboardGenerator = () => { navigate('/MoodboardGenerator'); };
  const navigateToNotFoundPage = () => { navigate('/NotFoundPage'); };

  return (
    <nav className="nav-bar">
      <div className='nav-content'>
        <button className="title-page" onClick={navigateToHome}>Title</button>
        <div className="links">
          {/* <button onClick={navigateToHome}>Home</button> */}
          <button onClick={navigateToAbout}>About</button>
          <button onClick={navigateToColourPicker}>Colour Picker</button>
          <button onClick={navigateToPaletteGenerator}>Palette Generator</button>
          <button onClick={navigateToMoodboardGenerator}>Moodboard Generator</button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;