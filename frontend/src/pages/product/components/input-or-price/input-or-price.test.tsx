import { render, screen } from "@testing-library/react";
import { InputOrPrice } from "./input-or-price";

describe("InputOrPice component tests", () => {
  const onChange = jest.fn();

  it("Price is rendered", () => {
    render(<InputOrPrice value={2} onChange={onChange} editMode={false} error="" />);

    expect(screen.getByText("Цена:")).toBeVisible();
  });

  it("Input is rendered", () => {
    render(<InputOrPrice value={2} onChange={onChange} editMode={true} error="" />);

    expect(screen.getByPlaceholderText("Цена")).toBeVisible();
  });
});
