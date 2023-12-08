import axios from 'axios';
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