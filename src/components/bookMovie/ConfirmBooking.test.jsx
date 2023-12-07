import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import ConfirmBooking from './ConfirmBooking';

// Test data imports
import { movie, screening, bookingResult } from '../../../test-mocks/index.js';

// console.log('movie', movie);

// Mocks
const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

window.scrollTo = jest.fn();

describe('ConfirmBooking', () => {

  test('renders the form correctly', () => {
    render(<ConfirmBooking nodeMailerError={''} bookingResult={bookingResult} screening={screening} movie={movie} />);

    // Assert that the form elements are rendered correctly
    expect(screen.getByText('Tack för din bokning!')).toBeInTheDocument();
    expect(screen.getByText('En bokningsbekräftelse har nu skickats till din email!')).toBeInTheDocument();
    expect(screen.getByText('Bokningsnummer:')).toBeInTheDocument();
    expect(screen.getByText('Film:')).toBeInTheDocument();
    expect(screen.getByText('Biljettyp:')).toBeInTheDocument();
    expect(screen.getByText('Rad:')).toBeInTheDocument();
    expect(screen.getByText('Plats:')).toBeInTheDocument();
    expect(screen.getByText('Salong:')).toBeInTheDocument();
    expect(screen.getByText('Datum:')).toBeInTheDocument();
    expect(screen.getByText('Epost:')).toBeInTheDocument();
    expect(screen.getByText('Pris:')).toBeInTheDocument();
  });

  test('renders correctly when mail fails', () => {
    render(<ConfirmBooking nodeMailerError={'error'} bookingResult={bookingResult} screening={screening} movie={movie} />);

    // Assert that the form elements are rendered correctly
    expect(screen.getByText('Tack för din bokning!')).toBeInTheDocument();
    expect(screen.getByText('Din boking har genomförts men vi hade problem att skicka ett mail till din epost')).toBeInTheDocument();
    expect(screen.getByText('Bokningsnummer:')).toBeInTheDocument();
    expect(screen.getByText('Film:')).toBeInTheDocument();
    expect(screen.getByText('Biljettyp:')).toBeInTheDocument();
    expect(screen.getByText('Rad:')).toBeInTheDocument();
    expect(screen.getByText('Plats:')).toBeInTheDocument();
    expect(screen.getByText('Salong:')).toBeInTheDocument();
    expect(screen.getByText('Datum:')).toBeInTheDocument();
    expect(screen.getByText('Epost:')).toBeInTheDocument();
    expect(screen.getByText('Pris:')).toBeInTheDocument();
  });


  test('renders the for correctly snapshot testing', () => {
    const tree = renderer.create(<ConfirmBooking nodeMailerError={''} bookingResult={bookingResult} screening={screening} movie={movie} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly when mail fails snapshot testing', () => {
    const tree = renderer.create(<ConfirmBooking nodeMailerError={'error'} bookingResult={bookingResult} screening={screening} movie={movie} />).toJSON();
    expect(tree).toMatchSnapshot();
  });


});