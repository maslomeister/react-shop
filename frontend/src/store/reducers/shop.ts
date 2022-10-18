import { Reducer } from "redux";

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
} from "../actions/action-types/shop";

export interface IShopInitialState {
  productsLoading: boolean;
  products: IProduct[];
  productsError: string;
  cartLoading: boolean;
  cart: ICartProduct[];
  modalIsOpened: boolean;
  cartIsEmpty: boolean;
  cartError: string;
  cartTotal: number;
  product: IProduct;
  productError: string;
  productLoading: boolean;
}

export const shopInitialState = {
  productsLoading: false,
  products: [] as IProduct[],
  productsError: "",
  cartLoading: false,
  cart: [] as ICartProduct[],
  modalIsOpened: false,
  cartIsEmpty: true,
  cartError: "",
  cartTotal: 0,
  product: {} as IProduct,
  productError: "",
  productLoading: true,
};

export const shopReducer: Reducer<IShopInitialState, TShopActions> = (state = shopInitialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        productsLoading: true,
        productsError: "",
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        productsLoading: false,
        products: action.payload.products,
      };
    case FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        productsLoading: false,
        productsError: action.payload.error,
        products: [],
      };
    case FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        productLoading: true,
        productError: "",
      };
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        productLoading: false,
        product: action.payload.product,
      };
    case FETCH_PRODUCT_ERROR:
      return {
        ...state,
        productLoading: false,
        productError: action.payload.error,
      };
    case CLEAR_PRODUCT:
      return {
        ...state,
        product: {} as IProduct,
      };
    case TOGGLE_AUTH_MODAL:
      return {
        ...state,
        modalIsOpened: !state.modalIsOpened,
      };
    case FETCH_CART_REQUEST:
      return {
        ...state,
        cartLoading: true,
        cartError: "",
      };
    case FETCH_CART_SUCCESS: {
      const cartTotal = action.payload.cart.reduce((previousValue, product) => previousValue + product.totalPrice, 0);
      return {
        ...state,
        cartLoading: false,
        cart: action.payload.cart,
        cartTotal,
        cartIsEmpty: false,
      };
    }
    case FETCH_CART_ERROR:
      return {
        ...state,
        cartLoading: false,
        cartError: action.payload.error,
      };
    case ADD_TO_CART: {
      const itemId = action.payload.id;
      const quantity = action.payload.quantity;

      const products = [...state.products];
      const productIndex = products.findIndex((product) => product.id === itemId);
      const cart = [...state.cart];
      const cartIndex = cart.findIndex((item) => item.id === itemId);

      if (products[productIndex].inStock - (quantity ?? 1) >= 0) {
        if (cartIndex > -1) {
          products[productIndex].inStock -= quantity ?? 1;
          cart[cartIndex].quantity += quantity ?? 1;
          cart[cartIndex].totalPrice = cart[cartIndex].quantity * cart[cartIndex].price;
        } else {
          cart.push({
            id: products[productIndex].id,
            name: products[productIndex].name,
            price: products[productIndex].price,
            quantity: quantity ?? 1,
            totalPrice: (quantity ?? 1) * products[productIndex].price,
          });
          products[productIndex].inStock -= quantity ?? 1;
        }

        const cartTotal = cart.reduce((previousValue, product) => previousValue + product.totalPrice, 0);

        const isEmpty = Object.keys(state.product).length === 0;
        if (!isEmpty) {
          const product = { ...state.product };
          product.inStock = products[productIndex].inStock;
          return {
            ...state,
            cart: cart,
            products: products,
            cartTotal,
            product: product,
          };
        }

        return {
          ...state,
          cart: cart,
          products: products,
          cartTotal,
        };
      }
      return {
        ...state,
      };
    }
    case CLEAR_CART_LOGOUT:
      return {
        ...state,
        cartIsEmpty: true,
        cart: [],
        cartTotal: 0,
      };
    case CLEAR_CART: {
      const products = [...state.products];
      const cart = [...state.cart];

      cart.map((item) => {
        const productIndex = products.findIndex((product) => product.id === item.id);
        return (products[productIndex].inStock += item.quantity);
      });

      return {
        ...state,
        cart: [],
        cartTotal: 0,
        products,
      };
    }
    case CHANGE_PRODUCT_INFO: {
      const products = [...state.products];
      const productIndex = products.findIndex((item) => item.id === action.payload.id);

      products[productIndex] = {
        ...products[productIndex],
        name: action.payload.data.name,
        description: action.payload.data.description,
        price: action.payload.data.price,
        inStock: action.payload.data.inStock,
      };

      const product = products[productIndex];

      return {
        ...state,
        products,
        product,
      };
    }
    case REMOVE_ITEM_FROM_CART: {
      const itemId = action.payload.id;

      const cart = [...state.cart];

      const cartIndex = cart.findIndex((item) => item.id === itemId);

      const products = [...state.products];

      const productIndex = products.findIndex((product) => product.id === itemId);

      if (cartIndex > -1) {
        products[productIndex].inStock += cart[cartIndex].quantity;
        cart.splice(cartIndex, 1);
        const total = cart.reduce((previousValue, product) => previousValue + product.totalPrice, 0);

        return {
          ...state,
          cart: cart,
          cartTotal: total,
          products,
        };
      }
      return {
        ...state,
      };
    }
    case SHOP_RESET_STATE: {
      return shopInitialState;
    }
    default:
      return state;
  }
};
