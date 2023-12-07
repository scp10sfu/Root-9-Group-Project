import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import ColorThief from 'colorthief';
import ColourExtractor from './ColourExtractor'; // Adjust the import path as needed

// Mocking axios and ColorThief
jest.mock('axios');
jest.mock('colorthief');

// Mock implementation for ColorThief
ColorThief.mockImplementation(() => {
  return {
    getPalette: () => [[255, 0, 0], [0, 255, 0], [0, 0, 255]],
    getColor: () => [255, 255, 255]
  };
});

// Mock implementation for axios
axios.get.mockResolvedValue({ data: { name: { value: 'Mocked Color Name' } } });

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
    window.FileReader = jest.fn().mockImplementation(() => {
      return {
        readAsDataURL: jest.fn(() => this.result = 'data:image/png;base64,ChuckNorrisEncodedImage'),
        onload: jest.fn(),
      };
    });

    const fileInput = screen.getByLabelText(/Click or drag file to this area to upload/i);
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Check for image preview load
    await waitFor(() => expect(screen.getByAltText('To extract colors from')).toBeInTheDocument());
  });

  test('extracts colors and displays color boxes', async () => {
    render(<ColourExtractor />);

    // Simulate file upload
    const fileInput = screen.getByLabelText(/Click or drag file to this area to upload/i);
    fireEvent.change(fileInput, { target: { files: [new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })] } });

    // Check if color boxes are rendered after extraction
    await waitFor(() => expect(screen.getAllByTestId('color-box')).toHaveLength(3)); // Assuming 3 color boxes
  });

  test('changes the number of colors to display when buttons are clicked', async () => {
    render(<ColourExtractor />);

    const buttonSixColors = screen.getByRole('button', { name: /6/i });
    fireEvent.click(buttonSixColors);

    await waitFor(() => {
      expect(screen.queryAllByTestId('color-box')).toHaveLength(6);
    });
  });

  // Additional tests can be added here
});
