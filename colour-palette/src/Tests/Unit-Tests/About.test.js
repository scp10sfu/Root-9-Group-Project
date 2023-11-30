import React from 'react'
import {render, screen} from "@testing-library/react";
import About from "../../Pages/About";
import '@testing-library/jest-dom';

test('Test first line' , () => {
        render(<About />)
        const line1 = screen.getByText("About Us").closest('p');
        expect(line1).toBeInTheDocument();
})

test('Test second line' , () => {
    render(<About />)
    const line2 = screen.getByText("Get To Know More").closest('p');
    expect(line2).toBeInTheDocument();
})

test('Test third line' , () => {
    render(<About />)
    const line3 = screen.getByText("Overview").closest('p');
    expect(line3).toBeInTheDocument();
})

test('Test fourth line' , () => {
    render(<About />)
    const line4 = screen.getByText("Our project is designed to cater to visual artists and individuals seeking creative inspiration.").closest('p');
    expect(line4).toBeInTheDocument();
})