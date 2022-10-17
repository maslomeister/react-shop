import { render, screen } from "@testing-library/react";
import { Spinner } from "./spinner";

describe("Spinner component tests", () => {
  it("Spinner is shown", () => {
    render(<Spinner dataTestId="spinner" />);

    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeVisible();
  });
});
