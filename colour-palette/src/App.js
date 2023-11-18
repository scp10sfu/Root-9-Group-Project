/**
 * Main application component.
 * App.js
 * @component
 */
import React, { createContext, useState } from 'react';
 // import './App.css';
// TODO: import css file for App component
import { Routes, Route, useNavigate} from 'react-router-dom';
import About from './Pages/About';
import Home from './Pages/Home';
import ColourExtractor from './Pages/ColourExtractor';
import PaletteGenerator from './Pages/PaletteGenerator';
import MoodboardGenerator from './Pages/MoodboardGenerator';
import NotFoundPage from './Pages/NotFoundPage';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ColorSwitcher from './Components/ColorSwitcher';
import NavigationBar from './Components/NavigationBar';

// TODO: add theme switcher to nav bar component

/*  navigation bar
 *  | Home (icon + title) | About | Colour Picker | Palette Generator | Moodboard Generator |
 *  
 *  tech menu
 *  | Color Switcher (icon) | Export (icon) |
 */

export const ColorContext = createContext(); // Create ColorContext

const App = () => {

  // Router
  const navigate = useNavigate(); // gets navigation and stores it
  const navigateToHome = () => { navigate('/'); };
  const navigateToAbout = () => { navigate('/About'); };
  const navigateToColourExtractor = () => { navigate('/ColourExtractor'); };
  const navigateToPaletteGenerator = () => { navigate('/PaletteGenerator'); };
  const navigateToMoodboardGenerator = () => { navigate('/MoodboardGenerator'); };
  const navigateToNotFoundPage = () => { navigate('/NotFoundPage'); };
  const navigateToModeSwitch = () => { navigate('/ModeSwitch'); };
  
  const [theme, setTheme] = useState("light"); // Default theme

  return (
    <ColorContext.Provider value={{ theme, setTheme }}>
      <div className={`App ${theme}`}>
        <NavigationBar />

        {/* Uncomment ColorSwitcher if you want it outside NavigationBar */}
        {/* <ColorSwitcher /> */}
        <div>
          <Routes>
            <Route path="/About" element={<About />} />
            <Route path="/" element={<Home />} />
            <Route path="/ColourExtractor" element={<ColourExtractor />} />
            <Route path="/PaletteGenerator" element={<PaletteGenerator />} />
            <Route path="/MoodboardGenerator" element={<MoodboardGenerator />} />
            {/* ... other routes ... */}
          </Routes>
        </div>
      </div> 
    </ColorContext.Provider>
  );
};



export default App;
