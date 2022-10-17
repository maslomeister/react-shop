import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsError,
  fetchProductRequest,
  fetchProductSuccess,
  fetchProductError,
  changeProductData,
  clearProduct,
  toggleModal,
  cartDataRequest,
  cartDataSuccess,
  cartDataError,
  addToCart,
  clearCart,
  clearCartLogout,
  removeItemFromCart,
  shopResetState,
} from "../../actions/shop";
import { shopInitialState } from "../../reducers/shop";
import { store } from "../..";

beforeEach(() => {
  store.dispatch(shopResetState());
});

const getShopState = () => {
  return store.getState().shop;
};

const productData: IProduct = {
  id: "0",
  name: "productName",
  description: "description",
  price: 999,
  inStock: 20,
  picture: "picture",
};

const cartProductData: ICartProduct = {
  id: "0",
  name: "productName",
  price: 999,
  quantity: 1,
  totalPrice: 999,
};

describe("Shop reducer", () => {
  it("Should return initial state", () => {
    store.dispatch({ type: {} });

    expect(getShopState()).toEqual(shopInitialState);
  });

  it("Should handle FETCH_PRODUCTS_REQUEST", () => {
    store.dispatch(fetchProductsRequest());

    expect(getShopState()).toEqual({
      ...shopInitialState,
      productsLoading: true,
      productsError: "",
    });
  });

  it("Should handle FETCH_PRODUCTS_SUCCESS", () => {
    store.dispatch(fetchProductsSuccess([{ ...productData }]));

    expect(getShopState()).toEqual({
      ...shopInitialState,
      productsLoading: false,
      products: [{ ...productData }],
    });
  });

  it("Should handle FETCH_PRODUCTS_ERROR", () => {
    const productsError = "this is an error";

    store.dispatch(fetchProductsError(productsError));

    expect(getShopState()).toEqual({
      ...shopInitialState,
      productsLoading: false,
      productsError,
      products: [],
    });
  });

  it("Should handle FETCH_PRODUCT_REQUEST", () => {
    store.dispatch(fetchProductRequest());

    expect(getShopState()).toEqual({
      ...shopInitialState,
      productLoading: true,
      productError: "",
    });
  });

  it("Should handle FETCH_PRODUCT_SUCCESS", () => {
    store.dispatch(fetchProductSuccess({ ...productData }));

    expect(getShopState()).toEqual({
      ...shopInitialState,
      productLoading: false,
      product: { ...productData },
    });
  });

  it("Should handle FETCH_PRODUCT_ERROR", () => {
    const productError = "this is an error";

    store.dispatch(fetchProductError(productError));

    expect(getShopState()).toEqual({
      ...shopInitialState,
      productLoading: false,
      productError,
    });
  });

  it("Should handle CHANGE_PRODUCT_INFO", () => {
    const productDataChanged = {
      name: "newProductName",
      description: "new description",
      price: 869,
      inStock: 10,
    };

    store.dispatch(fetchProductsSuccess([{ ...productData }]));

    store.dispatch(changeProductData("0", productDataChanged));

    expect(getShopState()).toEqual({
      ...shopInitialState,
      products: [
        {
          ...productDataChanged,
          id: "0",
          picture: "picture",
        },
      ],
      product: {
        ...productDataChanged,
        id: "0",
        picture: "picture",
      },
    });
  });

  it("Should handle CLEAR_PRODUCT", () => {
    store.dispatch(fetchProductSuccess(productData));

    store.dispatch(clearProduct());

    expect(getShopState()).toEqual({
      ...shopInitialState,
      productLoading: false,
      product: {},
    });
  });

  it("Should handle TOGGLE_LOGIN_MODAL", () => {
    store.dispatch(toggleModal());

    expect(getShopState()).toEqual({
      ...shopInitialState,
      modalIsOpened: !shopInitialState.modalIsOpened,
    });
  });

  it("Should handle FETCH_CART_REQUEST", () => {
    store.dispatch(cartDataRequest());

    expect(getShopState()).toEqual({
      ...shopInitialState,
      cartLoading: true,
      cartError: "",
    });
  });

  it("Should handle FETCH_CART_SUCCESS", () => {
    store.dispatch(cartDataSuccess([{ ...cartProductData }]));

    const cartTotal = [cartProductData].reduce((previousValue, product) => previousValue + product.totalPrice, 0);

    expect(getShopState()).toEqual({
      ...shopInitialState,
      cartLoading: false,
      cart: [{ ...cartProductData }],
      cartTotal,
      cartIsEmpty: false,
    });
  });

  it("Should handle FETCH_CART_ERROR", () => {
    const cartError = "this is an error";

    store.dispatch(cartDataError(cartError));

    expect(getShopState()).toEqual({
      ...shopInitialState,
      cartLoading: false,
      cartError,
    });
  });

  it("Should handle ADD_TO_CART item that's not in stock", () => {
    const newProduct: IProduct = {
      id: "1",
      name: "second product",
      description: "description",
      price: 50,
      inStock: 0,
      picture: "picture",
    };

    store.dispatch(fetchProductsSuccess([{ ...newProduct }]));

    store.dispatch(addToCart("1"));

    expect(getShopState()).toEqual({
      ...shopInitialState,
      cartLoading: false,
      products: [{ ...newProduct }],
    });
  });

  it("Should handle ADD_TO_CART same item with no quantity", () => {
    store.dispatch(fetchProductsSuccess([{ ...productData }]));

    store.dispatch(cartDataSuccess([{ ...cartProductData }]));

    store.dispatch(addToCart("0"));

    const cartTotal = [{ ...cartProductData, quantity: 2, totalPrice: cartProductData.totalPrice * 2 }].reduce(
      (previousValue, product) => previousValue + product.totalPrice,
      0
    );

    expect(getShopState()).toEqual({
      ...shopInitialState,
      cartLoading: false,
      products: [{ ...productData, inStock: productData.inStock - 1 }],
      cart: [{ ...cartProductData, quantity: cartProductData.quantity + 1, totalPrice: cartProductData.totalPrice * 2 }],
      cartTotal,
      cartIsEmpty: false,
    });
  });

  it("Should handle ADD_TO_CART same item with no quantity and active product", () => {
    store.dispatch(fetchProductsSuccess([{ ...productData }]));

    store.dispatch(fetchProductSuccess({ ...productData }));

    store.dispatch(cartDataSuccess([{ ...cartProductData }]));

    store.dispatch(addToCart("0"));

    const cartTotal = [{ ...cartProductData, quantity: 2, totalPrice: cartProductData.totalPrice * 2 }].reduce(
      (previousValue, product) => previousValue + product.totalPrice,
      0
    );

    expect(getShopState()).toEqual({
      ...shopInitialState,
      cartLoading: false,
      productLoading: false,
      products: [{ ...productData, inStock: productData.inStock - 1 }],
      product: { ...productData, inStock: productData.inStock - 1 },
      cart: [{ ...cartProductData, quantity: cartProductData.quantity + 1, totalPrice: cartProductData.totalPrice * 2 }],
      cartTotal,
      cartIsEmpty: false,
    });
  });

  it("Should handle ADD_TO_CART same item with quantity=1", () => {
    store.dispatch(fetchProductsSuccess([{ ...productData }]));

    store.dispatch(cartDataSuccess([{ ...cartProductData }]));

    store.dispatch(addToCart("0", 1));

    const cartTotal = [{ ...cartProductData, quantity: 2, totalPrice: cartProductData.totalPrice * 2 }].reduce(
      (previousValue, product) => previousValue + product.totalPrice,
      0
    );

    expect(getShopState()).toEqual({
      ...shopInitialState,
      cartLoading: false,
      products: [{ ...productData, inStock: productData.inStock - 1 }],
      cart: [{ ...cartProductData, quantity: cartProductData.quantity + 1, totalPrice: cartProductData.totalPrice * 2 }],
      cartTotal,
      cartIsEmpty: false,
    });
  });

  it("Should handle ADD_TO_CART same item with quantity=-1 and product quantity in cart > 1", () => {
    store.dispatch(fetchProductsSuccess([{ ...productData }]));

    store.dispatch(cartDataSuccess([{ ...cartProductData, quantity: 5 }]));

    store.dispatch(addToCart("0", -1));

    const cartTotal = [{ ...cartProductData, quantity: 4, totalPrice: cartProductData.totalPrice * 4 }].reduce(
      (previousValue, product) => previousValue + product.totalPrice,
      0
    );

    expect(getShopState()).toEqual({
      ...shopInitialState,
      cartLoading: false,
      products: [{ ...productData, inStock: productData.inStock + 1 }],
      cart: [{ ...cartProductData, quantity: 4, totalPrice: cartProductData.totalPrice * 4 }],
      cartTotal,
      cartIsEmpty: false,
    });
  });

  it("Should handle ADD_TO_CART new item with no quantity", () => {
    const newProduct: IProduct = {
      id: "1",
      name: "second product",
      description: "description",
      price: 50,
      inStock: 1,
      picture: "picture",
    };

    const newProductCart: ICartProduct = {
      id: "1",
      name: "second product",
      price: 50,
      quantity: 1,
      totalPrice: 50,
    };

    store.dispatch(fetchProductsSuccess([{ ...productData }, { ...newProduct }]));

    store.dispatch(cartDataSuccess([{ ...cartProductData }]));

    store.dispatch(addToCart("1"));

    const cartTotal = [{ ...cartProductData }, { ...newProductCart }].reduce(
      (previousValue, product) => previousValue + product.totalPrice,
      0
    );

    expect(getShopState()).toEqual({
      ...shopInitialState,
      cartLoading: false,
      products: [{ ...productData }, { ...newProduct, inStock: 0 }],
      cart: [{ ...cartProductData }, { ...newProductCart }],
      cartTotal,
      cartIsEmpty: false,
    });
  });

  it("Should handle ADD_TO_CART new item with quantity=1", () => {
    const newProduct: IProduct = {
      id: "1",
      name: "second product",
      description: "description",
      price: 50,
      inStock: 1,
      picture: "picture",
    };

    const newProductCart: ICartProduct = {
      id: "1",
      name: "second product",
      price: 50,
      quantity: 1,
      totalPrice: 50,
    };

    store.dispatch(fetchProductsSuccess([{ ...productData }, { ...newProduct }]));

    store.dispatch(cartDataSuccess([{ ...cartProductData }]));

    store.dispatch(addToCart("1", 1));

    const cartTotal = [{ ...cartProductData }, { ...newProductCart }].reduce(
      (previousValue, product) => previousValue + product.totalPrice,
      0
    );

    expect(getShopState()).toEqual({
      ...shopInitialState,
      cartLoading: false,
      products: [{ ...productData }, { ...newProduct, inStock: 0 }],
      cart: [{ ...cartProductData }, { ...newProductCart }],
      cartTotal,
      cartIsEmpty: false,
    });
  });

  it("Should handle CLEAR_CART", () => {
    store.dispatch(fetchProductsSuccess([{ ...productData }]));

    store.dispatch(cartDataSuccess([{ ...cartProductData }]));

    store.dispatch(clearCart());

    expect(getShopState()).toEqual({
      ...shopInitialState,
      cartIsEmpty: false,
      products: [{ ...productData, inStock: productData.inStock + 1 }],
      cart: [],
    });
  });

  it("Should handle CLEAR_CART_LOGOUT", () => {
    store.dispatch(cartDataSuccess([{ ...cartProductData }]));

    store.dispatch(clearCartLogout());

    expect(getShopState()).toEqual({
      ...shopInitialState,
      cartIsEmpty: true,
      cart: [],
      cartTotal: 0,
    });
  });

  it("Should handle REMOVE_ITEM_FROM_CART", () => {
    store.dispatch(fetchProductsSuccess([{ ...productData }]));

    store.dispatch(cartDataSuccess([{ ...cartProductData }]));

    store.dispatch(removeItemFromCart("0"));

    expect(getShopState()).toEqual({
      ...shopInitialState,
      products: [{ ...productData, inStock: productData.inStock + 1 }],
      cartIsEmpty: false,
      cart: [],
      cartTotal: 0,
    });
  });

  it("Should handle REMOVE_ITEM_FROM_CART with item that doesn't exist in cart", () => {
    store.dispatch(fetchProductsSuccess([{ ...productData }]));

    store.dispatch(removeItemFromCart("0"));

    expect(getShopState()).toEqual({
      ...shopInitialState,
      products: [{ ...productData }],
      cartIsEmpty: true,
      cart: [],
      cartTotal: 0,
    });
  });
});
