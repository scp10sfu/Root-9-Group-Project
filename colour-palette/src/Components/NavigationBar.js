// NavigationBar.js
//import "./App.css";
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { createContext, useState } from 'react';
import './NavigationBar.css';
import { ReactComponent as CloseIcon } from '../images/icon-close-white.svg';

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


// const NavigationBar = () => {
//   // Router
//   const navigate = useNavigate();
//   const navigateToHome = () => { navigate('/'); };
//   const navigateToAbout = () => { navigate('/About'); };
//   const navigateToColourExtractor = () => { navigate('/ColourExtractor'); };
//   const navigateToPaletteGenerator = () => { navigate('/PaletteGenerator'); };
//   const navigateToMoodboardGenerator = () => { navigate('/MoodboardGenerator'); };
//   const navigateToNotFoundPage = () => { navigate('/NotFoundPage'); };

//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       const newIsMobile = window.innerWidth <= 768;

//       // Close the mobile menu if it's open and the screen width exceeds the threshold
//       if (isMobileMenuOpen && !newIsMobile) {
//         setMobileMenuOpen(false);
//       }

//       setIsMobile(newIsMobile);
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, [isMobileMenuOpen]);

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const renderLinks = () => {
//     if (isMobile) {
// //       return (
// //         <>
// //         <div class="hero">
// //   <h1>Fullscreen Menu</h1>
// //   <div class="menu-btn">
// //     <span></span>
// //     <span></span>

// //   </div>
// // </div> 

// //         <div className="menu active">
// //           <span className="btn-close">&times;</span>
// //           <ul className="links-container">
// //             {/* <li className="menu-title">MENU</li> */}
// //             <li>
// //               <a href="" className="home">HOME</a>
// //               <button href="" className="home" onClick={navigateToHome}>HOME</button>
// //             </li>
// //             <li>
// //               {/* <a href="" className="places">PLACES</a> */}
// //               <button href="" className="about" onClick={navigateToAbout}>ABOUT</button>
// //             </li>
// //             <li>
// //               <a href="" className="about">ABOUT</a>
// //             </li>
// //             <li>
// //               <a href="" className="contact">CONTACT</a>

// //             </li>

// //           </ul>
// //         </div>
// //         </>
// <>
// <div class="button_container" id="toggle"><span class="top"></span><span class="middle"></span><span class="bottom"></span></div>
// <div class="overlay" id="overlay">
//     <nav class="overlay-menu">
//         <ul>
//             <li><a href="#">Home</a></li>
//             <li><a href="#">About</a></li>
//             <li><a href="#">Work</a></li>
//             <li><a href="#">Contact</a></li>
//         </ul>
//     </nav>
// </div>
// </>
//       // );
//     } else {
//       return (
//         <nav className="nav-bar">
//           <div className='nav-content'>
//         <div className="links">
//           <button onClick={navigateToAbout}>About</button>
//           <button onClick={navigateToColourExtractor}>Colour Extractor</button>
//           <button onClick={navigateToPaletteGenerator}>Palette Generator</button>
//           <button onClick={navigateToMoodboardGenerator}>Moodboard Generator</button>
//         </div>
//         </div>
//         </nav>
//       );
//     }
//   };

//   // return (
//   //   <nav className={`nav-bar ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
//   //     <div className='nav-content'>
//   //       <button className="title-page" onClick={navigateToHome}>Paletä</button>

//   //       <div className={`menu-icon ${isMobileMenuOpen ? 'close-icon' : ''}`} onClick={toggleMobileMenu}>
//   //         {/* Hamburger icon or close icon */}
//   //         <div className="bar"></div>
//   //         <div className="bar"></div>
//   //         <div className="bar"></div>
//   //       </div>

//   //       <div className={`links ${isMobileMenuOpen ? 'mobile-links' : ''}`}>
//   //         <button onClick={navigateToAbout}>About</button>
//   //         <button onClick={navigateToColourExtractor}>Colour Extractor</button>
//   //         <button onClick={navigateToPaletteGenerator}>Palette Generator</button>
//   //         <button onClick={navigateToMoodboardGenerator}>Moodboard Generator</button>
//   //       </div>

//         {/* <div className="links">
//           <button onClick={navigateToAbout}>About</button>
//           <button onClick={navigateToColourExtractor}>Colour Extractor</button>
//           <button onClick={navigateToPaletteGenerator}>Palette Generator</button>
//           <button onClick={navigateToMoodboardGenerator}>Moodboard Generator</button>
        
//           <div class="menu-toggle">
//           <ion-icon name="menu"></ion-icon>
//         </div>
//         <div class="overlay">
//           <div class="close-btn">
//             <ion-icon name="close"></ion-icon>
//           </div>
//           <div class="menu">
//             <ul>
//               <li>
//                 <a href="#home">Home</a>
//               </li>
//               <li>
//                 <a href="#about">About</a>
//               </li>
//               <li>
//                 <a href="#projects">Projects</a>
//               </li>
//               <li>
//                 <a href="#contact">Contact</a>
//               </li>
//             </ul>
//           </div>
//         </div> */}


// //         return (
// //           <nav className={`nav-bar ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
// //             <div className='nav-content'>
// //               <button className="title-page" onClick={navigateToHome}>Paletä</button>
// //               {renderLinks()}
    
// //         <ColorSwitcher />

        
// //       </div>
// //     </nav>
// //   );
// // };



// return (
// <nav className="nav-bar">
//       <div className="nav-content">
//         <button className="title-page" onClick={() => { navigate('/'); closeMobileMenu(); }}>Paletä</button>

//         {isMobile ? (
//           <>
//             <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
//               {isMobileMenuOpen ? 'Close' : 'Menu'}
//             </button>
//             {isMobileMenuOpen && <MobileMenu closeMenu={closeMobileMenu} />}
//           </>
//         ) : (
//           <div className="links">
//             <button onClick={() => { navigate('/About'); closeMobileMenu(); }}>About</button>
//             <button onClick={() => { navigate('/ColourExtractor'); closeMobileMenu(); }}>Colour Extractor</button>
//             <button onClick={() => { navigate('/PaletteGenerator'); closeMobileMenu(); }}>Palette Generator</button>
//             <button onClick={() => { navigate('/MoodboardGenerator'); closeMobileMenu(); }}>Moodboard Generator</button>
//           </div>
//         )}

//         <ColorSwitcher />
//       </div>
//     </nav>
//   );
// };


// export default NavigationBar;

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
      <button onClick={() => handleNavigation('/MoodboardGenerator')}>Moodboard Generator</button>
    </div>
  );
};

const NavigationBar = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleResize = () => {
    const newIsMobile = window.innerWidth <= 800;

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
        <button className="title-page" onClick={() => { navigate('/'); closeMobileMenu(); }}>Paletä</button>

        {isMobile && (
          <>
            <button className="mobile-menu-btn" onClick={toggleMobileMenu} style={{ zIndex: isMobileMenuOpen ? 1001 : 1000, color: isMobileMenuOpen ? 'white' : 'black' }}>
              {isMobileMenuOpen ? <CloseIcon /> : 'Menu'}
            </button>
          
            {isMobileMenuOpen && (

            <div className="mobile-menu-overlay">
              <div className="mobile-menu-content">
              <button onClick={() => { navigate('/About'); closeMobileMenu(); }}>About</button>
            <button onClick={() => { navigate('/ColourExtractor'); closeMobileMenu(); }}>Colour Extractor</button>
            <button onClick={() => { navigate('/PaletteGenerator'); closeMobileMenu(); }}>Palette Generator</button>
            <button onClick={() => { navigate('/MoodboardGenerator'); closeMobileMenu(); }}>Moodboard Generator</button>
              </div>
            </div>
            )}
             {isMobileMenuOpen && <MobileMenu closeMenu={closeMobileMenu} />}
          </>
        )}

        {!isMobile && (
          <div className="links">
            <button onClick={() => { navigate('/About'); closeMobileMenu(); }}>About</button>
            <button onClick={() => { navigate('/ColourExtractor'); closeMobileMenu(); }}>Colour Extractor</button>
            <button onClick={() => { navigate('/PaletteGenerator'); closeMobileMenu(); }}>Palette Generator</button>
            <button onClick={() => { navigate('/MoodboardGenerator'); closeMobileMenu(); }}>Moodboard Generator</button>
          </div>
        )}

        <ColorSwitcher />
      </div>
    </nav>
  );
};

export default NavigationBar;