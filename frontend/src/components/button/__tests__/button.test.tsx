import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "../button";

import styles from "../button.module.css";

describe("Button component tests", () => {
  it("Button contains text and is blue and onClick works", () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Это кнопка</Button>);

    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("Это кнопка");
    expect(button).toHaveStyle("background-image: radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%)");

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("Button contains 'В КОРЗИНУ' because inStock > 0 and onClick works", () => {
    const handleClick = jest.fn();

    render(<Button inStock={1} onClick={handleClick} />);

    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("В КОРЗИНУ");
    expect(button).toHaveStyle("background-image: radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%)");

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("Button style is red and onClick is undefined", () => {
    render(<Button variant="red" />);

    const button = screen.getByRole("button");

    expect(button).toHaveClass(styles.red);
  });

  it("Button style is error", () => {
    render(<Button variant="error" />);

    const button = screen.getByRole("button");

    expect(button).toHaveClass(styles.error);
  });

  it("Button is inactive", () => {
    render(<Button inactive={true} />);

    const button = screen.getByRole("button");

    expect(button).toHaveClass(styles.inactive);
  });

  it("Button is loading and onClick doesn't work", () => {
    const handleClick = jest.fn();

    render(<Button loading={true} onClick={handleClick} />);

    const button = screen.getByRole("button");

    expect(button).toHaveClass(styles.loading);

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  it("Button is showing error and onClick() doesn't work", () => {
    const handleClick = jest.fn();

    render(<Button error={true} onClick={handleClick} />);

    const button = screen.getByRole("button");

    expect(button).toHaveClass(styles.error);
    expect(button).toHaveTextContent("ОШИБКА");

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  it("Button is inactive because inStock property <= 0", () => {
    render(<Button inStock={0} />);

    const button = screen.getByRole("button");

    expect(button).toHaveClass(styles.inactive);
  });
});
