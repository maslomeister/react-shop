import { fireEvent, screen } from "@testing-library/react";
import * as router from "react-router";
import { loginUserDataMock } from "../../../__jest__/api-mocks";
import { FooterCart } from "./footer-cart";
import { renderWithProviders, rootReducer } from "../../../__jest__/render-with-redux";
import { createStore } from "redux";
import { loginUserSuccess } from "../../store/actions/auth";
import { cartDataRequest, cartDataSuccess } from "../../store/actions/shop";

describe("FooterCart component tests", () => {
  it("Empty cart is shown", () => {
    const store = createStore(rootReducer);

    store.dispatch(loginUserSuccess(loginUserDataMock));
    store.dispatch(cartDataSuccess([]));

    renderWithProviders(<FooterCart />, { store });

    const footerCart = screen.getByTestId("footer-cart");

    expect(footerCart).toBeVisible();

    const noItemsInCart = screen.getByText("В корзине пусто");

    expect(noItemsInCart).toBeVisible();
  });

  it("Cart is not shown because of loading", async () => {
    const store = createStore(rootReducer);

    store.dispatch(cartDataRequest());

    renderWithProviders(<FooterCart />, { store });

    const footerCart = screen.queryByTestId("footer-cart");

    expect(footerCart).toBeNull();
  });

  it("Cart with 1 item is shown", async () => {
    const store = createStore(rootReducer);

    store.dispatch(loginUserSuccess(loginUserDataMock));

    renderWithProviders(<FooterCart />, { store });

    const footerCart = await screen.findByTestId("footer-cart");

    expect(footerCart).toBeVisible();

    const noItemsInCart = screen.getByTestId("cart-amount");

    expect(noItemsInCart).toBeVisible();
  });

  it("Click on cart icon navigates to cart page", async () => {
    const navigate = jest.fn();

    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);

    const store = createStore(rootReducer);

    store.dispatch(loginUserSuccess(loginUserDataMock));

    renderWithProviders(<FooterCart />, { store });

    const footerCart = await screen.findByTestId("footer-cart");

    expect(footerCart).toBeVisible();

    const cartButton = screen.getByTestId("cart-button");

    fireEvent.click(cartButton);

    expect(navigate).toHaveBeenCalledWith("/cart");
  });
});
