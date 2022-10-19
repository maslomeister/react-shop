import { fireEvent, screen } from "@testing-library/react";
import { API_URL } from "../../api/api";
import { rest } from "msw";
import { App } from "./app";
import { renderWithProviders } from "../../../__jest__/render-with-redux";
import { mswServer } from "../../setupTests";

describe("App component tests", () => {
  it("Initial spinner is shown, then products are loaded and shown", async () => {
    renderWithProviders(<App />);

    const spinner = screen.getByTestId("main-spinner");

    expect(spinner).toBeVisible();

    const product = await screen.findByText("iPhone 14");

    expect(product).toBeVisible();
  });

  it("Auth token found in localStorage and it's valid, cart footer is shown", async () => {
    window.localStorage.setItem("authToken", "auth1234");

    mswServer.use(
      rest.get(`${API_URL}/auth`, (req, res, ctx) => {
        return res(ctx.json({ authToken: "auth1234", userRole: "user", name: "User" }), ctx.delay(150));
      })
    );

    renderWithProviders(<App />);

    const product = await screen.findByText("iPhone 14");

    const footerCart = await screen.findByTestId("footer-cart");

    expect(product).toBeVisible();
    expect(footerCart).toBeVisible();

    window.localStorage.removeItem("authToken");
  });

  it("Auth token found in localStorage and it's invalid, token gets deleted from localStorage", async () => {
    window.localStorage.setItem("authToken", "0");

    mswServer.use(
      rest.get(`${API_URL}/auth`, (req, res, ctx) => {
        return res(ctx.status(501), ctx.json({ error: true, msg: "Неверный токен" }), ctx.delay(150));
      })
    );

    renderWithProviders(<App />);

    const product = await screen.findByText("iPhone 14");

    expect(window.localStorage.getItem("authToken")).toEqual(null);

    expect(product).toBeVisible();

    window.localStorage.removeItem("authToken");
  });

  it("Failed to verify user with unexpected error", async () => {
    window.localStorage.setItem("authToken", "0");

    mswServer.use(
      rest.get(`${API_URL}/auth`, (req, res, ctx) => {
        return res(ctx.status(501), ctx.json({ error: true, msg: "Неизвестная ошибка" }), ctx.delay(150));
      })
    );

    renderWithProviders(<App />);

    const error = await screen.findByText("Неизвестная ошибка");

    expect(error).toBeVisible();

    window.localStorage.removeItem("authToken");
  });

  it("Failed to load products because of server error", async () => {
    mswServer.use(
      rest.get(`${API_URL}/products`, (req, res, ctx) => {
        return res(ctx.status(501), ctx.json({ error: true, msg: "Неизвестная ошибка" }), ctx.delay(150));
      })
    );

    renderWithProviders(<App />);

    const error = await screen.findByText("Неизвестная ошибка");

    expect(error).toBeVisible();
  });

  it("Failed to load products because of network error", async () => {
    mswServer.use(
      rest.get(`${API_URL}/products`, (req, res) => {
        return res.networkError("Failed to connect");
      })
    );

    renderWithProviders(<App />);

    const error = await screen.findByText("Network request failed");

    expect(error).toBeVisible();
  });

  it("AuthModal is visible when login clicked", async () => {
    renderWithProviders(<App />);

    const login = await screen.findByRole("button", { name: "Войти" });

    fireEvent.click(login);

    const authModal = await screen.findByTestId("auth-modal");

    expect(authModal).toBeVisible();
  });
});
