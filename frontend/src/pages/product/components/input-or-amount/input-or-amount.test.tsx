import { render, screen } from "@testing-library/react";
import { InputOrAmount } from "./input-or-amount";

describe("InputOrAmount component tests", () => {
  const onChange = jest.fn();

  it("Amount is rendered", () => {
    render(<InputOrAmount value={2} onChange={onChange} editMode={false} error="" />);

    expect(screen.getByText("В наличии:")).toBeVisible();
  });

  it("Input is rendered", () => {
    render(<InputOrAmount value={2} onChange={onChange} editMode={true} error="" />);

    expect(screen.getByPlaceholderText("В наличии")).toBeVisible();
  });
});
