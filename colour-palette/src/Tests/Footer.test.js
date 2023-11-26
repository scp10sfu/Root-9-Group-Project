import React from 'react'
import {render, screen} from "@testing-library/react";
import Footer from "../Components/Footer";
import '@testing-library/jest-dom';

test('Checks if alt text is Paleta Logo', ()=> {
    render(<Footer/>);
    const linkElement = screen.getByAltText(/Paleta Logo/i);
    expect(linkElement).toBeInTheDocument();
});