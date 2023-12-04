import { render, screen } from "@testing-library/react";

import App from "./App";

// Promise:
// new Promise((resolve, reject) => {
//   // do something
//   resolve("success");'
// Three states: pending, fulfilled, rejected

describe("App", () => {
  // mock / monkey-patch fetch
  // (not always needed but in this case we want to change the fetch answer)
  // let originalFetch;

  // beforeEach(() => {
  //   originalFetch = global.fetch;
  //   global.fetch = jest.fn(
  //     () =>
  //       Promise.resolve({
  //         json: () =>
  //           Promise.resolve([
  //             {
  //               userId: 1,
  //               id: 1,
  //               title: "Kaliteye hoşgeldiniz",
  //               completed: false,
  //             },
  //           ]),
  //       })
  //   );
  // });

  // afterEach(() => {
  //   global.fetch = originalFetch;
  // });

  it("renders App component", async () => {
    // check that Kaliteye hoşgeldiniz is displayed
    render(<App />);
    const linkElement = await screen.findByText(/Filmer/i);
    expect(linkElement).toBeInTheDocument();
  });
});
