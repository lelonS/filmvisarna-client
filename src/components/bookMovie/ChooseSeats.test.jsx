import { render, screen, fireEvent } from '@testing-library/react';
import ChooseSeats from './ChooseSeats';

const exampleScreening = {
  "_id": "6554d8ffe1e758c3b57d55c5", "date": "2023-12-08", "time": "15:00", "theater": 1, "movieID": "6554d6d2e1e758c3b57d55c3", "theaterName": "Stora Salongen", "seats": [
    [{ "seat": false, "seatNumber": 1, "rating": 3 },
    { "seat": true, "seatNumber": 2, "rating": 4 },
    { "seat": false, "seatNumber": 3, "rating": 4 },
    { "seat": false, "seatNumber": 4, "rating": 4 }]]
}

// seat: true = booked
// { booked: false, row: 1, seat: 1, seatNumber: 1 }

describe('ChooseSeats', () => {
  test('renders the form correctly when seat selected', () => {
    render(<ChooseSeats screening={exampleScreening} seats={[{ booked: false, row: 1, seat: 1, seatNumber: 1 }]} setSeats={() => { }} />);

    // Assert that the form elements are rendered correctly
    expect(screen.getByText(/Antal biljetter:/i)).toBeInTheDocument();
    expect(screen.getByText(/Rad:/i)).toBeInTheDocument();
    expect(screen.getByText(/Plats:/i)).toBeInTheDocument();
  });

  test('renders the form correctly when seat not selected', () => {
    render(<ChooseSeats screening={exampleScreening} seats={[{ booked: false, row: 1, seat: 2, seatNumber: 2 }]} setSeats={() => { }} />);

    // Assert that the form elements are rendered correctly
    expect(screen.getByText(/Antal biljetter:/i)).toBeInTheDocument();
    expect(screen.getByText(/Plats:/i)).toBeInTheDocument();
    expect(screen.getByText(/Välj andra säten, ett eller flera säten av dom du försökte välja är redan bokade/i)).toBeInTheDocument();
  });
});