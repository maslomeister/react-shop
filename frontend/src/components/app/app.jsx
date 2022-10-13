import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchCartApi, fetchProductsApi, verifyUserApi } from "../../api/api";
import { authUserSuccess } from "../../store/actions/auth";
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsError,
  cartDataRequest,
  cartDataSuccess,
  cartDataError,
} from "../../store/actions/shop";
import { ShowErrorOrLoading } from "../show-error-or-loading/show-error-or-loading";
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
  const { authenticated, isUser } = useSelector((state) => state.auth);
  const { modalIsOpened, productsError } = useSelector((state) => state.shop);

  const [verifyUserState, setVerifyUserState] = useState({
    loading: true,
    error: "",
  });

  useEffect(() => {
    const localToken = localStorage.getItem("authToken");

    if (localToken) {
      verifyUserApi(
        localToken,
        () =>
          setVerifyUserState((prevState) => {
            return { ...prevState, loading: true };
          }),
        (data) => {
          setVerifyUserState((prevState) => {
            return { ...prevState, loading: false };
          });
          dispatch(authUserSuccess({ authToken: localToken, userRole: data.userRole, name: data.name }));
          fetchCartApi(localToken, dispatch, cartDataRequest, cartDataSuccess, cartDataError);
        },
        (err) =>
          setVerifyUserState((prevState) => {
            return { ...prevState, loading: false, error: err };
          })
      );
    } else {
      setVerifyUserState((prevState) => {
        return { ...prevState, loading: false };
      });
    }
  }, []);

  const showError = () => {
    if (verifyUserState.error) {
      return verifyUserState.error;
    }
    if (productsError) {
      return productsError;
    }

    return "";
  };

  useEffect(() => {
    fetchProductsApi(dispatch, fetchProductsRequest, fetchProductsSuccess, fetchProductsError);
  }, []);

  return (
    <div className={styles.app}>
      <ShowErrorOrLoading loading={verifyUserState.loading} error={showError()}>
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
        {showFooter && authenticated && isUser && <FooterCart />}
      </ShowErrorOrLoading>
    </div>
  );
};
