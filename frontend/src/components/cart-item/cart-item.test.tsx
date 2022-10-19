import { fireEvent, screen, waitFor } from "@testing-library/react";
import { mswServer } from "../../setupTests";
import { rest } from "msw";
import { productsMock, productWithId0Mock } from "../../../__jest__/api-mocks";
import { CartItem } from "./cart-item";
import { renderWithProviders, rootReducer } from "../../../__jest__/render-with-redux";
import { createStore } from "redux";
import { addToCart, fetchProductsSuccess } from "../../store/actions/shop";
import { API_URL } from "../../api/api";

describe("CartItem component tests", () => {
  it("Item is visible", () => {
    const store = createStore(rootReducer);

    store.dispatch(fetchProductsSuccess(productsMock));

    renderWithProviders(
      <table>
        <tbody>
          <CartItem
            id={productWithId0Mock.id}
            name={productWithId0Mock.name}
            price={productWithId0Mock.price}
            quantity={2}
            total={productWithId0Mock.price * 2}
          />
        </tbody>
      </table>,
      { store }
    );

    const cartItem = screen.getByTestId("cart-item-0");

    expect(cartItem).toBeVisible();
  });

  it("Item can't be increased", async () => {
    const store = createStore(rootReducer);

    store.dispatch(fetchProductsSuccess([{ ...productWithId0Mock, inStock: 1 }]));
    store.dispatch(addToCart("0"));

    renderWithProviders(
      <table>
        <tbody>
          <CartItem
            id={productWithId0Mock.id}
            name={productWithId0Mock.name}
            price={productWithId0Mock.price}
            quantity={2}
            total={productWithId0Mock.price * 2}
          />
        </tbody>
      </table>,
      { store }
    );

    const noIncrease = await screen.findByTestId("no-increase");
    expect(noIncrease).toBeVisible();
  });

  it("Item increase amount", async () => {
    mswServer.use(
      rest.put(`${API_URL}/cart`, (req, res, ctx) => {
        return res(ctx.json({ ...productWithId0Mock, inStock: 3 }), ctx.delay(150));
      })
    );

    const store = createStore(rootReducer);

    store.dispatch(fetchProductsSuccess([{ ...productWithId0Mock, inStock: 5 }]));
    store.dispatch(addToCart("0"));

    renderWithProviders(
      <table>
        <tbody>
          <CartItem
            id={productWithId0Mock.id}
            name={productWithId0Mock.name}
            price={productWithId0Mock.price}
            quantity={2}
            total={productWithId0Mock.price * 2}
          />
        </tbody>
      </table>,
      { store }
    );

    const increaseButton = screen.getByTestId("increase");

    fireEvent.click(increaseButton);

    const loading = await screen.findByText("ЗАГРУЗКА");
    expect(loading).toBeVisible();

    await waitFor(() => {
      expect(screen.getByTestId("increase")).toBeVisible();
    });
  });

  it("Item decrease amount", async () => {
    mswServer.use(
      rest.put(`${API_URL}/cart`, (req, res, ctx) => {
        return res(ctx.json({ ...productWithId0Mock, inStock: 4 }), ctx.delay(150));
      })
    );

    const store = createStore(rootReducer);

    store.dispatch(fetchProductsSuccess([{ ...productWithId0Mock, inStock: 5 }]));
    store.dispatch(addToCart("0"));

    renderWithProviders(
      <table>
        <tbody>
          <CartItem
            id={productWithId0Mock.id}
            name={productWithId0Mock.name}
            price={productWithId0Mock.price}
            quantity={2}
            total={productWithId0Mock.price * 2}
          />
        </tbody>
      </table>,
      { store }
    );

    const decreaseButton = screen.getByTestId("decrease");

    fireEvent.click(decreaseButton);

    const loading = await screen.findByText("ЗАГРУЗКА");
    expect(loading).toBeVisible();

    await waitFor(() => {
      expect(screen.getByTestId("decrease")).toBeVisible();
    });
  });

  it("Item decrease with quantity=1 and remove it from cart", async () => {
    mswServer.use(
      rest.delete(`${API_URL}/cart`, (req, res, ctx) => {
        return res(ctx.json({}), ctx.delay(150));
      })
    );

    const store = createStore(rootReducer);

    store.dispatch(fetchProductsSuccess([{ ...productWithId0Mock, inStock: 1 }]));
    store.dispatch(addToCart("0"));

    expect(store.getState().shop.cart.length).toEqual(1);

    renderWithProviders(
      <table>
        <tbody>
          <CartItem
            id={productWithId0Mock.id}
            name={productWithId0Mock.name}
            price={productWithId0Mock.price}
            quantity={1}
            total={productWithId0Mock.price}
          />
        </tbody>
      </table>,
      { store }
    );

    const decreaseButton = screen.getByTestId("decrease");

    fireEvent.click(decreaseButton);

    const loading = screen.getAllByText("ЗАГРУЗКА")[0];
    expect(loading).toBeVisible();

    await waitFor(() => {
      expect(store.getState().shop.cart).toEqual([]);
    });
  });

  it("Item change amount error", async () => {
    mswServer.use(
      rest.put(`${API_URL}/cart`, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: true, msg: "Ошибка" }), ctx.delay(150));
      })
    );

    const store = createStore(rootReducer);

    store.dispatch(fetchProductsSuccess([{ ...productWithId0Mock, inStock: 2 }]));
    store.dispatch(addToCart("0"));

    expect(store.getState().shop.cart.length).toEqual(1);

    renderWithProviders(
      <table>
        <tbody>
          <CartItem
            id={productWithId0Mock.id}
            name={productWithId0Mock.name}
            price={productWithId0Mock.price}
            quantity={1}
            total={productWithId0Mock.price}
          />
        </tbody>
      </table>,
      { store }
    );

    const increaseButton = screen.getByTestId("increase");

    fireEvent.click(increaseButton);

    await waitFor(async () => {
      const error = await screen.findByText("ОШИБКА");
      expect(error).toBeVisible();
    });

    await waitFor(async () => {
      expect(screen.getByTestId("increase")).toBeVisible();
    });
  });

  it("Item delete error", async () => {
    mswServer.use(
      rest.delete(`${API_URL}/cart`, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: true, msg: "Ошибка" }), ctx.delay(150));
      })
    );

    const store = createStore(rootReducer);

    store.dispatch(fetchProductsSuccess([{ ...productWithId0Mock, inStock: 2 }]));
    store.dispatch(addToCart("0"));

    expect(store.getState().shop.cart.length).toEqual(1);

    renderWithProviders(
      <table>
        <tbody>
          <CartItem
            id={productWithId0Mock.id}
            name={productWithId0Mock.name}
            price={productWithId0Mock.price}
            quantity={1}
            total={productWithId0Mock.price}
          />
        </tbody>
      </table>,
      { store }
    );

    const deleteButton = screen.getByTestId("button");

    fireEvent.click(deleteButton);

    await waitFor(async () => {
      expect(screen.getByText("ОШИБКА")).toBeVisible();
    });

    await waitFor(async () => {
      expect(screen.getByText("УДАЛИТЬ")).toBeVisible();
    });
  });
});
