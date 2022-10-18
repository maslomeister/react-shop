import { fireEvent, render, screen } from "@testing-library/react";
import { TextArea } from "./text-area";

describe("TextArea component tests", () => {
  it("TextArea and label,placeholder is displayed", () => {
    const onChangeHandler = jest.fn();
    render(
      <TextArea
        name="description"
        label="Description"
        placeholder="This is placeholder text"
        value=""
        onChange={onChangeHandler}
        error=""
      />
    );

    const label = screen.getByTestId("label");
    const textArea = screen.getByPlaceholderText("This is placeholder text") as HTMLTextAreaElement;

    expect(label).toBeInTheDocument();
    expect(textArea).toBeInTheDocument();
    expect(screen.getByText("0/600")).toBeVisible();
  });

  it("TextArea counter displayed and update on value change", () => {
    const onChangeHandler = jest.fn();

    render(
      <TextArea
        name="description"
        label="Description"
        placeholder="This is placeholder text"
        value="xd"
        onChange={onChangeHandler}
        error=""
      />
    );

    const textArea = screen.getByPlaceholderText("This is placeholder text") as HTMLTextAreaElement;

    fireEvent.change(textArea, { target: { value: "input changed" } });

    expect(onChangeHandler).toHaveBeenCalled();
  });

  it("TextArea error is displayed", () => {
    const onChangeHandler = jest.fn();

    render(
      <TextArea
        name="description"
        label="Description"
        placeholder="This is placeholder text"
        value="xd"
        onChange={onChangeHandler}
        error="This is an error"
      />
    );

    expect(screen.getByText("2/600 This is an error")).toBeVisible();
  });
});
