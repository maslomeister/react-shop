import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getNoun } from "../../utils/utils";
import { fetchCart } from "../../api/api";
import { cartDataError, cartDataRequest, cartDataSuccess } from "../../store/actions/shop";

import cartIcon from "../../icons/cart.svg";

import styles from "./footer-cart.module.css";

export const FooterCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authToken } = useSelector((state) => state.auth);
  const { cartLoading, cartTotal, cart, cartIsEmpty } = useSelector((state) => state.shop);

  const cartAmount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  useEffect(() => {
    if (authToken && cartIsEmpty) {
      fetchCart(authToken, dispatch, cartDataRequest, cartDataSuccess, cartDataError);
    }
  }, []);

  const cartHandler = () => {
    navigate("/cart");
  };

  return (
    <>
      {cartLoading || cartAmount === 0 ? (
        <></>
      ) : (
        <footer className={styles["footer-cart"]}>
          <div className={styles.content}>
            <img className={styles.cart} src={cartIcon} alt="cart" onClick={cartHandler} />
            <p>
              В корзине <span>{cartAmount} </span>
              {getNoun(cartAmount, "товар", "товара", "товаров")} на <span>{cartTotal}$</span>
            </p>
          </div>
        </footer>
      )}
    </>
  );
};
