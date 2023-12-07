import React from 'react'
import {render, screen, fireEvent, act} from "@testing-library/react";
import {BrowserRouter} from 'react-router-dom';
import NavigationBar from "../../Components/NavigationBar";
import '@testing-library/jest-dom';

test('Checks about button',()=>{
    render(<BrowserRouter><NavigationBar/></BrowserRouter>);
    const linkElement = screen.getByText(/About/i);
    expect(linkElement).toHaveAttribute("href", "/About");
});

test('Checks color extractor button',()=>{
    render(<BrowserRouter><NavigationBar/></BrowserRouter>);
    const linkElement = screen.getByText(/ColourExtractor/i);;
    expect(linkElement).toHaveAttribute("href", "/ColourExtractor");
});

test('Checks AI generator button',()=>{
    render(<BrowserRouter><NavigationBar/></BrowserRouter>);
    const linkElement = screen.getByText(/PaletteGenerator/i);
    expect(linkElement).toHaveAttribute("href", "/PaletteGenerator");
});


describe('NavigationBar component', () => {
    it('Renders NavigationBar component', () => {
      render(
        <Router>
          <NavigationBar />
        </Router>
      );
      expect(screen.getByText('Paletä')).toBeInTheDocument();
    });

    it('Toggles mobile menu on button click', () => {
        resizeWindow(500);

        render(
            <Router>
              <NavigationBar />
            </Router>
          );
      
          const menuButton = screen.getByText('Menu');
          fireEvent.click(menuButton);
      
          expect(screen.getByText('About')).toBeInTheDocument();
          expect(screen.getByText('Colour Extractor')).toBeInTheDocument();
          expect(screen.getByText('AI Palette Generator')).toBeInTheDocument();
        });

    it('Arranges menu items in columns on mobile', () => {
        resizeWindow(500);

        render(
            <Router>
                <NavigationBar />
            </Router>
        );

        const menuButton = screen.getByText('Menu');
        fireEvent.click(menuButton);

        const mobileMenu = screen.getByTestId('mobile-menu');
        const columns = mobileMenu.getElementsByClassName('mobile-menu-content');

        expect(columns.length).toBe(3); // Assuming there are three menu items

        // Add more specific assertions about the arrangement as needed
    });

    it('Closes mobile menu with columns on link click', () => {
        resizeWindow(500);
    
        render(
          <Router>
            <NavigationBar />
          </Router>
        );
    
        const menuButton = screen.getByText('Menu');
        fireEvent.click(menuButton);
    
        const aboutLink = screen.getByText('About');
        fireEvent.click(aboutLink);

        expect(screen.getByTestId('mobile-menu-content')).not.toBeInTheDocument();
      });
    });