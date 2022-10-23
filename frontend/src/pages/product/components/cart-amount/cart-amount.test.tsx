import { fireEvent, screen, waitFor } from "@testing-library/react";
import { mswServer } from "../../../../setupTests";
import { rest } from "msw";
import { API_URL } from "../../../../api/api";
import { productsMock } from "../../../../../__jest__/api-mocks";
import { CartAmount } from "./cart-amount";
import { renderWithProviders, rootReducer } from "../../../../../__jest__/render-with-redux";
import { createStore } from "redux";
import { fetchProductsSuccess } from "../../../../store/actions/shop";

describe("CartAmount component tests", () => {
  it("Component is rendered", () => {
    const store = createStore(rootReducer);

    store.dispatch(fetchProductsSuccess(productsMock));

    renderWithProviders(<CartAmount id="0" inStock={productsMock[0].inStock} authToken="auth123" />, { store });

    expect(screen.getByText("В КОРЗИНУ")).toBeVisible();
    expect(screen.getByText("-")).toBeVisible();
    expect(screen.getByText("+")).toBeVisible();
    expect(screen.getByText("1")).toBeVisible();
  });

  it("Amount can be increased", () => {
    const store = createStore(rootReducer);

    store.dispatch(fetchProductsSuccess(productsMock));

    renderWithProviders(<CartAmount id="0" inStock={productsMock[0].inStock} authToken="auth123" />, { store });

    const increaseButton = screen.getByText("+");

    fireEvent.click(increaseButton);

    expect(screen.getByText("2")).toBeVisible();
  });

  it("Amount can be decreased", () => {
    const store = createStore(rootReducer);

    store.dispatch(fetchProductsSuccess(productsMock));

    renderWithProviders(<CartAmount id="0" inStock={productsMock[0].inStock} authToken="auth123" />, { store });

    const increaseButton = screen.getByText("+");

    fireEvent.click(increaseButton);

    const decreaseButton = screen.getByText("-");

    fireEvent.click(decreaseButton);

    expect(screen.getByText("1")).toBeVisible();
  });

  it("When adding more than one to cart reset amount to 1 and add to cart", async () => {
    const store = createStore(rootReducer);

    store.dispatch(fetchProductsSuccess(productsMock));

    renderWithProviders(<CartAmount id="0" inStock={productsMock[0].inStock} authToken="auth123" />, { store });

    const increaseButton = screen.getByText("+");

    fireEvent.click(increaseButton);
    fireEvent.click(increaseButton);
    fireEvent.click(increaseButton);
    fireEvent.click(increaseButton);

    expect(screen.getByText("5")).toBeVisible();

    const addToCartButton = screen.getByText("В КОРЗИНУ");

    fireEvent.click(addToCartButton);

    await waitFor(() => {
      expect(screen.getByText("1")).toBeVisible();
    });

    expect(store.getState().shop.cart.length).toEqual(1);
  });

  it("Show error", async () => {
    const store = createStore(rootReducer);

    store.dispatch(fetchProductsSuccess(productsMock));

    mswServer.use(
      rest.put(`${API_URL}/cart`, (req, res, ctx) => {
        return res(ctx.status(501), ctx.json({ error: true, msg: "error" }), ctx.delay(150));
      })
    );

    renderWithProviders(<CartAmount id="0" inStock={productsMock[0].inStock} authToken="auth123" />, { store });

    const addToCartButton = screen.getByText("В КОРЗИНУ");

    fireEvent.click(addToCartButton);

    expect(await screen.findByText("ДОБАВЛЯЕМ")).toBeVisible();
    expect(await screen.findByText("ОШИБКА")).toBeVisible();
    expect(await screen.findByText("В КОРЗИНУ")).toBeVisible();
  });
});
