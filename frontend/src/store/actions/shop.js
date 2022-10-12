import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_ERROR,
  CLEAR_PRODUCT,
  TOGGLE_LOGIN_MODAL,
  FETCH_CART_REQUEST,
  FETCH_CART_SUCCESS,
  FETCH_CART_ERROR,
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_ITEM_FROM_CART,
} from "./action-types/shop";

export function fetchProductsRequest() {
  return {
    type: FETCH_PRODUCTS_REQUEST,
  };
}

export function fetchProductsSuccess(products) {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: { products },
  };
}

export function fetchProductsError(error) {
  return {
    type: FETCH_PRODUCTS_ERROR,
    payload: { error },
  };
}

export function toggleModal() {
  return {
    type: TOGGLE_LOGIN_MODAL,
  };
}

export function cartDataRequest() {
  return {
    type: FETCH_CART_REQUEST,
  };
}

export function cartDataSuccess(cart) {
  return {
    type: FETCH_CART_SUCCESS,
    payload: { cart },
  };
}

export function cartDataError(error) {
  return {
    type: FETCH_CART_ERROR,
    payload: { error },
  };
}

export function addToCart(id, quantity) {
  return {
    type: ADD_TO_CART,
    payload: { id, quantity },
  };
}

export function clearCartSuccess() {
  return {
    type: CLEAR_CART,
  };
}

export function removeItemFromCart(id) {
  return {
    type: REMOVE_ITEM_FROM_CART,
    payload: { id },
  };
}

export function fetchProductRequest() {
  return {
    type: FETCH_PRODUCT_REQUEST,
  };
}

export function fetchProductSuccess(product) {
  return {
    type: FETCH_PRODUCT_SUCCESS,
    payload: { product },
  };
}

export function fetchProductError(error) {
  return {
    type: FETCH_PRODUCT_ERROR,
    payload: { error },
  };
}

export function clearProduct() {
  return {
    type: CLEAR_PRODUCT,
  };
}
