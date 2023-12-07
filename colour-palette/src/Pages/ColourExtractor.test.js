import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ColourExtractor from './ColourExtractor'; // Adjust the import path as needed

describe('ColourExtractor Component', () => {
  it('changes the number of colors when a different option is selected', async () => {
    // Render the ColourExtractor component
    const { getByText, getByTestId } = render(<ColourExtractor />);

    // Find and click the button to change the number of colors (example: to 8)
    const buttonEightColors = getByText('8'); // Assuming you have text '8' on the button
    fireEvent.click(buttonEightColors);

    // Use waitFor to handle state update and re-rendering
    await waitFor(() => {
      // Assuming you have a way to check the current number of colors, like a data-testid
      const displayedColors = getByTestId('displayed-colors');
      expect(displayedColors.children.length).toBe(8); // Expect 8 color elements to be rendered
    });
  });
});
