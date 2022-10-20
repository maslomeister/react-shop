import { fireEvent, screen } from "@testing-library/react";
import { loginUserDataMock, loginAdminDataMock, cartWithItemMock, productWithId0Mock } from "../../../__jest__/api-mocks";
import { Product } from "./product";
import { renderWithProviders, rootReducer } from "../../../__jest__/render-with-redux";
import { createStore } from "redux";
import { loginUserSuccess } from "../../store/actions/auth";
import { fetchProductSuccess } from "../../store/actions/shop";
import { Route, Routes } from "react-router-dom";
import { mswServer } from "../../setupTests";
import { rest } from "msw";
import { API_URL } from "../../api/api";

describe("Product component tests", () => {
  window.history.pushState({}, "title", "/products/0");

  it("Product is shown for user", async () => {
    const store = createStore(rootReducer);

    store.dispatch(loginUserSuccess(loginUserDataMock));
    store.dispatch(fetchProductSuccess(productWithId0Mock));

    renderWithProviders(
      <Routes>
        <Route path="/products/:id" element={<Product />} />
      </Routes>,
      { store }
    );

    expect(await screen.findByTestId("product-data")).toBeVisible();
    expect(screen.getByText(productWithId0Mock.name)).toBeVisible();
    expect(screen.getByText(`${productWithId0Mock.price}$`)).toBeVisible();
    expect(screen.getByText(productWithId0Mock.inStock)).toBeVisible();
    expect(screen.getByText(productWithId0Mock.description)).toBeVisible();
  });

  it("Product is shown for admin", async () => {
    const store = createStore(rootReducer);

    store.dispatch(loginUserSuccess(loginAdminDataMock));
    store.dispatch(fetchProductSuccess(productWithId0Mock));

    renderWithProviders(
      <Routes>
        <Route path="/products/:id" element={<Product />} />
      </Routes>,
      { store }
    );

    expect(await screen.findByText("РЕДАКТИРОВАТЬ")).toBeVisible();
  });

  it("Product change with empty name should result in error", async () => {
    const store = createStore(rootReducer);

    store.dispatch(loginUserSuccess(loginAdminDataMock));
    store.dispatch(fetchProductSuccess(productWithId0Mock));

    renderWithProviders(
      <Routes>
        <Route path="/products/:id" element={<Product />} />
      </Routes>,
      { store }
    );

    const editButton = await screen.findByText("РЕДАКТИРОВАТЬ");

    fireEvent.click(editButton);

    const titleInput = screen.getByPlaceholderText("Название");

    fireEvent.change(titleInput, { target: { value: "" } });

    const saveButton = await screen.findByText("СОХРАНИТЬ");

    fireEvent.click(saveButton);

    expect(await screen.findByText("В каком-то из полей ошибка")).toBeVisible();
  });

  it("Product change with empty price should result in error", async () => {
    const store = createStore(rootReducer);

    store.dispatch(loginUserSuccess(loginAdminDataMock));
    store.dispatch(fetchProductSuccess(productWithId0Mock));

    renderWithProviders(
      <Routes>
        <Route path="/products/:id" element={<Product />} />
      </Routes>,
      { store }
    );

    const editButton = await screen.findByText("РЕДАКТИРОВАТЬ");

    fireEvent.click(editButton);

    const priceInput = screen.getByPlaceholderText("Цена");

    fireEvent.change(priceInput, { target: { value: "0" } });

    const saveButton = await screen.findByText("СОХРАНИТЬ");

    fireEvent.click(saveButton);

    expect(await screen.findByText("В каком-то из полей ошибка")).toBeVisible();
  });

  it("Product change with empty description should result in error", async () => {
    const store = createStore(rootReducer);

    store.dispatch(loginUserSuccess(loginAdminDataMock));
    store.dispatch(fetchProductSuccess(productWithId0Mock));

    renderWithProviders(
      <Routes>
        <Route path="/products/:id" element={<Product />} />
      </Routes>,
      { store }
    );

    const editButton = await screen.findByText("РЕДАКТИРОВАТЬ");

    fireEvent.click(editButton);

    const descriptionInput = screen.getByPlaceholderText("Описание");

    fireEvent.change(descriptionInput, { target: { value: "" } });

    const saveButton = await screen.findByText("СОХРАНИТЬ");

    fireEvent.click(saveButton);

    expect(await screen.findByText("В каком-то из полей ошибка")).toBeVisible();
  });

  it("Product change with description larger than 600 symbols should result in error", async () => {
    const store = createStore(rootReducer);

    store.dispatch(loginUserSuccess(loginAdminDataMock));
    store.dispatch(fetchProductSuccess(productWithId0Mock));

    renderWithProviders(
      <Routes>
        <Route path="/products/:id" element={<Product />} />
      </Routes>,
      { store }
    );

    const editButton = await screen.findByText("РЕДАКТИРОВАТЬ");

    fireEvent.click(editButton);

    const descriptionInput = screen.getByPlaceholderText("Описание");

    fireEvent.change(descriptionInput, {
      target: {
        value:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi hendrerit ultricies eleifend. Suspendisse ornare faucibus condimentum. Donec vehicula lacinia velit sed ultricies. Nunc et suscipit nibh. Morbi et interdum est, nec consequat erat. Praesent nec leo et metus sodales hendrerit ut ut est. Aliquam id turpis nec leo ullamcorper placerat. Pellentesque sit amet dui ac ante ullamcorper feugiat id at ligula. Cras eget ante at ligula cursus feugiat. Donec sagittis consectetur mauris, et sollicitudin felis sodales vel. Suspendisse in viverra nisl. Aenean velit tortor, suscipit non eleifend nam.",
      },
    });

    const saveButton = await screen.findByText("СОХРАНИТЬ");

    fireEvent.click(saveButton);

    expect(await screen.findByText("В каком-то из полей ошибка")).toBeVisible();
  });

  it("Click on cancel should clear all errors and reset any changes to inputs", async () => {
    const store = createStore(rootReducer);

    store.dispatch(loginUserSuccess(loginAdminDataMock));
    store.dispatch(fetchProductSuccess(productWithId0Mock));

    renderWithProviders(
      <Routes>
        <Route path="/products/:id" element={<Product />} />
      </Routes>,
      { store }
    );

    const editButton = await screen.findByText("РЕДАКТИРОВАТЬ");

    fireEvent.click(editButton);

    const titleInput = screen.getByPlaceholderText("Название") as HTMLInputElement;

    fireEvent.change(titleInput, { target: { value: "" } });

    const priceInput = screen.getByPlaceholderText("Цена") as HTMLInputElement;

    fireEvent.change(priceInput, { target: { value: "0" } });

    const inStockInput = screen.getByPlaceholderText("В наличии") as HTMLInputElement;

    fireEvent.change(inStockInput, { target: { value: "5" } });

    const descriptionInput = screen.getByPlaceholderText("Описание") as HTMLInputElement;

    fireEvent.change(descriptionInput, {
      target: {
        value: "1",
      },
    });

    const saveButton = await screen.findByText("СОХРАНИТЬ");

    fireEvent.click(saveButton);

    expect(await screen.findByText("В каком-то из полей ошибка")).toBeVisible();

    const cancelButton = await screen.findByText("ОТМЕНА");

    fireEvent.click(cancelButton);

    fireEvent.click(screen.getByText("РЕДАКТИРОВАТЬ"));

    expect((screen.getByPlaceholderText("Название") as HTMLInputElement).value).toEqual(productWithId0Mock.name);
    expect((screen.getByPlaceholderText("Цена") as HTMLInputElement).value).toEqual(productWithId0Mock.price.toString());
    expect((screen.getByPlaceholderText("В наличии") as HTMLInputElement).value).toEqual(productWithId0Mock.inStock.toString());
    expect((screen.getByPlaceholderText("Описание") as HTMLInputElement).value).toEqual(productWithId0Mock.description);
  });

  it("Change product", async () => {
    mswServer.use(
      rest.put(`${API_URL}/products/0`, (req, res, ctx) => {
        return res(ctx.json({ ...cartWithItemMock, name: "New product name" }), ctx.delay(150));
      })
    );

    const store = createStore(rootReducer);

    store.dispatch(loginUserSuccess(loginAdminDataMock));
    store.dispatch(fetchProductSuccess(productWithId0Mock));

    renderWithProviders(
      <Routes>
        <Route path="/products/:id" element={<Product />} />
      </Routes>,
      { store }
    );

    const editButton = await screen.findByText("РЕДАКТИРОВАТЬ");

    fireEvent.click(editButton);

    const titleInput = screen.getByPlaceholderText("Название") as HTMLInputElement;

    fireEvent.change(titleInput, { target: { value: "New product name" } });

    const saveButton = await screen.findByText("СОХРАНИТЬ");

    fireEvent.click(saveButton);

    expect(await screen.findByText("РЕДАКТИРОВАТЬ")).toBeVisible();
    expect(screen.getByText("New product name")).toBeVisible();
  });

  it("Change product error", async () => {
    mswServer.use(
      rest.put(`${API_URL}/products/0`, (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({ error: true, msg: "error" }), ctx.delay(150));
      })
    );

    const store = createStore(rootReducer);

    store.dispatch(loginUserSuccess(loginAdminDataMock));
    store.dispatch(fetchProductSuccess(productWithId0Mock));

    renderWithProviders(
      <Routes>
        <Route path="/products/:id" element={<Product />} />
      </Routes>,
      { store }
    );

    const editButton = await screen.findByText("РЕДАКТИРОВАТЬ");

    fireEvent.click(editButton);

    const saveButton = await screen.findByText("СОХРАНИТЬ");

    fireEvent.click(saveButton);

    expect(await screen.findByText("ЗАГРУЗКА")).toBeVisible();

    expect(await screen.findByText("ОШИБКА")).toBeVisible();

    expect(await screen.findByText("СОХРАНИТЬ")).toBeVisible();
  });
});
