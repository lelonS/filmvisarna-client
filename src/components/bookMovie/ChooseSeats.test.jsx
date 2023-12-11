import React, { useState as useStateMock } from 'react'
import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import ChooseSeats from './ChooseSeats';

const exampleScreening = {
  "_id": "6554d8ffe1e758c3b57d55c5", "date": "2023-12-08", "time": "15:00", "theater": 1, "movieID": "6554d6d2e1e758c3b57d55c3", "theaterName": "Stora Salongen", "seats": [
    [{ "seat": false, "seatNumber": 1, "rating": 3 },
    { "seat": true, "seatNumber": 2, "rating": 4 },
    { "seat": false, "seatNumber": 3, "rating": 4 },
    { "seat": false, "seatNumber": 4, "rating": 4 }]]
}


jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}))



// seat: true = booked
// { booked: false, row: 1, seat: 1, seatNumber: 1 }

describe('ChooseSeats', () => {

  const setState = jest.fn();

  beforeEach(() => {
    useStateMock.mockImplementation(init => [init, setState]);
  });

  test('renders correctly when seat selected', () => {
    render(<ChooseSeats screening={exampleScreening} seats={[{ booked: false, row: 1, seat: 1, seatNumber: 1 }]} setSeats={() => { }} />);

    // Assert that the form elements are rendered correctly
    expect(screen.getByText(/Antal biljetter:/i)).toBeInTheDocument();
    expect(screen.getByText(/Rad:/i)).toBeInTheDocument();
    expect(screen.getByText(/Plats:/i)).toBeInTheDocument();
  });


  test('renders correctly when seat not selected', () => {
    // Override the useStateMock from the beforeEach (set the toggle to true which means that the seats are not available)
    useStateMock.mockImplementationOnce(() => [true, setState]);
    render(<ChooseSeats screening={{ ...exampleScreening }} seats={[]} setSeats={() => { }} />);

    // Assert that the form elements are rendered correctly
    expect(screen.getByText(/Antal biljetter:/i)).toBeInTheDocument();
    expect(screen.getByText(/Plats:/i)).toBeInTheDocument();
    expect(screen.getByText(/Välj andra säten, ett eller flera säten av dom du försökte välja är redan bokade/i)).toBeInTheDocument();
  });

  test('renders correctly when seat not selected snapshopt test', () => {
    // Override the useStateMock from the beforeEach (set the toggle to true which means that the seats are not available)
    useStateMock.mockImplementationOnce(() => [true, setState]);
    const tree = renderer.create(<ChooseSeats screening={{ ...exampleScreening }} seats={[]} setSeats={() => { }} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly snapshopt test', () => {
    const tree = renderer.create(<ChooseSeats screening={{ ...exampleScreening }} seats={[{ booked: false, row: 1, seat: 1, seatNumber: 1 }]} setSeats={() => { }} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});