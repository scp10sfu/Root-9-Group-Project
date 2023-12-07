import { rgbToHex, hexToRgb, rgbToCmyk, getTextColor, rgbToHsl } from './colorUtils';

describe('Color Utilities', () => {

  describe('rgbToHex', () => {
    test('converts basic colors correctly', () => {
      expect(rgbToHex(255, 0, 0)).toBe('#ff0000');
      expect(rgbToHex(0, 255, 0)).toBe('#00ff00');
      expect(rgbToHex(0, 0, 255)).toBe('#0000ff');
    });

    test('pads single digit hex values with zero', () => {
      expect(rgbToHex(1, 2, 3)).toBe('#010203');
    });

    test('handles maximum values', () => {
      expect(rgbToHex(255, 255, 255)).toBe('#ffffff');
    });
  });

  describe('rgbToCmyk', () => {
    test('converts RGB to CMYK correctly', () => {
      expect(rgbToCmyk(255, 0, 0)).toEqual([0, 100, 100, 0]);
    });

    test('throws error for invalid RGB values', () => {
      expect(() => rgbToCmyk(-1, 0, 0)).toThrow('Invalid RGB value');
      expect(() => rgbToCmyk(0, 256, 0)).toThrow('Invalid RGB value');
    });
  });

  describe('getTextColor', () => {
    test('returns dark text for light backgrounds', () => {
      expect(getTextColor('#ffffff')).toBe('rgba(18, 18, 18, 1)');
    });

    test('returns light text for dark backgrounds', () => {
      expect(getTextColor('#000000')).toBe('rgba(255, 255, 255, 1)');
    });

    test('handles invalid hex values', () => {
      expect(getTextColor('not a hex')).toBe('rgba(18, 18, 18, 1)');
    });
  });

  describe('rgbToHsl', () => {
    test('converts RGB to HSL correctly', () => {
      expect(rgbToHsl(255, 0, 0)).toEqual([0, 100, 50]);
    });
  });

  // Test suite for hexToRgb function
  describe('hexToRgb', () => {
    // Test case 1: Convert a valid hex code to RGB
    it('converts valid hex code to RGB', () => {
      const hexCode = '#00ff00';
      const expectedRgb = { r: 0, g: 255, b: 0 };
      const result = hexToRgb(hexCode);
      expect(result).toEqual(expectedRgb);
    });

    // Test case 2: Convert a hex code without a hash to RGB
    it('converts hex code without hash to RGB', () => {
      const hexCode = 'ff0000';
      const expectedRgb = { r: 255, g: 0, b: 0 };
      const result = hexToRgb(hexCode);
      expect(result).toEqual(expectedRgb);
    });

    // Test case 3: Convert a black hex code to RGB
    it('converts black hex code to RGB', () => {
      const hexCode = '#000000';
      const expectedRgb = { r: 0, g: 0, b: 0 };
      const result = hexToRgb(hexCode);
      expect(result).toEqual(expectedRgb);
    });

    // You can also add negative cases, e.g., testing with an invalid hex code
    it('returns null for invalid hex code', () => {
      const hexCode = 'invalidHex';
      const result = hexToRgb(hexCode);
      expect(result).toBeNull();
    });
  });


});
