import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { combineReducers } from "redux";
import { createStore } from "redux";
import { Provider } from "react-redux";

import { authReducer as auth } from "../src/store/reducers/auth";
import { shopReducer as shop } from "../src/store/reducers/shop";
import { BrowserRouter } from "react-router-dom";

export const rootReducer = combineReducers({
  auth,
  shop,
});

export const store = createStore(rootReducer);
type StoreType = typeof store;

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  store?: StoreType;
}

export function renderWithProviders(
  component: React.ReactElement,
  {
    // Automatically create a store instance if no store was passed in
    store = createStore(rootReducer),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
    return (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(component, { wrapper: Wrapper, ...renderOptions }) };
}
