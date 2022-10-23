import { render, screen } from "@testing-library/react";
import { NotFound } from "./not-found";

test("About page renders", () => {
  render(<NotFound />);

  expect(screen.getByTestId("404")).toBeInTheDocument();
});
