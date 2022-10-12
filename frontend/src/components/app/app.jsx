import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchCart, fetchProducts } from "../../api/api";
import { authUserSuccess } from "../../store/actions/auth";
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsError,
  cartDataRequest,
  cartDataSuccess,
  cartDataError,
} from "../../store/actions/shop";
import { Navbar } from "../navbar/navbar";
import { Main } from "../../pages/main/main";
import { About } from "../../pages/about/about";
import { Product } from "../../pages/product/product";
import { LoginModal } from "../login-modal/login-modal";
import { NotFound } from "../../pages/not-found/not-found";
import { FooterCart } from "../footer-cart/footer-cart";
import { Cart } from "../../pages/cart/cart";
import { ProtectedRoute } from "../protected-route/protected-route";

import styles from "./app.module.css";

export const App = () => {
  const [showFooter, setShowFooter] = useState(true);
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.auth);
  const { modalIsOpened } = useSelector((state) => state.shop);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("authToken"));

    if (userData) {
      dispatch(authUserSuccess(userData));
      fetchCart(userData.authToken, dispatch, cartDataRequest, cartDataSuccess, cartDataError);
    }
  }, []);

  useEffect(() => {
    fetchProducts(dispatch, fetchProductsRequest, fetchProductsSuccess, fetchProductsError);
  }, []);

  return (
    <div className={styles.app}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute authenticated={authenticated}>
              <Cart showFooter={setShowFooter} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {modalIsOpened && <LoginModal />}
      {showFooter && authenticated && <FooterCart />}
    </div>
  );
};
