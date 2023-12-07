/*import React from 'react'
import {render, screen} from "@testing-library/react";
import Footer from "../Components/Footer";
import '@testing-library/jest-dom';

test('Checks if alt text is Paleta Logo', ()=> {
    render(<Footer/>);
    const linkElement = screen.getByAltText(/Paleta Logo/i);
    expect(linkElement).toBeInTheDocument();
});*/

import React from 'react'
import {render, screen} from "@testing-library/react";
import PaletteGenerator from "../Pages/PaletteGenerator";
import '@testing-library/jest-dom';
import * as axios from "axios";

// Mock out all top level functions, such as get, put, delete and post:
jest.mock("axios");

jest.mock('colorthief', () => {
    return function fn() {return [[1,1,1]];}
});

test("mock response", () => {
  axios.post.mockImplementation(() => Promise.resolve({ data: { fullResponse: { "hello": "hello" } } }));
  render(<PaletteGenerator />)
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