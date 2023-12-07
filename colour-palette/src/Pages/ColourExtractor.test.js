import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import ColorThief from 'colorthief';
import ColourExtractor from './ColourExtractor'; // Adjust the import path as needed

// Mocking axios
jest.mock('axios');
axios.get.mockImplementation(() =>
  Promise.resolve({ data: { name: { value: 'Mocked Color Name' } } })
);

// Mocking ColorThief
jest.mock('colorthief', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getPalette: jest.fn(() => [[255, 0, 0], [0, 255, 0], [0, 0, 255]]),
      getColor: jest.fn(() => [255, 255, 255])
    };
  });
});

describe('ColourExtractor Component Tests', () => {
  test('renders the component correctly', () => {
    render(<ColourExtractor />);
    expect(screen.getByText(/Colour Extractor/i)).toBeInTheDocument();
  });

  test('handles file upload', async () => {
    render(<ColourExtractor />);
    
    // Create a fake file
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

    // Mock FileReader
    global.FileReader = jest.fn(() => {
      let onload = null;
      return {
        readAsDataURL: jest.fn(() => onload()),
        onload
      };
    });
    const fileReaderInstance = new FileReader();
    fileReaderInstance.onload = jest.fn();

    const fileInput = screen.getByLabelText(/Click or drag file to this area to upload/i);
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Mocking FileReader behavior
    fileReaderInstance.onload();

    // Add more assertions to ensure the file upload is handled correctly
  });

  // More tests here for different functionalities and scenarios

});
