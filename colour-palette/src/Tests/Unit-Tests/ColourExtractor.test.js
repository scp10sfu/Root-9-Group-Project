import React from 'react'
import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import ColourExtractor from "../../Pages/ColourExtractor";
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// Mocking axios to prevent actual API calls during testing
jest.mock('axios');

jest.mock('colorthief', () => {
    return function fn() {return [[1,1,1]];}
});

test('Test for color extractor text # 1', ()=>{
    render(<ColourExtractor />)
    const title = screen.getByText("Colour Extractor");
    expect(title).toBeInTheDocument();
})

test('Test for color extractor text # 2', ()=>{
    render(<ColourExtractor />)
    const description = screen.getByText("Extract wonderful palettes from your image.");
    expect(description).toBeInTheDocument();
})

// describe('ColourExtractor Component', () => {
//     test('Renders ColourExtractor component', () => {
//       render(<ColourExtractor />);
//       // Ensure that the component renders without crashing
//       expect(screen.getByText('Colour Extractor')).toBeInTheDocument();
//     });
  
//     test('Handles image upload and extraction', async () => {
//       render(<ColourExtractor />);
  
//       // Mock the fetchColorName function to avoid actual API calls
//       jest.spyOn(global, 'fetchColorName').mockResolvedValue('MockedColor');
  
//       const file = new File(['(mock image)'], 'test.png', { type: 'image/png' });
  
//       // Simulate image upload
//       const fileInput = screen.getByLabelText('Click or drag file to this area to upload');
//       userEvent.upload(fileInput, file);
  
//       // Wait for the image extraction to complete
//       await screen.findByText('MockedColor');
  
//       // Ensure that the extracted colors are displayed
//       expect(screen.getByText('MockedColor')).toBeInTheDocument();
//     });

//     test('Handles number of colours change', async () => {
//         const { getByText } = render(<ColourExtractor />);

//     // Click on a number button to change the number of colors
//     const numberButton = getByText('6');
//     fireEvent.click(numberButton);

//     // Wait for the component to update based on the new number of colors
//     await waitFor(() => expect(getByText(/NUMBER OF COLOURS:/i)).toBeInTheDocument());
//   });

//   test('Non-image file upload, displaying a toast message', async () => {
//     const { getByLabelText, getByText } = render(<ColourExtractor />);

//     // Mock a non-image file (e.g., mp4)
//     const nonImageFile = new File(['mockVideoData'], 'mockVideo.mp4', { type: 'video/mp4' });

//     // Trigger file change event with a non-image file
//     const fileInput = getByLabelText('Click or drag file to this area to upload');
//     fireEvent.change(fileInput, { target: { files: [nonImageFile] } });

//     // Wait for the toast message indicating an error
//     await waitFor(() => {
//         expect(screen.getByText('Invalid file type! Please upload an image')).toBeInTheDocument();
//       });
//   });
  
//   });