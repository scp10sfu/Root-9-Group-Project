import React from 'react'
import {render, screen, fireEvent} from "@testing-library/react";
import {BrowserRouter} from 'react-router-dom';
import NavigationBar from "../../Components/NavigationBar";
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

test('Checks about button navigation', () => {
  render(
    <BrowserRouter>
      <NavigationBar />
    </BrowserRouter>
  );

  // Mock the useNavigate hook
  const mockNavigate = jest.fn();
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  }));

  // Click the "About" button
  fireEvent.click(screen.getByText(/About/i));

  // Ensure useNavigate was called with the correct route
  expect(mockNavigate.mock.instances[0]).toHaveBeenCalledWith('/About');
});

test('Checks color extractor button navigation', () => {
  render(
    <BrowserRouter>
      <NavigationBar />
    </BrowserRouter>
  );

  const mockNavigate = jest.fn();
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  }));

  fireEvent.click(screen.getByText(/Colour Extractor/i));

  expect(mockNavigate).toHaveBeenCalledWith('/ColourExtractor');
});

test('Checks AI generator button navigation', () => {
  render(
    <BrowserRouter>
      <NavigationBar />
    </BrowserRouter>
  );

  const mockNavigate = jest.fn();
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  }));

  fireEvent.click(screen.getByText(/AI Palette Generator/i));

  expect(mockNavigate).toHaveBeenCalledWith('/PaletteGenerator');
});



// describe('NavigationBar component', () => {
//     it('Renders NavigationBar component', () => {
//       render(
//         <Router>
//           <NavigationBar />
//         </Router>
//       );
//       expect(screen.getByText('Paletä')).toBeInTheDocument();
//     });

//     it('Toggles mobile menu on button click', () => {
//         resizeWindow(500);

//         render(
//             <Router>
//               <NavigationBar />
//             </Router>
//           );
      
//           const menuButton = screen.getByText('Menu');
//           fireEvent.click(menuButton);
      
//           expect(screen.getByText('About')).toBeInTheDocument();
//           expect(screen.getByText('Colour Extractor')).toBeInTheDocument();
//           expect(screen.getByText('AI Palette Generator')).toBeInTheDocument();
//         });

//     it('Arranges menu items in columns on mobile', () => {
//         resizeWindow(500);

//         render(
//             <Router>
//                 <NavigationBar />
//             </Router>
//         );

//         const menuButton = screen.getByText('Menu');
//         fireEvent.click(menuButton);

//         const mobileMenu = screen.getByTestId('mobile-menu');
//         const columns = mobileMenu.getElementsByClassName('mobile-menu-content');

//         expect(columns.length).toBe(3); // Assuming there are three menu items

//         // Add more specific assertions about the arrangement as needed
//     });

//     it('Closes mobile menu with columns on link click', () => {
//         resizeWindow(500);
    
//         render(
//           <Router>
//             <NavigationBar />
//           </Router>
//         );
    
//         const menuButton = screen.getByText('Menu');
//         fireEvent.click(menuButton);
    
//         const aboutLink = screen.getByText('About');
//         fireEvent.click(aboutLink);

//         expect(screen.getByTestId('mobile-menu-content')).not.toBeInTheDocument();
//       });
//     });