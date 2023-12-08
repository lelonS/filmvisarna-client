import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import TicketCounter from './TicketCounter';

// Mocks
const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

const mockObject = { adult: 2, child: 0, senior: 0, total: 2 };
jest.mock('react-easier', () => ({
  ...jest.requireActual('react-easier'),
  useStates: () => mockObject
}));

window.scrollTo = jest.fn();

describe('TicketCounter', () => {
  test('renders correctly', () => {
    render(<TicketCounter seats={[]} />);
    expect(screen.getByText('Välj antal biljetter')).toBeInTheDocument();
    expect(screen.getByText(/Vuxen/i)).toBeInTheDocument();
    expect(screen.getByText(/Barn/i)).toBeInTheDocument();
    expect(screen.getByText(/Pensionär/i)).toBeInTheDocument();
    expect(screen.getByTestId('adult-counter')).toHaveTextContent('2');
    expect(screen.getByTestId('child-counter')).toHaveTextContent('0');
    expect(screen.getByTestId('senior-counter')).toHaveTextContent('0');
  });

  test('increases counters correctly', () => {
    render(<TicketCounter seats={[]} setSeats={() => { }} />);

    const increaseButtons = screen.getAllByRole('button', { name: '+' });
    for (let i = 0; i < increaseButtons.length; i++) {
      fireEvent.click(increaseButtons[i]);
    }
    expect(mockObject.adult).toBe(3);
    expect(mockObject.child).toBe(1);
    expect(mockObject.senior).toBe(1);
  });

  test('decreases counters correctly', () => {
    render(<TicketCounter />);

  });
});