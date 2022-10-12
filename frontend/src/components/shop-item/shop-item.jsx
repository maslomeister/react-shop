import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../../store/actions/shop";
import { Button } from "../button/button";
import { addProductToCart } from "../../api/api";

import styles from "./shop-item.module.css";

export const ShopItem = ({ id, img, name, price, inStock }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addToCartState, setAddToCartState] = useState({
    loading: false,
    error: false,
  });
  const { authenticated, authToken } = useSelector((state) => state.auth);

  const onClickHandler = () => {
    addProductToCart(
      id,
      authToken,
      undefined,
      () => {
        setAddToCartState((prevState) => {
          return { ...prevState, loading: true };
        });
      },
      () => {
        setAddToCartState((prevState) => {
          return { ...prevState, loading: false };
        });
        dispatch(addToCart(id));
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
      }
    );
  };

  const aboutProductHandler = () => {
    navigate(`/products/${id}`);
  };

  return (
    <div className={styles["shop-item"]}>
      <img className={styles.image} src={img} alt="product" />
      <div className={styles.info}>
        <p className={styles.title} onClick={aboutProductHandler}>
          {name}
        </p>
        <div className={styles.price}>
          <p>Цена:</p>
          <p>{price}$</p>
        </div>
        {authenticated ? (
          <Button inStock={inStock} loading={addToCartState.loading} error={addToCartState.error} onClick={onClickHandler} />
        ) : (
          <p style={{ fontSize: "16px" }}>Войдите чтобы добавить в корзину</p>
        )}
      </div>
    </div>
  );
};
