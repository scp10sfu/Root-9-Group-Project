import React from 'react'
import {render, screen} from "@testing-library/react";
import PaletteGenerator from "../../Pages/PaletteGenerator";
import '@testing-library/jest-dom';
import {fetchColorName} from '../colorutils';

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

test('Check if the fetched color name is correct', () => {
        const hex = '#C1DE32';
        const expectedname = 'PEAR';
        const result = fetchColorName(hex);
        expect(result).toBe(expectedname);
})