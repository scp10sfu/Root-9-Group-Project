import React from 'react'
import {render, screen} from "@testing-library/react";
import About from "../../Pages/About";
import '@testing-library/jest-dom';

test('Test first line' , () => {
        render(<About />)
        const line1 = screen.getByText("About Us");
        expect(line1).toBeInTheDocument();
})

test('Test second line' , () => {
    render(<About />)
    const line2 = screen.getByText("Get To Know More");
    expect(line2).toBeInTheDocument();
})

test('Test overview line' , () => {
    render(<About />)
    const line3 = screen.getByText("Overview");
    expect(line3).toBeInTheDocument();
})

test('Test fourth line' , () => {
    render(<About />)
    const line4 = screen.getByText("Our project is designed to cater to visual artists and individuals seeking creative inspiration.");
    expect(line4).toBeInTheDocument();
})

test('Test main features line' , () => {
    render(<About />)
    const line5 = screen.getByText("Main features");
    expect(line5).toBeInTheDocument();
})

test('Test contact line' , () => {
    render(<About />)
    const line6 = screen.getByText("Contact");
    expect(line6).toBeInTheDocument();
})
