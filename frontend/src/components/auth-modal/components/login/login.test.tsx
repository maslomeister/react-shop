import { fireEvent, screen } from "@testing-library/react";
import { rest } from "msw";
import { API_URL } from "../../../../api/api";
import { Login } from "./login";
import { renderWithProviders } from "../../../../../__jest__/render-with-redux";
import { mswServer } from "../../../../setupTests";

describe("AuthModal Login component tests", () => {
  it("Login is shown", () => {
    renderWithProviders(<Login />);

    const loginForm = screen.getByTestId("login-form");

    expect(loginForm).toBeVisible();
  });

  it("Login success", () => {
    mswServer.use(
      rest.post(`${API_URL}/auth`, (req, res, ctx) => {
        return res(ctx.json({ authToken: "auth1234", userRole: "user", name: "Login" }), ctx.delay(150));
      })
    );

    renderWithProviders(<Login />);

    const loginInput = screen.getByPlaceholderText("Логин");

    fireEvent.change(loginInput, { target: { value: "Login" } });

    const passwordInput = screen.getByPlaceholderText("Пароль");

    fireEvent.change(passwordInput, { target: { value: "password" } });

    const submitButton = screen.getByRole("button", { name: "Войти" });

    fireEvent.click(submitButton);
  });

  it("Login fail because password or name was incorrect", async () => {
    mswServer.use(
      rest.post(`${API_URL}/auth`, (req, res, ctx) => {
        return res(ctx.status(401), ctx.json({ error: true, msg: "Неверный логин или пароль" }), ctx.delay(150));
      })
    );

    renderWithProviders(<Login />);

    const loginInput = screen.getByPlaceholderText("Логин");

    fireEvent.change(loginInput, { target: { value: "Login" } });

    const passwordInput = screen.getByPlaceholderText("Пароль");

    fireEvent.change(passwordInput, { target: { value: "password" } });

    const submitButton = screen.getByRole("button", { name: "Войти" });

    fireEvent.click(submitButton);

    const error = await screen.findByText("Неверный логин или пароль");

    expect(error).toBeVisible();
  });

  it("Submit showed error because inputs were empty", async () => {
    renderWithProviders(<Login />);

    const loginForm = screen.getByTestId("login-form");

    expect(loginForm).toBeVisible();

    const submitButton = screen.getByRole("button", { name: "Войти" });

    fireEvent.click(submitButton);

    const error = await screen.findByText("В каком-то из полей ошибка");

    expect(error).toBeVisible();
  });

  it("Inputs were cleared", async () => {
    renderWithProviders(<Login />);

    const loginInput = screen.getByPlaceholderText("Логин") as HTMLInputElement;

    fireEvent.change(loginInput, { target: { value: "Login" } });

    const passwordInput = screen.getByPlaceholderText("Пароль") as HTMLInputElement;

    fireEvent.change(passwordInput, { target: { value: "password" } });

    const resetButton = screen.getByRole("button", { name: "Отмена" });

    fireEvent.click(resetButton);

    expect(loginInput.value).toEqual("");
    expect(passwordInput.value).toEqual("");
  });
});
