import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from "./input";

describe("Input component tests", () => {
  it("Input shows label, placeholder and onChange changes value", () => {
    const onChangeHandler = jest.fn() as React.ChangeEventHandler<HTMLInputElement>;

    render(<Input label="Input" placeholder="This is placeholder text" onChange={onChangeHandler} error="this is an error text" />);

    const label = screen.getByTestId("label");
    const input = screen.getByPlaceholderText("This is placeholder text") as HTMLInputElement;
    const errorLabel = screen.getByTestId("error-label");

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(errorLabel).toHaveTextContent("this is an error text");

    fireEvent.change(input, { target: { value: "input changed" } });

    expect(onChangeHandler).toHaveBeenCalled();
  });

  it("Input password shows and password show-hide is working", () => {
    const onChangeHandler = jest.fn();

    render(<Input label="Input" type="password" value="password" onChange={onChangeHandler} placeholder="This is placeholder text" />);

    const label = screen.getByTestId("label");
    const input = screen.getByPlaceholderText("This is placeholder text") as HTMLInputElement;

    const showHideButton = screen.getByTestId("show-hide");

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(label).toBeInTheDocument();

    expect(showHideButton).toHaveAttribute("src", "eye-show.svg");

    fireEvent.click(showHideButton);

    expect(showHideButton).toHaveAttribute("src", "eye-hide.svg");
  });
});
