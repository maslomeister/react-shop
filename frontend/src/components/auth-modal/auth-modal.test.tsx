import { fireEvent, screen } from "@testing-library/react";
import * as router from "react-router";
import { rest } from "msw";
import { API_URL } from "../../api/api";
import { loginUserDataMock } from "../../../__jest__/api-mocks";
import { AuthModal } from "./auth-modal";
import { renderWithProviders, rootReducer } from "../../../__jest__/render-with-redux";
import { createStore } from "redux";
import { toggleModal } from "../../store/actions/shop";
import { loginUserSuccess } from "../../store/actions/auth";
import { mswServer } from "../../setupTests";

describe("AuthModal component tests", () => {
  it("AuthModal is shown", () => {
    renderWithProviders(<AuthModal />);

    const authModal = screen.getByTestId("auth-modal");

    expect(authModal).toBeVisible();
  });

  it("AuthModal change from login to register", () => {
    renderWithProviders(<AuthModal />);

    const loginRegisterSwitch = screen.getByTestId("login-register-switch");

    fireEvent.click(loginRegisterSwitch);

    const registerButton = screen.getByRole("button", { name: "Регистрация" });

    expect(registerButton).toBeVisible();
  });

  it("AuthModal show loading spinner on submit", async () => {
    renderWithProviders(<AuthModal />);

    mswServer.use(
      rest.post(`${API_URL}/auth`, (req, res, ctx) => {
        return res(ctx.json({ authToken: "auth1234", userRole: "user", name: "Login" }), ctx.delay(150));
      })
    );

    const loginInput = screen.getByPlaceholderText("Логин");

    fireEvent.change(loginInput, { target: { value: "Login" } });

    const passwordInput = screen.getByPlaceholderText("Пароль");

    fireEvent.change(passwordInput, { target: { value: "password" } });

    const submitButton = screen.getByRole("button", { name: "Войти" });

    fireEvent.click(submitButton);

    const loadingSpinner = await screen.findByTestId("auth-modal-spinner");

    expect(loadingSpinner).toBeVisible();
  });

  it("AuthModal show loading spinner on submit", async () => {
    renderWithProviders(<AuthModal />);

    mswServer.use(
      rest.post(`${API_URL}/auth`, (req, res, ctx) => {
        return res(ctx.json({ authToken: "auth1234", userRole: "user", name: "Login" }), ctx.delay(150));
      })
    );

    const loginInput = screen.getByPlaceholderText("Логин");

    fireEvent.change(loginInput, { target: { value: "Login" } });

    const passwordInput = screen.getByPlaceholderText("Пароль");

    fireEvent.change(passwordInput, { target: { value: "password" } });

    const submitButton = screen.getByRole("button", { name: "Войти" });

    fireEvent.click(submitButton);

    const loadingSpinner = await screen.findByTestId("auth-modal-spinner");

    expect(loadingSpinner).toBeVisible();
  });

  it("If ESC pressed modal is closed", () => {
    const store = createStore(rootReducer);

    store.dispatch(toggleModal());

    renderWithProviders(<AuthModal />, { store });

    const authModal = screen.getByTestId("auth-modal");

    expect(authModal).toBeVisible();

    fireEvent.keyDown(document.body, { key: "Escape" });

    expect(store.getState().shop.modalIsOpened).toEqual(false);
  });

  it("Auth success navigate to / url if not there already", () => {
    window.history.pushState({}, "About", "/about");

    const navigate = jest.fn();

    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);

    const store = createStore(rootReducer);

    store.dispatch(loginUserSuccess(loginUserDataMock));

    renderWithProviders(<AuthModal />, { store });

    expect(navigate).toBeCalledWith("/");
  });
});
