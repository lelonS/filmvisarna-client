import { render, screen } from "@testing-library/react";

import BookingTicketsForm from "./BookingTicketsForm";

// Mocks
const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

window.scrollTo = jest.fn();

// Tests:
describe("App", () => {

  it("example test", async () => {
    render(<BookingTicketsForm inputValues={{ email: 'test@test.te' }} setInputValues={jest.fn()} />);
    expect(true).toBe(true);
  });
});
