import React from 'react'
import {render, screen} from "@testing-library/react";
import ColourExtractor from "../../Pages/ColourExtractor";
import '@testing-library/jest-dom';


test('Test for color extractor text', ()=>{
    render(<ColourExtractor />)
    const title = screen.getByText("Colour Extractor");
    expect(title).toBeInTheDocument();
})

test('Test for color extractor text', ()=>{
    render(<ColourExtractor />)
    const description = screen.getByText("Extract wonderful palettes from your image.");
    expect(description).toBeInTheDocument();
})
