import React from 'react'
import {render, screen} from "@testing-library/react";
import PaletteGenerator from "../../Pages/PaletteGenerator";
import '@testing-library/jest-dom';

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