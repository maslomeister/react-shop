import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../store";
import { useNavigate } from "react-router-dom";

import { fetchCartApi } from "../../api/api";
import { cartDataError, cartDataRequest, cartDataSuccess } from "../../store/actions/shop";
import { getNoun } from "../../utils/utils";

import cartIcon from "../../icons/cart.svg";

import styles from "./footer-cart.module.css";

const ShowCart: React.FC<{ cartLoading: boolean; children: React.ReactNode }> = ({ cartLoading, children }) => {
  if (cartLoading) {
    return <></>;
  }

  return <>{children}</>;
};

export const FooterCart: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authToken } = useSelector((state) => state.auth);
  const { cartLoading, cartTotal, cart, cartIsEmpty } = useSelector((state) => state.shop);

  const cartAmount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  useEffect(() => {
    if (authToken && cartIsEmpty) {
      fetchCartApi(authToken, dispatch, cartDataRequest, cartDataSuccess, cartDataError);
    }
  }, []);

  const cartHandler = () => {
    navigate("/cart");
  };

  const isCartEmpty = useMemo(() => {
    if (cart.length === 0) {
      return <p>В корзине пусто</p>;
    } else {
      return (
        <p>
          В корзине <span>{cartAmount} </span>
          {getNoun(cartAmount, "товар", "товара", "товаров")} на <span>{cartTotal}$</span>
        </p>
      );
    }
  }, [cart, cartAmount, cartTotal]);

  return (
    <ShowCart cartLoading={cartLoading}>
      <footer className={styles["footer-cart"]} data-testid="footer-cart">
        <div className={styles.content}>
          <img className={styles.cart} src={cartIcon} alt="cart" onClick={cartHandler} />
          {isCartEmpty}
        </div>
      </footer>
    </ShowCart>
  );
};
