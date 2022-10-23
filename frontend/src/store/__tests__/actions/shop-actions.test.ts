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
} from "../../actions/action-types/shop";
import {
  addToCart,
  cartDataError,
  cartDataRequest,
  cartDataSuccess,
  changeProductData,
  clearCart,
  clearCartLogout,
  clearProduct,
  fetchProductError,
  fetchProductRequest,
  fetchProductsError,
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductSuccess,
  removeItemFromCart,
  shopResetState,
  toggleModal,
} from "../../actions/shop";
import { cartWithItemMock, productsMock, productWithId0Mock } from "../../../../__jest__/api-mocks";

describe("Shop actions", () => {
  it("fetchProductsRequest", () => {
    const action = fetchProductsRequest();

    expect(action.type).toEqual(FETCH_PRODUCTS_REQUEST);
  });

  it("fetchProductsSuccess", () => {
    const action = fetchProductsSuccess(productsMock);

    expect(action.type).toEqual(FETCH_PRODUCTS_SUCCESS);
    expect(action.payload.products).toEqual(productsMock);
  });

  it("fetchProductsError", () => {
    const action = fetchProductsError("This is an error");

    expect(action.type).toEqual(FETCH_PRODUCTS_ERROR);
    expect(action.payload.error).toEqual("This is an error");
  });

  it("fetchProductRequest", () => {
    const action = fetchProductRequest();

    expect(action.type).toEqual(FETCH_PRODUCT_REQUEST);
  });

  it("fetchProductSuccess", () => {
    const action = fetchProductSuccess(productWithId0Mock);

    expect(action.type).toEqual(FETCH_PRODUCT_SUCCESS);
    expect(action.payload.product).toEqual(productWithId0Mock);
  });

  it("fetchProductError", () => {
    const action = fetchProductError("This is an error");

    expect(action.type).toEqual(FETCH_PRODUCT_ERROR);
    expect(action.payload.error).toEqual("This is an error");
  });

  it("changeProductInfo", () => {
    const productDataChanged = {
      name: "newProductName",
      description: "new description",
      price: 869,
      inStock: 10,
    };
    const action = changeProductData("0", productDataChanged);

    expect(action.type).toEqual(CHANGE_PRODUCT_INFO);
    expect(action.payload).toEqual({ id: "0", data: productDataChanged });
  });

  it("clearProduct", () => {
    const action = clearProduct();

    expect(action.type).toEqual(CLEAR_PRODUCT);
  });

  it("toggleAuthModal", () => {
    const action = toggleModal();

    expect(action.type).toEqual(TOGGLE_AUTH_MODAL);
  });

  it("cartDataRequest", () => {
    const action = cartDataRequest();

    expect(action.type).toEqual(FETCH_CART_REQUEST);
  });

  it("cartDataSuccess", () => {
    const action = cartDataSuccess(cartWithItemMock);

    expect(action.type).toEqual(FETCH_CART_SUCCESS);
    expect(action.payload.cart).toEqual(cartWithItemMock);
  });

  it("cartDataError", () => {
    const action = cartDataError("This is an error");

    expect(action.type).toEqual(FETCH_CART_ERROR);
    expect(action.payload.error).toEqual("This is an error");
  });

  it("addToCart", () => {
    const action = addToCart("0", 2);

    expect(action.type).toEqual(ADD_TO_CART);
    expect(action.payload).toEqual({ id: "0", quantity: 2 });
  });

  it("clearCart", () => {
    const action = clearCart();

    expect(action.type).toEqual(CLEAR_CART);
  });

  it("clearCartLogout", () => {
    const action = clearCartLogout();

    expect(action.type).toEqual(CLEAR_CART_LOGOUT);
  });

  it("removeItemFromCart", () => {
    const action = removeItemFromCart("0");

    expect(action.type).toEqual(REMOVE_ITEM_FROM_CART);
    expect(action.payload).toEqual({ id: "0" });
  });

  it("shopResetState", () => {
    const action = shopResetState();

    expect(action.type).toEqual(SHOP_RESET_STATE);
  });
});
