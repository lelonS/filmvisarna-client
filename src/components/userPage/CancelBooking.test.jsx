import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer';
import CancelBooking from './CancelBooking.jsx';
import newDateFormat from '../../service/newDateFormat.js';

// Test data imports
import { booking } from '../../../test-mocks/index.js';

// Mocks
const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUsedNavigate,
}));

// Mock the performRequest function
import { performRequest } from '../../service/fetchService';
jest.mock('../../service/fetchService');
performRequest.mockResolvedValue({ message: 'Din bokning är nu avbokad!' });

window.alert = jest.fn();

// mock the reload function
Object.defineProperty(window, 'location', {
    configurable: true,
    value: { reload: jest.fn() },
});

describe('ConfirmBooking', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders correctly', () => {
        render(<CancelBooking booking={booking} setToggle={jest.fn()} />);

        // Assert that the form elements are rendered correctly
        expect(screen.getByText('Är du säker på att du vill avboka?')).toBeInTheDocument();
        expect(screen.getAllByText(booking.movie.title)[0]).toBeInTheDocument();
        expect(screen.getByText(newDateFormat(booking.screening.date))).toBeInTheDocument();
        expect(screen.getByText(booking.screening.time)).toBeInTheDocument();
        expect(screen.getByText('BokningsNr: ' + booking.bookingId)).toBeInTheDocument();
        expect(screen.getByText(booking.screening.theaterName)).toBeInTheDocument();
        expect(screen.getByText(booking.rows[0].row)).toBeInTheDocument();
        expect(screen.getByText(booking.seats.map((seat) => seat.seatNumber).join(", "))).toBeInTheDocument();
        expect(screen.getByText(booking.price + 'kr')).toBeInTheDocument();
        expect(screen.getByText(booking.status === true ? 'Bokad' : 'Avbokad')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Avboka' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Tillbaka' })).toBeInTheDocument();
    });

    test('renders correctly with snapshot', () => {
        const tree = renderer.create(<CancelBooking booking={booking} setToggle={jest.fn()} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('cancelBooking success', async () => {

        render(<CancelBooking booking={booking} setToggle={jest.fn()} />);

        const cancelButton = screen.getByRole('button', { name: 'Avboka' });

        // Simulate changing checkbox using fireEvent
        fireEvent.click(cancelButton);
        // await new Promise((r) => setTimeout(r, 1000));

        await waitFor(() => {
            expect(performRequest).toHaveBeenCalledTimes(1);
            expect(performRequest).toHaveBeenCalledWith('/api/bookings', 'PATCH', { id: booking._id });
            expect(window.location.reload).toHaveBeenCalledTimes(1);
        });
    });

    test('cancelBooking failed to unbook', async () => {

        performRequest.mockResolvedValueOnce({ message: 'Error' });

        render(<CancelBooking booking={booking} setToggle={jest.fn()} />);

        const cancelButton = screen.getByRole('button', { name: 'Avboka' });

        // Simulate changing checkbox using fireEvent
        fireEvent.click(cancelButton);
        // await new Promise((r) => setTimeout(r, 1000));

        await waitFor(() => {
            expect(performRequest).toHaveBeenCalledTimes(1);
            expect(performRequest).toHaveBeenCalledWith('/api/bookings', 'PATCH', { id: booking._id });
            expect(window.alert).toHaveBeenCalledTimes(1);
            expect(window.alert).toHaveBeenCalledWith('Något gick fel');
        });
    });


});