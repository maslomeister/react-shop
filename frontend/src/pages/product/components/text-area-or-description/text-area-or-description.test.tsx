import { render, screen } from "@testing-library/react";
import { TextAreaOrDescription } from "./text-area-or-description";

describe("TextAreaOrDescription component tests", () => {
  const onChange = jest.fn();
  it("Show text area", () => {
    render(<TextAreaOrDescription value="this is text area" onChange={onChange} error="" editMode={true} />);

    expect(screen.getByPlaceholderText("Описание")).toBeVisible();
  });

  it("Show description", () => {
    render(<TextAreaOrDescription value="this is text area" onChange={onChange} error="" editMode={false} />);

    expect(screen.getByText("Описание:")).toBeVisible();
  });
});
