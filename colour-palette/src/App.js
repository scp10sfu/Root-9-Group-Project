// App.js

import React, { createContext, useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import About from './Pages/About';
import Home from './Pages/Home';
import ColourPicker from './Pages/ColorPicker';
import PaletteGenerator from './Pages/PaletteGenerator';
import MoodboardGenerator from './Pages/MoodboardGenerator';
// import NotFoundPage from './Pages/NotFoundPage';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ColorSwitcher from './Components/ColorSwitcher';

// Create ColorContext
export const ColorContext = createContext(); // Create ColorContext

const App = () => {

  // Router
  const navigate = useNavigate();
  const navigateToHome = () => { navigate('/'); };
  const navigateToAbout = () => { navigate('/About'); };
  const navigateToColourPicker = () => { navigate('/ColourPicker'); };
  const navigateToPaletteGenerator = () => { navigate('/PaletteGenerator'); };
  const navigateToMoodboardGenerator = () => { navigate('/MoodboardGenerator'); };
  // const navigateToNotFoundPage = () => { navigate('/NotFoundPage'); };

  return (

    <div className="App">
      {/* <ColorSwitcher /> */}

      <Header />

      <div>
        <div>
          {/* <Header /> */}
          <button onClick={navigateToHome}>Home</button>
          <button onClick={navigateToAbout}>About</button>
          <button onClick={navigateToColourPicker}>Colour Picker</button>
          <button onClick={navigateToPaletteGenerator}>Palette Generator</button>
          <button onClick={navigateToMoodboardGenerator}>Moodboard Generator</button>
          {/* <Footer /> */}
          <Routes>
            <Route path="/About" element={<About />} />
            <Route path="/" element={<Home />} />
            <Route path="/ColourPicker" element={<ColourPicker />} />
            <Route path="/PaletteGenerator" element={<PaletteGenerator />} />
            <Route path="/MoodboardGenerator" element={<MoodboardGenerator />} />
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
  );
}

// function Home() {
//   return <h2></h2>;
// }

export default App;