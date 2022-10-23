import { fireEvent, screen, waitFor } from "@testing-library/react";
import { loginUserDataMock, cartWithItemMock, productsMock } from "../../../__jest__/api-mocks";
import { Cart } from "./cart";
import { renderWithProviders, rootReducer } from "../../../__jest__/render-with-redux";
import { createStore } from "redux";
import { loginUserSuccess } from "../../store/actions/auth";
import { cartDataRequest, cartDataSuccess, fetchProductsSuccess } from "../../store/actions/shop";
import { mswServer } from "../../setupTests";
import { rest } from "msw";
import { API_URL } from "../../api/api";

describe("Cart component tests", () => {
  const showFooter = jest.fn();

  it("Loading is shown", async () => {
    const store = createStore(rootReducer);

    store.dispatch(cartDataRequest());

    renderWithProviders(<Cart showFooter={showFooter} />, { store });

    expect(await screen.findByTestId("cart-spinner")).toBeVisible();
  });

  it("Empty cart is shown", async () => {
    const store = createStore(rootReducer);

    store.dispatch(loginUserSuccess(loginUserDataMock));
    store.dispatch(cartDataSuccess([]));

    renderWithProviders(<Cart showFooter={showFooter} />, { store });

    expect(await screen.findByText("Тут пока пусто")).toBeVisible();
  });

  it("Cart with item is shown", async () => {
    const store = createStore(rootReducer);

    store.dispatch(loginUserSuccess(loginUserDataMock));
    store.dispatch(cartDataSuccess(cartWithItemMock));

    renderWithProviders(<Cart showFooter={showFooter} />, { store });

    expect(await screen.findByText(cartWithItemMock[0].name)).toBeVisible();
  });

  it("Cart is cleared", async () => {
    mswServer.use(
      rest.delete(`${API_URL}/cart`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]), ctx.delay(150));
      })
    );

    const store = createStore(rootReducer);

    store.dispatch(fetchProductsSuccess(productsMock));
    store.dispatch(loginUserSuccess(loginUserDataMock));
    store.dispatch(cartDataSuccess(cartWithItemMock));

    renderWithProviders(<Cart showFooter={showFooter} />, { store });

    expect(await screen.findByText(cartWithItemMock[0].name)).toBeVisible();

    const clearCartButton = await screen.findByText("Отчистить корзину");

    fireEvent.click(clearCartButton);

    expect(await screen.findByText("Тут пока пусто")).toBeVisible();
  });

  it("Cart error", async () => {
    mswServer.use(
      rest.delete(`${API_URL}/cart`, (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({ error: true, msg: "error" }), ctx.delay(150));
      })
    );

    const store = createStore(rootReducer);

    store.dispatch(fetchProductsSuccess(productsMock));
    store.dispatch(loginUserSuccess(loginUserDataMock));
    store.dispatch(cartDataSuccess(cartWithItemMock));

    renderWithProviders(<Cart showFooter={showFooter} />, { store });

    expect(await screen.findByText(cartWithItemMock[0].name)).toBeVisible();

    const clearCartButton = await screen.findByText("Отчистить корзину");

    fireEvent.click(clearCartButton);

    expect(await screen.findByText("ЗАГРУЗКА")).toBeVisible();

    expect(await screen.findByText("ОШИБКА")).toBeVisible;

    await waitFor(() => {
      expect(screen.getByText("Отчистить корзину")).toBeVisible();
    });
  });
});
