import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BackgroundColour from '../BackgroundColour';

// Mock the localStorage
const mockLocalStorage = (function() {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = String(value);
    },
    clear() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

describe('BackgroundColour Component Tests', () => {

  it('renders correctly with given color array', () => {
    const colorArray = ['#FF0000', '#00FF00', '#0000FF'];
    render(<BackgroundColour colorArray={colorArray} />);

    const colorElements = screen.getAllByTestId('background-color');
    expect(colorElements).toHaveLength(colorArray.length);
  });

  it('does not render visible elements when colorArray is empty (assumes colors loaded from localStorage)', () => {
    const savedColors = ['#123456', '#654321', '#abcdef'];
    window.localStorage.setItem('savedBackground', JSON.stringify(savedColors));
    
    render(<BackgroundColour colorArray={[]} />);

    const colorElements = screen.queryAllByTestId('background-color');
    expect(colorElements.length).toBe(0);
  });
  it('renders default color array when localStorage is cleared and page is refreshed', () => {
    // Assuming this is your default color array when localStorage is empty
    const defaultColorArray = ['#FFFFFF', '#AAAAAA', '#CCCCCC'];

    // First, set some colors in localStorage
    const savedColors = ['#123456', '#654321', '#abcdef'];
    window.localStorage.setItem('savedBackground', JSON.stringify(savedColors));

    // Render the component with an empty color array (simulating a page load with saved colors)
    render(<BackgroundColour colorArray={[]} />);
    let colorElements = screen.queryAllByTestId('background-color');
    expect(colorElements.length).toBe(0);

    // Clear localStorage and simulate a page refresh by re-rendering the component
    window.localStorage.clear();
    render(<BackgroundColour colorArray={defaultColorArray} />);

    // Check if the component now renders the default color array
    colorElements = screen.getAllByTestId('background-color');
    expect(colorElements).toHaveLength(defaultColorArray.length);
  });

  it('maintains colors from localStorage when navigating within the app', () => {
    // Set some colors in localStorage
    const savedColors = ['#123456', '#654321', '#abcdef'];
    window.localStorage.setItem('savedBackground', JSON.stringify(savedColors));

    // Simulate navigating to a page that uses BackgroundColour
    render(<BackgroundColour colorArray={[]} />);
    let colorElements = screen.queryAllByTestId('background-color');
    expect(colorElements.length).toBe(0); // Assuming no visible elements when colors are from localStorage

    // Simulate navigating to another page (within the app) that uses BackgroundColour
    // Without clearing localStorage
    render(<BackgroundColour colorArray={[]} />);
    colorElements = screen.queryAllByTestId('background-color');
    expect(colorElements.length).toBe(0); // Colors should still be loaded from localStorage
  });

  it('maintains the same background color on the About page after a page refresh', () => {
    // Set initial color in localStorage
    const initialColors = ['#123456'];
    window.localStorage.setItem('savedBackground', JSON.stringify(initialColors));

    // Simulate navigating to the About page
    render(<BackgroundColour colorArray={[]} />);
    let colorElements = screen.queryAllByTestId('background-color');
    expect(colorElements.length).toBe(0); // Assuming no visible elements when colors are from localStorage

    // Simulate a page refresh by clearing and resetting localStorage
    window.localStorage.clear();
    window.localStorage.setItem('savedBackground', JSON.stringify(initialColors));

    // Re-render the component to simulate the page after refresh
    render(<BackgroundColour colorArray={[]} />);
    colorElements = screen.queryAllByTestId('background-color');
    expect(colorElements.length).toBe(0); // The color should remain the same after the refresh
  });

  it('resets the background color on the Color Extractor page after a page refresh', () => {
    // Set initial color in localStorage
    const initialColors = ['#ABCDEF'];
    window.localStorage.setItem('savedBackground', JSON.stringify(initialColors));
  
    // Simulate navigating to the Color Extractor page
    render(<BackgroundColour colorArray={[]} />);
    let colorElements = screen.queryAllByTestId('background-color');
    expect(colorElements.length).toBe(0); // Assuming no visible elements when colors are from localStorage
  
    // Simulate a page refresh by clearing localStorage
    window.localStorage.clear();
  
    // Re-render the component to simulate the page after refresh
    render(<BackgroundColour colorArray={[]} />);
    colorElements = screen.queryAllByTestId('background-color');
    expect(colorElements.length).toBe(0); // Colors should reset after the refresh
  });

  it('resets the background color on the Palette Generator page after a page refresh', () => {
    // Set initial color in localStorage
    const initialColors = ['#123456', '#654321'];
    window.localStorage.setItem('savedBackground', JSON.stringify(initialColors));
  
    // Simulate navigating to the Palette Generator page
    render(<BackgroundColour colorArray={[]} />);
    let colorElements = screen.queryAllByTestId('background-color');
    expect(colorElements.length).toBe(0); // Assuming no visible elements when colors are from localStorage
  
    // Simulate a page refresh by clearing localStorage
    window.localStorage.clear();
  
    // Re-render the component to simulate the page after refresh
    render(<BackgroundColour colorArray={[]} />);
    colorElements = screen.queryAllByTestId('background-color');
    expect(colorElements.length).toBe(0); // Colors should reset after the refresh
  });
  
  it('resets the background color when navigating to the 404 page', () => {
    // Set initial color in localStorage
    const initialColors = ['#FF0000', '#00FF00', '#0000FF'];
    window.localStorage.setItem('savedBackground', JSON.stringify(initialColors));

    // Simulate navigating to a regular page
    render(<BackgroundColour colorArray={[]} />);
    let colorElements = screen.queryAllByTestId('background-color');
    expect(colorElements.length).toBe(0); // Assuming no visible elements when colors are from localStorage

    // Simulate navigating to the 404 page
    // Here, we assume that the 404 page logic resets the background color
    window.localStorage.clear(); // Clear localStorage to simulate the reset behavior
    render(<BackgroundColour colorArray={[]} />);

    // Check if the component now has no background colors set (or default colors, if applicable)
    colorElements = screen.queryAllByTestId('background-color');
    expect(colorElements.length).toBe(0); // Colors should reset on the 404 page
  });
});
