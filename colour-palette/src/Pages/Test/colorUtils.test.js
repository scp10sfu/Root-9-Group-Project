import { rgbToHex, rgbToCmyk, getTextColor, rgbToHsl } from './colorUtils';

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

});
