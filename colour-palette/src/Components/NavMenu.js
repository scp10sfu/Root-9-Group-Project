// NavMenu.js
import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './NavMenu.css';

const NavMenu = ({ isOpen, onStateChange, closeMenu }) => {
  return (
    
    <Menu isOpen={isOpen} onStateChange={onStateChange} customCrossIcon={false}>
      <a id="home" className="bm-item" href="/" onClick={closeMenu}>Home</a>
      <a id="about" className="bm-item" href="/about" onClick={closeMenu}>About</a>
      <a id="contact" className="bm-item" href="/contact" onClick={closeMenu}>Contact</a>
      {/* Add other links here */}
      
    </Menu>
  );
};

export default NavMenu;
