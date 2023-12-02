import React from 'react'
import {render, screen} from "@testing-library/react";
import {BrowserRouter} from 'react-router-dom';
import NavigationBar from "../../Components/NavigationBar";
import '@testing-library/jest-dom';

test('Checks about button',()=>{
    render(<BrowserRouter><NavigationBar/></BrowserRouter>);
    const linkElement = screen.getByText(/About/i).closest('a');
    expect(linkElement).toHaveAttribute("href", "/About");
});

test('Checks color extractor button',()=>{
    render(<BrowserRouter><NavigationBar/></BrowserRouter>);
    const linkElement = screen.getByText(/ColourExtractor/i).closest('a');
    expect(linkElement).toHaveAttribute("href", "/ColourExtractor");
});

test('Checks AI generator button',()=>{
    render(<BrowserRouter><NavigationBar/></BrowserRouter>);
    const linkElement = screen.getByText(/PaletteGenerator/i).closest('a');
    expect(linkElement).toHaveAttribute("href", "/PaletteGenerator");
});