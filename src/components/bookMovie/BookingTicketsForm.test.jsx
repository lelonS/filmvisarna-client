import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingTicketsForm from './BookingTicketsForm';
import renderer from 'react-test-renderer';

// Mocks
const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

window.scrollTo = jest.fn();

describe('BookingTicketsForm', () => {
  test('renders the form correctly', () => {
    render(<BookingTicketsForm inputValues={{ email: 'test@example.com' }} setInputValues={() => { }} />);

    // Assert that the form elements are rendered correctly
    // Labels
    expect(screen.getByText('Fyll i mailadress')).toBeInTheDocument();
    expect(screen.getByText('Bekräfta mailadress')).toBeInTheDocument();
    expect(screen.getByText('Mobiltelefon')).toBeInTheDocument();

    // Inputs
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('reEmail-input')).toBeInTheDocument();
    expect(screen.getByTestId('phone-input')).toBeInTheDocument();

    // input values
    expect(screen.getByTestId('email-input').value).toBe('test@example.com');

    // Buttons
    expect(screen.getByRole('button', { name: 'Bli medlem' })).toBeInTheDocument();
    expect(screen.getByText('logga in!')).toBeInTheDocument();
  });

  test('updates input values correctly', () => {
    const setInputValues = jest.fn();
    render(<BookingTicketsForm inputValues={{}} setInputValues={setInputValues} />);
    // await new Promise((r) => setTimeout(r, 1000));

    const emailInput = screen.getByTestId('email-input');
    const reEmailInput = screen.getByTestId('reEmail-input');
    const phoneInput = screen.getByTestId('phone-input');

    // Simulate typing into the input field using fireEvent
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(reEmailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '0701234567' } });

    expect(setInputValues).toHaveBeenCalledTimes(3);
    expect(setInputValues).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(setInputValues).toHaveBeenCalledWith({ reEmail: 'test@example.com' });
    expect(setInputValues).toHaveBeenCalledWith({ phone: '0701234567' });
  });

  test('navigates to the registration page when "Bli medlem" button is clicked', () => {
    render(<BookingTicketsForm inputValues={{}} setInputValues={() => { }} />);

    // Simulate user input and assert that the navigate function is called
    fireEvent.click(screen.getByRole('button', { name: 'Bli medlem' }));
    expect(mockUsedNavigate).toHaveBeenCalledTimes(1);
    expect(mockUsedNavigate).toHaveBeenCalledWith('/registrera');
  });

  test('renders the form correctly with snapshot testing', () => {
    const tree = renderer.create(<BookingTicketsForm inputValues={{}} setInputValues={() => { }} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // The login button below "Bli Medlem" does not work and is not tested as I dont know what it is exactly supposed to do

  // Add more tests as needed... 
});