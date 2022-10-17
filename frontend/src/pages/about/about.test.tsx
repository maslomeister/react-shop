import { render, screen } from "@testing-library/react";
import { About } from "./about";

test("About page renders", () => {
  render(<About />);

  expect(screen.getByTestId("about")).toBeInTheDocument();
});
