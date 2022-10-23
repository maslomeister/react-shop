import { fireEvent, screen } from "@testing-library/react";
import { loginUserDataMock, loginAdminDataMock, cartWithItemMock } from "../../../__jest__/api-mocks";
import { Navbar } from "./navbar";
import { renderWithProviders, rootReducer } from "../../../__jest__/render-with-redux";
import { createStore } from "redux";
import { loginUserSuccess } from "../../store/actions/auth";
import { cartDataSuccess } from "../../store/actions/shop";

describe("Navbar component tests", () => {
  it("Navbar shown with login button and login button works", () => {
    const store = createStore(rootReducer);
    renderWithProviders(<Navbar />, { store });

    const navbar = screen.getByTestId("navbar");
    const loginButton = screen.getByRole("button", { name: "Войти" });

    expect(navbar).toBeVisible();
    expect(loginButton).toBeVisible();

    fireEvent.click(loginButton);

    expect(store.getState().shop.modalIsOpened).toEqual(true);
  });

  it("Navbar shown with logout button, logout button works and on logout store user data and cart are emptied", async () => {
    window.localStorage.setItem("authToken", "token");
    const store = createStore(rootReducer);

    store.dispatch(loginUserSuccess(loginUserDataMock));
    store.dispatch(cartDataSuccess(cartWithItemMock));

    renderWithProviders(<Navbar />, { store });

    const logoutButton = screen.getByRole("button", { name: "Выйти" });
    expect(logoutButton).toBeVisible();

    fireEvent.click(logoutButton);

    const loginButton = await screen.findByRole("button", { name: "Войти" });
    expect(loginButton).toBeVisible();

    const authToken = window.localStorage.getItem("authToken");

    expect(authToken).toEqual(null);
    expect(store.getState().auth.authenticated).toEqual(false);
    expect(store.getState().shop.cart).toEqual([]);

    window.localStorage.removeItem("authToken");
  });

  it("Navbar shown with admin panel", () => {
    const store = createStore(rootReducer);

    store.dispatch(loginUserSuccess(loginAdminDataMock));

    renderWithProviders(<Navbar />, { store });

    const adminPanel = screen.getByText("Admin panel");
    expect(adminPanel).toBeVisible();
  });
});
