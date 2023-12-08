import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock ColorThief before importing the ColourExtractor component
jest.mock('colorthief', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getPalette: () => [[255, 0, 0], [0, 255, 0], [0, 0, 255]],
      getColor: () => [255, 255, 255]
    };
  });
});

import ColourExtractor from './ColourExtractor';

describe('ColourExtractor Component Integration Test', () => {
  it('renders the ColourExtractor component', () => {
    render(<ColourExtractor />);
    expect(screen.getByText('Colour Extractor')).toBeInTheDocument();
  });

  it('handles image file upload', async () => {
    render(<ColourExtractor />);
    const fileInput = screen.getByLabelText(/click or drag file to this area to upload/i);

    // Create a dummy file
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });

    // Simulate file upload
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Wait for the file to be processed (adjust as needed for your component's behavior)
    await waitFor(() => expect(screen.queryByText(/uploading.../i)).not.toBeInTheDocument());

    // Check if the image preview is displayed
    expect(screen.getByAltText('To extract colors from')).toBeInTheDocument();
  });

  it('extracts colors from the image', async () => {
    render(<ColourExtractor />);
    const fileInput = screen.getByLabelText(/click or drag file to this area to upload/i);

    // Create a dummy file
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });

    // Simulate file upload
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Wait for color extraction
    await waitFor(() => expect(screen.getByText(/extracting colors.../i)).toBeInTheDocument());

    // Check if color boxes are displayed
    // You need to adjust this line based on how your color boxes are rendered
    expect(screen.queryAllByRole('color-box')).not.toHaveLength(0);
  });

  // Add more tests as needed for other interactions and scenarios
});
