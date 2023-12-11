import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import TicketCounter from './TicketCounter';
import newDateFormat from '../../service/newDateFormat.js';

// Test data imports
import { movie, screening } from '../../../test-mocks/index.js';

// Mocks
const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

let mockObject = { adult: 2, child: 0, senior: 0, total: 2 };
jest.mock('react-easier', () => ({
  ...jest.requireActual('react-easier'),
  useStates: () => mockObject
}));

window.scrollTo = jest.fn();

describe('TicketCounter', () => {

  beforeEach(() => {
    mockObject = {
      adult: 2,
      child: 0,
      senior: 0,
      total: 2
    };
  });

  test('renders correctly', () => {
    render(<TicketCounter seats={[]} movie={movie} screening={screening} />);
    expect(screen.getByText('Välj antal biljetter')).toBeInTheDocument();
    expect(screen.getByText(/Vuxen/i)).toBeInTheDocument();
    expect(screen.getByText(/Barn/i)).toBeInTheDocument();
    expect(screen.getByText(/Pensionär/i)).toBeInTheDocument();
    expect(screen.getByTestId('adult-counter')).toHaveTextContent('2');
    expect(screen.getByTestId('child-counter')).toHaveTextContent('0');
    expect(screen.getByTestId('senior-counter')).toHaveTextContent('0');
    expect(screen.getByAltText('movie poster')).toBeInTheDocument();
    expect(screen.getByAltText('movie poster').getAttribute('src')).toBe('/img/' + movie.img_poster);
    expect(screen.getByText(movie.title)).toBeInTheDocument();
    expect(screen.getByText(newDateFormat(screening.date) + ' | ' + screening.time)).toBeInTheDocument();
    expect(screen.getByText(screening.theaterName)).toBeInTheDocument();
    expect(screen.getByText(movie.genre)).toBeInTheDocument();
    expect(screen.getByText(movie.length)).toBeInTheDocument();
    expect(screen.getByText(movie.ageRestriction === 0 ? 'Ingen åldersgräns' : movie.ageRestriction + ' år')).toBeInTheDocument();
  });

  test('renders correctly with snapshot', () => {
    const tree = renderer.create(<TicketCounter seats={[]} movie={movie} screening={screening} />).toJSON();
    expect(tree).toMatchSnapshot();
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
    expect(mockObject.total).toBe(5);
  });

  test('decreases counters correctly', () => {
    render(<TicketCounter seats={[]} setSeats={() => { }} />);

    const decreaseButtons = screen.getAllByRole('button', { name: '-' });
    for (let i = 0; i < decreaseButtons.length; i++) {
      fireEvent.click(decreaseButtons[i]);
    }
    expect(mockObject.adult).toBe(1);
    expect(mockObject.child).toBe(0);
    expect(mockObject.senior).toBe(0);
    expect(mockObject.total).toBe(1);
  });

  test('counter does not increase when increase-button is clicked if total is 6', () => {
    mockObject = {
      adult: 3,
      child: 1,
      senior: 1,
      total: 5
    };
    render(<TicketCounter seats={[]} setSeats={() => { }} />);

    const increaseButtons = screen.getAllByRole('button', { name: '+' });
    for (let i = 0; i < increaseButtons.length; i++) {
      fireEvent.click(increaseButtons[i]);
    }
    expect(mockObject.adult).toBe(4);
    expect(mockObject.child).toBe(1);
    expect(mockObject.senior).toBe(1);
    expect(mockObject.total).toBe(6);
  });
});