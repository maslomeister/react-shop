interface IShopActionTypes {
  FETCH_PRODUCTS_REQUEST: "FETCH_PRODUCTS_REQUEST";
  FETCH_PRODUCTS_SUCCESS: "FETCH_PRODUCTS_SUCCESS";
  FETCH_PRODUCTS_ERROR: "FETCH_PRODUCTS_ERROR";

  FETCH_PRODUCT_REQUEST: "FETCH_PRODUCT_REQUEST";
  FETCH_PRODUCT_SUCCESS: "FETCH_PRODUCT_SUCCESS";
  FETCH_PRODUCT_ERROR: "FETCH_PRODUCT_ERROR";
  CHANGE_PRODUCT_INFO: "CHANGE_PRODUCT_INFO";
  CLEAR_PRODUCT: "CLEAR_PRODUCT";

  TOGGLE_AUTH_MODAL: "TOGGLE_AUTH_MODAL";

  FETCH_CART_REQUEST: "FETCH_CART_REQUEST";
  FETCH_CART_SUCCESS: "FETCH_CART_SUCCESS";
  FETCH_CART_ERROR: "FETCH_CART_ERROR";
  ADD_TO_CART: "ADD_TO_CART";
  CLEAR_CART: "CLEAR_CART";
  CLEAR_CART_LOGOUT: "CLEAR_CART_LOGOUT";
  REMOVE_ITEM_FROM_CART: "REMOVE_ITEM_FROM_CART";

  SHOP_RESET_STATE: "SHOP_RESET_STATE";
}

interface IFetchProductsRequest {
  type: IShopActionTypes["FETCH_PRODUCTS_REQUEST"];
}

interface IFetchProductsSuccess {
  type: IShopActionTypes["FETCH_PRODUCTS_SUCCESS"];
  payload: { products: IProduct[] };
}

interface IFetchProductsError {
  type: IShopActionTypes["FETCH_PRODUCTS_ERROR"];
  payload: { error: string };
}

interface IToggleModal {
  type: IShopActionTypes["TOGGLE_AUTH_MODAL"];
}

interface ICartDataRequest {
  type: IShopActionTypes["FETCH_CART_REQUEST"];
}

interface ICartDataSuccess {
  type: IShopActionTypes["FETCH_CART_SUCCESS"];
  payload: { cart: ICartProduct[] };
}

interface ICartDataError {
  type: IShopActionTypes["FETCH_CART_ERROR"];
  payload: { error: string };
}

interface IAddToCart {
  type: IShopActionTypes["ADD_TO_CART"];
  payload: { id: string; quantity?: number };
}

interface IClearCart {
  type: IShopActionTypes["CLEAR_CART"];
}

interface IClearCartLogout {
  type: IShopActionTypes["CLEAR_CART_LOGOUT"];
}

interface IRemoveItemFromCart {
  type: IShopActionTypes["REMOVE_ITEM_FROM_CART"];
  payload: { id: string };
}

interface IFetchProductRequest {
  type: IShopActionTypes["FETCH_PRODUCT_REQUEST"];
}

interface IFetchProductSuccess {
  type: IShopActionTypes["FETCH_PRODUCT_SUCCESS"];
  payload: { product: IProduct };
}

interface IFetchProductError {
  type: IShopActionTypes["FETCH_PRODUCT_ERROR"];
  payload: { error: string };
}

interface IChangeProductData {
  type: IShopActionTypes["CHANGE_PRODUCT_INFO"];
  payload: { id: string; data: IProductData };
}

interface IClearProduct {
  type: IShopActionTypes["CLEAR_PRODUCT"];
}

interface IShopResetState {
  type: IShopActionTypes["SHOP_RESET_STATE"];
}

type TShopActions =
  | { type: Record<string, never> }
  | IFetchProductsRequest
  | IFetchProductsSuccess
  | IFetchProductsError
  | IToggleModal
  | ICartDataRequest
  | ICartDataSuccess
  | ICartDataError
  | IAddToCart
  | IClearCart
  | IClearCartLogout
  | IRemoveItemFromCart
  | IFetchProductRequest
  | IFetchProductSuccess
  | IFetchProductError
  | IChangeProductData
  | IClearProduct
  | IShopResetState;
