import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NumberButton from '../NumberButton';

test('NumberButton renders correctly and handles click event', () => {
  const number = 6;
  const onClickMock = jest.fn();
  
  const { getByText } = render(<NumberButton number={number} isActive={false} onClick={onClickMock} />);
  const buttonElement = getByText(number.toString());

  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveClass('number-button');
  expect(buttonElement).not.toHaveClass('active');

  fireEvent.click(buttonElement);

  expect(onClickMock).toHaveBeenCalledWith(number);
});

test('NumberButton renders correctly when isActive is true', () => {
  const number = 8;
  
  const { getByText } = render(<NumberButton number={number} isActive={true} onClick={() => {}} />);
  const buttonElement = getByText(number.toString());

  expect(buttonElement).toHaveClass('number-button');
  expect(buttonElement).toHaveClass('active');
});
