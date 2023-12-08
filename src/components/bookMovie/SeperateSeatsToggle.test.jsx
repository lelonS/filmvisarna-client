// Seperate is not a word, it should be separate

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import SeperateSeatsToggle from './SeperateSeatsToggle';
import { useStates } from 'react-easier';


// Mocks
const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

const mockObject = { toggle: undefined };

jest.mock('react-easier', () => ({
  ...jest.requireActual('react-easier'),
  useStates: jest.fn().mockImplementation(() => mockObject)
}));



window.scrollTo = jest.fn();

describe('SeperateSeatsToggle', () => {

  test('renders correctly', () => {
    render(<SeperateSeatsToggle />);

    // Check that useStates is called with correct parameters
    expect(useStates).toHaveBeenCalledTimes(1);
    expect(useStates).toHaveBeenCalledWith('toggleSeparateSeats', { toggle: false });

    expect(screen.getByText('Välj separata platser')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();

  });

  test('renders correctly with snapshot', () => {
    const tree = renderer.create(<SeperateSeatsToggle />).toJSON();
    expect(tree).toMatchSnapshot();

  });

  test('updates input values correctly', () => {
    const setSeats = jest.fn();
    render(<SeperateSeatsToggle setSeats={setSeats} />);

    const checkbox = screen.getByRole('checkbox');

    // Simulate changing checkbox using fireEvent
    fireEvent.click(checkbox);
    expect(mockObject.toggle).toBe(true);
    fireEvent.click(checkbox);
    expect(mockObject.toggle).toBe(false);

    expect(setSeats).toHaveBeenCalledTimes(2);
    expect(setSeats).toHaveBeenCalledWith([]);
  });

});