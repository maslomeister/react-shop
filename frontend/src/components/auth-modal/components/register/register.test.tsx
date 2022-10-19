import { fireEvent, screen } from "@testing-library/react";
import { rest } from "msw";
import { mswServer } from "../../../../setupTests";
import { API_URL } from "../../../../api/api";
import { Register } from "./register";
import { renderWithProviders } from "../../../../../__jest__/render-with-redux";

describe("AuthModal Register component tests", () => {
  it("Register is shown", () => {
    renderWithProviders(<Register />);

    const registerForm = screen.getByTestId("register-form");

    expect(registerForm).toBeVisible();
  });

  it("Register success", () => {
    mswServer.use(
      rest.post(`${API_URL}/register`, (req, res, ctx) => {
        return res(ctx.json({ authToken: "auth1234", userRole: "user", name: "Login" }), ctx.delay(150));
      })
    );

    renderWithProviders(<Register />);

    const loginInput = screen.getByPlaceholderText("Логин");

    fireEvent.change(loginInput, { target: { value: "Login" } });

    const passwordInput = screen.getByPlaceholderText("Пароль");

    fireEvent.change(passwordInput, { target: { value: "password" } });

    const repeatPasswordInput = screen.getByPlaceholderText("Повторите пароль");

    fireEvent.change(repeatPasswordInput, { target: { value: "password" } });

    const submitButton = screen.getByRole("button", { name: "Регистрация" });

    fireEvent.click(submitButton);
  });

  it("Register fail because login already exists", async () => {
    mswServer.use(
      rest.post(`${API_URL}/register`, (req, res, ctx) => {
        return res(ctx.status(401), ctx.json({ error: true, msg: "Такой логин уже существует" }), ctx.delay(150));
      })
    );

    renderWithProviders(<Register />);

    const loginInput = screen.getByPlaceholderText("Логин");

    fireEvent.change(loginInput, { target: { value: "Login" } });

    const passwordInput = screen.getByPlaceholderText("Пароль");

    fireEvent.change(passwordInput, { target: { value: "password" } });

    const submitButton = screen.getByRole("button", { name: "Регистрация" });

    const repeatPasswordInput = screen.getByPlaceholderText("Повторите пароль");

    fireEvent.change(repeatPasswordInput, { target: { value: "password" } });

    fireEvent.click(submitButton);

    const error = await screen.findByText("Такой логин уже существует");

    expect(error).toBeVisible();
  });

  it("Submit showed error because inputs were empty", async () => {
    renderWithProviders(<Register />);

    const registerForm = screen.getByTestId("register-form");

    expect(registerForm).toBeVisible();

    const submitButton = screen.getByRole("button", { name: "Регистрация" });

    fireEvent.click(submitButton);

    const error = await screen.findByText("В каком-то из полей ошибка");

    expect(error).toBeVisible();
  });

  it("Inputs were cleared", async () => {
    renderWithProviders(<Register />);

    const loginInput = screen.getByPlaceholderText("Логин") as HTMLInputElement;

    fireEvent.change(loginInput, { target: { value: "Login" } });

    const passwordInput = screen.getByPlaceholderText("Пароль") as HTMLInputElement;

    fireEvent.change(passwordInput, { target: { value: "password" } });

    const repeatPasswordInput = screen.getByPlaceholderText("Повторите пароль") as HTMLInputElement;

    fireEvent.change(repeatPasswordInput, { target: { value: "password" } });

    const resetButton = screen.getByRole("button", { name: "Отмена" });

    fireEvent.click(resetButton);

    expect(loginInput.value).toEqual("");
    expect(passwordInput.value).toEqual("");
    expect(repeatPasswordInput.value).toEqual("");
  });
});
