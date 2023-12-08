import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Toast from '../Toast';

describe('Toast Component Tests', () => {

  it('renders an info toast', () => {
    const message = 'Info message';
    render(<Toast type="info" message={message} onClose={() => {}} />);
    expect(screen.getByText(message)).toBeInTheDocument();
    expect(screen.getByText(message).parentNode).toHaveClass(' toast-content');
  });

  it('renders an error toast', () => {
    const message = 'Error message';
    render(<Toast type="error" message={message} onClose={() => {}} />);
    expect(screen.getByText(message)).toBeInTheDocument();
    expect(screen.getByText(message).parentNode).toHaveClass('toast-content');
  });

  it('renders a success toast', () => {
    const message = 'Success message';
    render(<Toast type="success" message={message} onClose={() => {}} />);
    expect(screen.getByText(message)).toBeInTheDocument();
    expect(screen.getByText(message).parentNode).toHaveClass('toast-content');
  });

  it('closes the toast when close button is clicked', () => {
    const onClose = jest.fn();
    const message = 'Test message';
    render(<Toast type="info" message={message} onClose={onClose} />);
    fireEvent.click(screen.getByTestId('toast-close'));
    expect(onClose).toHaveBeenCalled();
  });

});
