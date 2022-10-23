import { screen } from "@testing-library/react";
import { productsMock } from "../../../__jest__/api-mocks";
import { Main } from "./main";
import { renderWithProviders, rootReducer } from "../../../__jest__/render-with-redux";
import { createStore } from "redux";
import { fetchProductsError, fetchProductsRequest, fetchProductsSuccess } from "../../store/actions/shop";

describe("Main component tests", () => {
  it("Main component is rendered", () => {
    const store = createStore(rootReducer);

    store.dispatch(fetchProductsSuccess(productsMock));

    renderWithProviders(<Main />, { store });

    productsMock.forEach((product) => {
      expect(screen.getByText(product.name)).toBeVisible();
    });
  });

  it("Main component is loading", async () => {
    const store = createStore(rootReducer);

    store.dispatch(fetchProductsRequest());
    renderWithProviders(<Main />, { store });

    expect(screen.getByTestId("main-spinner")).toBeVisible();
  });

  it("Main component is showing error", () => {
    const store = createStore(rootReducer);

    store.dispatch(fetchProductsError("error"));
    renderWithProviders(<Main />, { store });

    expect(screen.getByText("error")).toBeVisible();
  });
});
