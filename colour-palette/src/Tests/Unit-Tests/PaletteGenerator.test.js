import React from 'react'
import {render, screen} from "@testing-library/react";
import PaletteGenerator from "../../Pages/PaletteGenerator";
import '@testing-library/jest-dom';
import {showToast} from '../../Pages/PaletteGenerator';

jest.mock('colorthief', () => {
    return function fn() {return [[1,1,1]];}
});

test('Test for color extractor text' , ()=>{
    render(<PaletteGenerator />)
    const title = screen.getByText("AI Palette Generator");
    expect(title).toBeInTheDocument();
})

test('Test for color extractor text' , ()=>{
    render(<PaletteGenerator />)
    const description = screen.getByText("Generate wonderful palettes.");
    expect(description).toBeInTheDocument();
})

test('Check the toast message function', () => {
        const Toastmsg = 'info';
        const Toasttype = 'Copied to clipboard!';
        const result = showToast(Toastmsg,Toasttype);
        expect(result).stringContaining("Copied to clipboard!");
})