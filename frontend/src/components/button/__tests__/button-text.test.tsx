import { fireEvent, render, screen } from "@testing-library/react";
import { ButtonText } from "../buttonText";

describe("Button component tests", () => {
  it("Text button is rendered and onClick works", () => {
    const handleClick = jest.fn();

    render(<ButtonText onClick={handleClick}>This is a button</ButtonText>);

    const button = screen.getByTestId("text-button");

    expect(button).toHaveTextContent("This is a button");

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
