import { fireEvent, screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import * as router from "react-router";
import { loginUserData, loginAdminData, cartWithItem, productWithId0, handlers, products } from "../../../__jest__/api-mocks";
import { ShopItemMemo } from "./shop-item";
import { renderWithProviders, rootReducer } from "../../../__jest__/render-with-redux";
import { createStore } from "redux";
import { loginUserSuccess } from "../../store/actions/auth";
import { fetchProductsSuccess } from "../../store/actions/shop";

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe("ShopItem component tests", () => {
  it("Show product for unauthorized user", () => {
    renderWithProviders(
      <ShopItemMemo
        id={productWithId0.id}
        name={productWithId0.name}
        price={productWithId0.price}
        inStock={productWithId0.inStock}
        img={productWithId0.picture}
      />
    );

    const loginToAddToCart = screen.getByText("Войдите чтобы добавить в корзину");

    expect(loginToAddToCart).toBeVisible();
  });

  it("Show product for authenticated user", async () => {
    const store = createStore(rootReducer);
    store.dispatch(loginUserSuccess(loginUserData));

    renderWithProviders(
      <ShopItemMemo
        id={productWithId0.id}
        name={productWithId0.name}
        price={productWithId0.price}
        inStock={productWithId0.inStock}
        img={productWithId0.picture}
      />,
      { store }
    );

    const addToCartButton = screen.getByRole("button", { name: "В КОРЗИНУ" });

    expect(addToCartButton).toBeVisible();
  });

  it("While showing for authenticated user add to cart", async () => {
    const store = createStore(rootReducer);
    store.dispatch(fetchProductsSuccess(products));
    store.dispatch(loginUserSuccess(loginUserData));

    renderWithProviders(
      <ShopItemMemo
        id={productWithId0.id}
        name={productWithId0.name}
        price={productWithId0.price}
        inStock={productWithId0.inStock}
        img={productWithId0.picture}
      />,
      { store }
    );

    const addToCartButton = screen.getByRole("button", { name: "В КОРЗИНУ" });

    fireEvent.click(addToCartButton);

    const adding = await screen.findByRole("button", { name: "ДОБАВЛЯЕМ" });

    expect(adding).toBeVisible();

    await screen.findByRole("button", { name: "В КОРЗИНУ" });

    expect(store.getState().shop.cart).toEqual(cartWithItem);
  });

  it("While showing for authenticated user fail to add to cart", async () => {
    const store = createStore(rootReducer);
    store.dispatch(loginUserSuccess(loginUserData));

    renderWithProviders(
      <ShopItemMemo
        id={productWithId0.id}
        name={productWithId0.name}
        price={productWithId0.price}
        inStock={productWithId0.inStock}
        img={productWithId0.picture}
      />,
      { store }
    );

    const addToCartButton = screen.getByRole("button", { name: "В КОРЗИНУ" });

    fireEvent.click(addToCartButton);

    const adding = await screen.findByRole("button", { name: "ДОБАВЛЯЕМ" });

    expect(adding).toBeVisible();

    const error = await screen.findByRole("button", { name: "ОШИБКА" });

    expect(error).toBeVisible();

    const buttonWithoutError = await screen.findByRole("button", { name: "В КОРЗИНУ" });

    expect(buttonWithoutError).toBeVisible();
  });

  it("Show product for authenticated admin", async () => {
    const store = createStore(rootReducer);
    store.dispatch(loginUserSuccess(loginAdminData));

    renderWithProviders(
      <ShopItemMemo
        id={productWithId0.id}
        name={productWithId0.name}
        price={productWithId0.price}
        inStock={productWithId0.inStock}
        img={productWithId0.picture}
      />,
      { store }
    );

    const addToCartButton = screen.queryByRole("button", { name: "В КОРЗИНУ" });
    const loginToAddToCart = screen.queryByText("Войдите чтобы добавить в корзину");

    expect(addToCartButton).toBeNull();
    expect(loginToAddToCart).toBeNull();
  });

  it("Click on name navigates to more info about product", () => {
    const store = createStore(rootReducer);
    store.dispatch(fetchProductsSuccess(products));

    const navigate = jest.fn();

    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);

    renderWithProviders(
      <ShopItemMemo
        id={productWithId0.id}
        name={productWithId0.name}
        price={productWithId0.price}
        inStock={productWithId0.inStock}
        img={productWithId0.picture}
      />,
      { store }
    );

    const productName = screen.getByTestId("product-name");

    fireEvent.click(productName);

    expect(navigate).toHaveBeenCalledWith("/products/0");
  });
});
