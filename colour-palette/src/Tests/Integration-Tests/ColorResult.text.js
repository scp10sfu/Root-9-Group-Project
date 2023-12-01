import { render, screen } from "@testing-library/react";
import ColourExtractor from "../../Pages/ColourExtractor";
import '@testing-library/jest-dom';


const comparators = {
    imgname: "cat5.png",
    numcolors: 4,
    color1: "Sorrell Brown",
    color2: "Bistre",
    color3: "Spicy Mix",
    color4: "Quincy",
}

describe("Testing color extraction Feature", () => {

    test('Checks if image is correct image', () => {
        render(<ColourExtractor {...comparators}/>);
        const imgName = screen.getByAltText("Cat5.png").closest('img');
        expect(imgName).toBeInTheDocument();
    })

    test('Checks if number of colors selected is correct', () => {
        render(<ColourExtractor {...comparators}/>);
        const NumColors = screen.getByText(comparators.numcolors).closest('p');
        expect(NumColors).toBeInTheDocument();
    })

    test('Checks if first color is correct', () => {
        render(<ColourExtractor {...comparators}/>);
        const Color1 = screen.getByText(comparators.color1).closest('p');
        expect(Color1).toBeInTheDocument();
    })

    test('Checks if second color is correct', () => {
        render(<ColourExtractor {...comparators}/>);
        const Color2 = screen.getByText(comparators.color2).closest('p');
        expect(Color2).toBeInTheDocument();
    })

    test('Checks if third color is correct', () => {
        render(<ColourExtractor {...comparators}/>);
        const Color3 = screen.getByText(comparators.color3).closest('p');
        expect(Color3).toBeInTheDocument();
    })

    test('Checks if fourth color is correct', () => {
        render(<ColourExtractor {...comparators}/>);
        const Color4 = screen.getByText(comparators.color4).closest('p');
        expect(Color4).toBeInTheDocument();
    })
})