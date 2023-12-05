import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingTicketsForm from './BookingTicketsForm';

// Mocks
const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUsedNavigate,
}));

window.scrollTo = jest.fn();

describe('BookingTicketsForm', () => {
    test('renders the form correctly', () => {
        render(<BookingTicketsForm inputValues={{}} setInputValues={() => { }} />);

        // Assert that the form elements are rendered correctly
        expect(screen.getByText('Fyll i mailadress')).toBeInTheDocument();
        expect(screen.getByText('Bekräfta mailadress')).toBeInTheDocument();
        expect(screen.getByText('Mobiltelefon')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Bli medlem' })).toBeInTheDocument();
        expect(screen.getByText('logga in!')).toBeInTheDocument();
    });

    test('updates input values correctly', async () => {
        const setInputValues = jest.fn();
        render(<BookingTicketsForm inputValues={{}} setInputValues={setInputValues} />);
        // await new Promise((r) => setTimeout(r, 1000));

        const emailInput = screen.getByTestId('email-input')
        // Simulate typing into the input field using fireEvent
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

        expect(setInputValues).toHaveBeenCalledTimes(1);
    });

    test('navigates to the registration page when "Bli medlem" button is clicked', () => {
        render(<BookingTicketsForm inputValues={{}} setInputValues={() => { }} />);

        // Simulate user input and assert that the navigate function is called
        fireEvent.click(screen.getByRole('button', { name: 'Bli medlem' }));
        expect(mockUsedNavigate).toHaveBeenCalledTimes(1);
        expect(mockUsedNavigate).toHaveBeenCalledWith('/registrera');
    });

    // Add more tests as needed... 
});