import React from 'react'
import { BrowserRouter } from "react-router-dom";
import {render, screen} from "@testing-library/react";
import ColourExtractor from "../../Pages/ColourExtractor";
import '@testing-library/jest-dom';


test('Test for color extractor text', ()=>{
    render(<BrowserRouter><ColourExtractor /></BrowserRouter>)
    const title = screen.getByText(/Colour Extractor/i).closest('p');
    expect(title).toBeInTheDocument();
})

test('Test for color extractor text', ()=>{
    render(<BrowserRouter><ColourExtractor /></BrowserRouter>)
    const description = screen.getByText(/Extract wonderful palettes from your image./i).closest('p');
    expect(description).toBeInTheDocument();
})
