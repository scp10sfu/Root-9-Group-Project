// Inte1.test.js
import { extractColors } from './Inte1';
import axios from 'axios';

// Revised mock implementation in your test file
// jest.mock('colorthief', () => {
//   return jest.fn().mockImplementation(() => {
//     return {
//       getPalette: jest.fn(() => [
//         [255, 0, 0], [0, 255, 0], [0, 0, 255]
//       ]),
//       getColor: jest.fn(() => [255, 255, 255]),
//     };
//   });
// });

// // Ensure the mock for colorUtils returns valid data
// jest.mock('./colorUtils', () => ({
//   rgbToHex: jest.fn(() => '#ffffff'),
//   rgbToCmyk: jest.fn(() => '0,0,0,0'),
//   fetchColorName: jest.fn(() => 'White'),
// }));
// describe('Color Extraction Functions', () => {
//   // Mocks for state update functions
//   const mockSetIsLoadingAndExtracting = jest.fn();
//   const mockSetColors = jest.fn();
//   const mockSetBackgroundStyle = jest.fn();

//   test('extractColors should extract colors from an image reference', async () => {
//     const imgRef = { current: { complete: true } }; // Mock image ref
//     await extractColors(imgRef, mockSetIsLoadingAndExtracting, mockSetColors, mockSetBackgroundStyle);
//     expect(mockSetIsLoadingAndExtracting).toHaveBeenCalledWith(true);
//     expect(mockSetColors).toHaveBeenCalled();
//     expect(mockSetBackgroundStyle).toHaveBeenCalled();
//   });

//   test('validFileType should validate file type', () => {
//     const fileTypes = ["image/jpeg", "image/png"];
//     const file = { type: 'image/jpeg' }; // Mock file
//     expect(validFileType(file, fileTypes)).toBeTruthy();
//   });

//   test('handleImageChange processes file upload', async () => {
//     const mockEvent = { target: { files: [{ size: 1024, type: 'image/jpeg' }] } };
//     const mockSetImage = jest.fn();
//     const mockSetIsImagePreviewActive = jest.fn();
//     const MAX_FILE_SIZE_MB = 10;

//     await handleImageChange(mockEvent, mockSetImage, mockSetIsLoadingAndExtracting, mockSetIsImagePreviewActive, mockSetBackgroundStyle, MAX_FILE_SIZE_MB);

//     expect(mockSetIsLoadingAndExtracting).toHaveBeenCalledWith(true);
//     expect(mockSetImage).toHaveBeenCalled();
//     expect(mockSetIsImagePreviewActive).toHaveBeenCalledWith(false);
//     expect(mockSetBackgroundStyle).toHaveBeenCalled();
//   });

//   // Add more tests as needed
// });

import { fetchColorName } from './fetchColor'; // Adjust the path to point to fetchColor.js

jest.mock('axios');

describe('fetchColorName', () => {
  // Mock console.error to suppress error logs in test output
  const originalConsoleError = console.error;
  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });


  it('should return the color name for a valid hex code', async () => {
    // Simulate a successful API response
    const hex = '#ff0000';
    const mockResponse = { data: { name: { value: 'Red' } } };
    axios.get.mockResolvedValue(mockResponse);

    const colorName = await fetchColorName(hex);
    expect(colorName).toBe('Red');
  });

  it('should return "Unknown" for an API error', async () => {
    // Simulate an API error
    axios.get.mockRejectedValue(new Error('API error'));

    const colorName = await fetchColorName('#ff0000');
    expect(colorName).toBe('Unknown');

    // Optionally, you can add an assertion to check if console.error was called
    expect(console.error).toHaveBeenCalledWith(expect.any(String), expect.any(Error));
  });

  // Additional test cases can be added here
});

describe('fetchColorName', () => {
  // An array of color test cases with hex codes and expected color names
  const colorTests = [
    { hex: '#ff0000', name: 'Red' },
    { hex: '#00ff00', name: 'Lime' },
    { hex: '#0000ff', name: 'Blue' },
    { hex: '#ffff00', name: 'Yellow' },
    { hex: '#ff00ff', name: 'Magenta' },
    // Add more colors as needed
  ];

  colorTests.forEach(({ hex, name }) => {
    it(`should return the color name for hex code ${hex}`, async () => {
      // Simulate a successful API response
      const mockResponse = { data: { name: { value: name } } };
      axios.get.mockResolvedValue(mockResponse);

      const colorName = await fetchColorName(hex);
      expect(colorName).toBe(name);
    });
  });
});