import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_ERROR,
  CHANGE_PRODUCT_INFO,
  CLEAR_PRODUCT,
  TOGGLE_AUTH_MODAL,
  FETCH_CART_REQUEST,
  FETCH_CART_SUCCESS,
  FETCH_CART_ERROR,
  ADD_TO_CART,
  CLEAR_CART,
  CLEAR_CART_LOGOUT,
  REMOVE_ITEM_FROM_CART,
  SHOP_RESET_STATE,
} from "./action-types/shop";

export function fetchProductsRequest(): IFetchProductsRequest {
  return {
    type: FETCH_PRODUCTS_REQUEST,
  };
}

export function fetchProductsSuccess(products: IProduct[]): IFetchProductsSuccess {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: { products },
  };
}

export function fetchProductsError(error: string): IFetchProductsError {
  return {
    type: FETCH_PRODUCTS_ERROR,
    payload: { error },
  };
}

export function toggleModal(): IToggleModal {
  return {
    type: TOGGLE_AUTH_MODAL,
  };
}

export function cartDataRequest(): ICartDataRequest {
  return {
    type: FETCH_CART_REQUEST,
  };
}

export function cartDataSuccess(cart: ICartProduct[]): ICartDataSuccess {
  return {
    type: FETCH_CART_SUCCESS,
    payload: { cart },
  };
}

export function cartDataError(error: string): ICartDataError {
  return {
    type: FETCH_CART_ERROR,
    payload: { error },
  };
}

export function addToCart(id: string, quantity?: number): IAddToCart {
  return {
    type: ADD_TO_CART,
    payload: { id, quantity },
  };
}

export function clearCart(): IClearCart {
  return {
    type: CLEAR_CART,
  };
}

export function clearCartLogout(): IClearCartLogout {
  return {
    type: CLEAR_CART_LOGOUT,
  };
}

export function removeItemFromCart(id: string): IRemoveItemFromCart {
  return {
    type: REMOVE_ITEM_FROM_CART,
    payload: { id },
  };
}

export function fetchProductRequest(): IFetchProductRequest {
  return {
    type: FETCH_PRODUCT_REQUEST,
  };
}

export function fetchProductSuccess(product: IProduct): IFetchProductSuccess {
  return {
    type: FETCH_PRODUCT_SUCCESS,
    payload: { product },
  };
}

export function fetchProductError(error: string): IFetchProductError {
  return {
    type: FETCH_PRODUCT_ERROR,
    payload: { error },
  };
}

export function changeProductData(id: string, data: IProductData): IChangeProductData {
  return {
    type: CHANGE_PRODUCT_INFO,
    payload: { id, data },
  };
}

export function clearProduct(): IClearProduct {
  return {
    type: CLEAR_PRODUCT,
  };
}

export function shopResetState(): IShopResetState {
  return {
    type: SHOP_RESET_STATE,
  };
}
