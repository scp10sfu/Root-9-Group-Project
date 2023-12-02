// NumberButton.js


import React from 'react';

/**
* NumberButton Component
* A component representing a number button.
* @param {object} props - The props object.
* @param {number} props.number - The number to display on the button.
* @param {boolean} props.isActive - A flag indicating whether the button is active.
* @returns {JSX.Element} - The rendered NumberButton component.
*/

function NumberButton({ number, isActive, onClick }) {
    return (
        <button
            className={`number-button ${isActive ? 'active' : ''}`}
            onClick={() => onClick(number)}>
            {number}
        </button>
    );
}

export default NumberButton;