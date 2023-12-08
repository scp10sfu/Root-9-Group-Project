/**
 * Main application component.
 * App.js
 * @component
 */
import React, { createContext, useState } from 'react';
import { Routes, Route, useNavigate} from 'react-router-dom';
import About from './Pages/About';
import {ColourExtractor} from './Pages/ColourExtractor';
import PaletteGenerator from './Pages/PaletteGenerator';
import NotFoundPage from './Pages/NotFoundPage';
import NavigationBar from './Components/NavigationBar';


export const ColorContext = createContext(); // Create ColorContext

const App = () => {

  // Router
  const navigate = useNavigate(); // gets navigation and stores it
  const navigateToHome = () => { navigate('/'); };
  const navigateToAbout = () => { navigate('/About'); };
  const navigateToColourExtractor = () => { navigate('/ColourExtractor'); };
  const navigateToPaletteGenerator = () => { navigate('/PaletteGenerator'); };
  const navigateToNotFoundPage = () => { navigate('/NotFoundPage'); };
  const navigateToModeSwitch = () => { navigate('/ModeSwitch'); };
  
  const [theme, setTheme] = useState("light"); // Default theme

  return (
    <ColorContext.Provider value={{ theme, setTheme }}>
      <div className={`App ${theme}`}>
        <NavigationBar />
        <div>
          <Routes>
            <Route path="/" element={<ColourExtractor />} />
            <Route path="/About" element={<About />} />
            <Route path="/ColourExtractor" element={<ColourExtractor />} />
            <Route path="/PaletteGenerator" element={<PaletteGenerator />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div> 
    </ColorContext.Provider>
  );
};



export default App;
