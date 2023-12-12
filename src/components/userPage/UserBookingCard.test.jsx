import React, { useState as useStateMock } from 'react'
import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import UserBookingCard from './UserBookingCard';

import { booking } from '../../../test-mocks/index.js';

// jest.mock('react', () => ({
//   ...jest.requireActual('react'),
//   useState: jest.fn(),
// }))





describe('UserBookingCard', () => {

  function expectBaseElementsToBeRendered() {
    let movie = booking.movie
    expect(screen.getByText(RegExp(movie.title, 'i'))).toBeInTheDocument();
    expect(screen.getByText('BokningsNr: ' + booking.bookingId)).toBeInTheDocument();
    expect(screen.getByAltText(`poster of the movie: ${booking.movie.title}`).getAttribute('src')).toBe('/img/' + movie.img_poster);
  }

  test('renders correctly when collapsed', () => {
    render(<UserBookingCard booking={booking} />);
    // Assert that the form elements are rendered correctly
    expectBaseElementsToBeRendered();
    // Expand buttons
    expect(screen.getByText('Mer info')).toBeInTheDocument();
    expect(screen.getByAltText('expand more icon')).toBeInTheDocument();
    expect(screen.queryByText('Mindre')).not.toBeInTheDocument();
    expect(screen.queryByAltText('expand less icon')).not.toBeInTheDocument();
  });

  test('renders correctly when expanded', () => {
    render(<UserBookingCard booking={booking} />);
    fireEvent.click(screen.getByText('Mer info'));

    // Assert that the form elements are rendered correctly
    expectBaseElementsToBeRendered();

    // Expand buttons
    expect(screen.getByText('Mindre')).toBeInTheDocument();
    expect(screen.getByAltText('expand less icon')).toBeInTheDocument();
    expect(screen.queryByText('Mer info')).not.toBeInTheDocument();
    expect(screen.queryByAltText('expand more icon')).not.toBeInTheDocument();

    // More info info
    expect(screen.getByRole('button', { name: 'Avboka' })).toBeInTheDocument();

    expect(screen.getByText(booking.screening.theaterName)).toBeInTheDocument();
    expect(screen.getByText('Rad:')).toBeInTheDocument();
    expect(screen.getByText('Plats:')).toBeInTheDocument();
    expect(screen.getByText('Pris:')).toBeInTheDocument();
    expect(screen.getByText('Status:')).toBeInTheDocument();
  });

  test('clicking Avboka button calls setCancelBooking and setToggle', () => {
    const setCancelBooking = jest.fn();
    const setToggle = jest.fn();
    render(<UserBookingCard booking={booking} setCancelBooking={setCancelBooking} setToggle={setToggle} />);
    fireEvent.click(screen.getByText('Mer info'));
    fireEvent.click(screen.getByRole('button', { name: 'Avboka' }));
    expect(setCancelBooking).toHaveBeenCalledTimes(1);
    expect(setCancelBooking).toHaveBeenCalledWith(booking);
    expect(setToggle).toHaveBeenCalledTimes(1);
  });

});