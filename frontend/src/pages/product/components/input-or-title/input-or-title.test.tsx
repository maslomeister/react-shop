import { render, screen } from "@testing-library/react";
import { InputOrTitle } from "./input-or-title";

describe("InputOrTitle component tests", () => {
  const onChange = jest.fn();

  it("Title is rendered", () => {
    render(<InputOrTitle value={"title"} onChange={onChange} editMode={false} error="" />);

    expect(screen.getByText("title")).toBeVisible();
  });

  it("Input is rendered", () => {
    render(<InputOrTitle value={"title"} onChange={onChange} editMode={true} error="" />);

    expect(screen.getByPlaceholderText("Название")).toBeVisible();
  });
});
