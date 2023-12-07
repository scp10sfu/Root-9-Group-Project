import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For expect(...).toBeInTheDocument()
import ColourExtractor from './ColourExtractor';

jest.mock('colorthief', () => {
  return function fn() {return [[1,1,1]];}
});

describe('ColourExtractor component', () => {
  it('renders without errors', () => {
    render(<ColourExtractor />);
    // You can add more specific assertions here if needed.
    expect(screen.getByText('Colour Extractor')).toBeInTheDocument();
  });

  it('handles image upload and color extraction', async () => {
    render(<ColourExtractor />);

    // Mock image rendering
    const imageMock = new Image();
    Object.defineProperty(imageMock, 'complete', { writable: true, value: true });
    Object.defineProperty(imageMock, 'crossOrigin', { writable: true, value: 'anonymous' });
    jest.spyOn(imageMock, 'addEventListener');
    jest.spyOn(imageMock, 'removeEventListener');
    jest.spyOn(global, 'Image').mockImplementation(() => imageMock);

    // Mock a file input change event
    const file = new File(['(binary data)'], 'test-image.jpg', { type: 'image/jpeg' });
    const fileInput = screen.getByLabelText('Click or drag file to this area to upload');
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Wait for color extraction to complete (you might need to adjust the timeout)
    await waitFor(() => {
      // Add assertions to check if colors are displayed or other expected UI changes
      expect(screen.getByText('NUMBER OF COLOURS:')).toBeInTheDocument();
      expect(screen.getByText('HEX:')).toBeInTheDocument();
      expect(screen.getByText('RGB:')).toBeInTheDocument();
      expect(screen.getByText('CMYK:')).toBeInTheDocument();
    });

    // Clean up
    global.Image.mockRestore();
  });

  // You can add more test cases as needed
});
