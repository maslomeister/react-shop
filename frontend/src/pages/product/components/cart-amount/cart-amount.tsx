import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addProductToCartApi } from "../../../../api/api";
import { addToCart } from "../../../../store/actions/shop";
import { Button } from "../../../../components/button/button";

import styles from "./cart-amount.module.css";

interface IProps {
  id: string;
  inStock: number;
  authToken: string;
}

export const CartAmount = ({ id, inStock, authToken }: IProps) => {
  const dispatch = useDispatch();

  const [addToCartState, setAddToCartState] = useState({
    loading: false,
    error: false,
  });
  const [cartAmount, setCartAmount] = useState(1);

  const changeAmountToCart = (action: string) => {
    switch (action) {
      case "inc":
        if (inStock - cartAmount > 0) {
          setCartAmount(cartAmount + 1);
        }
        break;
      case "dec":
        if (cartAmount - 1 > 0) {
          setCartAmount(cartAmount - 1);
        }
        break;
      default:
        setCartAmount(cartAmount + 1);
        break;
    }
  };

  const addToCartHandler = () => {
    addProductToCartApi(
      id,
      authToken,
      () => {
        setAddToCartState((prevState) => {
          return { ...prevState, loading: true };
        });
      },
      () => {
        setAddToCartState((prevState) => {
          return { ...prevState, loading: false, error: false };
        });
        dispatch(addToCart(id, cartAmount));
        setCartAmount(1);
      },
      () => {
        setAddToCartState((prevState) => {
          return { ...prevState, loading: false, error: true };
        });
        setTimeout(
          () =>
            setAddToCartState((prevState) => {
              return { ...prevState, loading: false, error: false };
            }),
          1000
        );
      },
      cartAmount
    );
  };

  return (
    <div className={styles["cart-amount"]}>
      <div className={styles["amount-controls"]}>
        <p className={styles["change-amount"]} onClick={() => changeAmountToCart("dec")}>
          -
        </p>
        <p className={styles["change-amount"]}>{cartAmount}</p>
        <p className={styles["change-amount"]} onClick={() => changeAmountToCart("inc")}>
          +
        </p>
      </div>

      <Button inStock={inStock} loading={addToCartState.loading} error={addToCartState.error} onClick={addToCartHandler} />
    </div>
  );
};
