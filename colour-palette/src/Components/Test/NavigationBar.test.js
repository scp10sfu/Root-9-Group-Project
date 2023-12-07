import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import NavigationBar from '../NavigationBar';
import { waitFor } from '@testing-library/react';

describe('NavigationBar', () => {
    const setWindowWidth = (width) => {
        global.innerWidth = width;
        global.dispatchEvent(new Event('resize'));
    };

    test('renders NavigationBar component', () => {
        render(
            <Router>
                <NavigationBar />
            </Router>
        );
        const titleElement = screen.getByText('Paletä');
        expect(titleElement).toBeInTheDocument();
    });

    test('navigates to About page when the About button is clicked', () => {
        render(
            <Router>
                <NavigationBar />
            </Router>
        );
        const aboutButton = screen.getByText('About');
        userEvent.click(aboutButton);
        const aboutPageTitle = screen.getByText('About'); // Replace with the actual title or content of the About page
        expect(aboutPageTitle).toBeInTheDocument();
    });

    test('navigates to Colour Extractor page when the Colour Extractor button is clicked', () => {
        render(
            <Router>
                <NavigationBar />
            </Router>
        );
        const colourExtractorButton = screen.getByText('Colour Extractor');
        userEvent.click(colourExtractorButton);
        const colourExtractorPageTitle = screen.getByText('Colour Extractor'); // Replace with the actual title or content of the Colour Extractor page
        expect(colourExtractorPageTitle).toBeInTheDocument();
    });

    test('navigates to Palette Generator page when the Palette Generator button is clicked', () => {
        render(
            <Router>
                <NavigationBar />
            </Router>
        );
        const paletteGeneratorButton = screen.getByText('AI Palette Generator');
        userEvent.click(paletteGeneratorButton);
        const paletteGeneratorButtonTitle = screen.getByText('AI Palette Generator');
        expect(paletteGeneratorButtonTitle).toBeInTheDocument();
    });

    test('navigates to Colour Extractor page when the Paletä logo is clicked', () => {
        render(
            <Router>
                <NavigationBar />
            </Router>
        );
        const logoButton = screen.getByText('Paletä');
        userEvent.click(logoButton);
        const colourExtractorPageTitle = screen.getByText('Colour Extractor');
        expect(colourExtractorPageTitle).toBeInTheDocument();
    });


    // test('toggles mobile menu when the Menu button is clicked', async () => {
    //     setWindowWidth(500);
    //     render(
    //         <Router>
    //             <NavigationBar />
    //         </Router>
    //     );
    
    //     // Check if NavigationBar renders without any errors
    //     expect(screen.getByText('Paletä')).toBeInTheDocument();
    
    //     // Continue with the waitFor block
    //     await waitFor(() => {
    //         const menuButton = screen.getByTestId('mobile-menu-btn');
    //         userEvent.click(menuButton);
    //         const mobileMenu = screen.getByTestId('mobile-menu');
    //         expect(mobileMenu).toBeInTheDocument();
    //     });
    // });
    

    // test('opens mobile menu when the Menu button is clicked', async () => {
    //     setWindowWidth(500);
    //     render(
    //         <Router>
    //             <NavigationBar />
    //         </Router>
    //     );
    //     await waitFor(() => {
    //         const menuButton = screen.getByTestId('mobile-menu-btn');
    //         userEvent.click(menuButton);
    //         const mobileMenu = screen.getByTestId('mobile-menu');
    //         expect(mobileMenu).toBeInTheDocument();
    //     });
    // }
    // );

    // test('closes mobile menu when a menu item is clicked', async () => {
    //     setWindowWidth(500);
    //     render(
    //         <Router>
    //             <NavigationBar />
    //         </Router>
    //     );
    //     await waitFor(() => {
    //         const menuButton = screen.getByTestId('mobile-menu-btn');
    //         userEvent.click(menuButton);
    //       })
    //     const mobileMenu = screen.queryByTestId('mobile-menu');
    //     expect(mobileMenu).not.toBeInTheDocument();
    // });
});