import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "../../store";

import { Button } from "../button/button";
import { addToCart } from "../../store/actions/shop";
import { addProductToCartApi } from "../../api/api";

import styles from "./shop-item.module.css";

interface IUserAndUthenticated {
  authenticated: boolean;
  isUser: boolean;
  children: React.ReactNode;
}

const IsUserAndAuthenticated = ({ authenticated, isUser, children }: IUserAndUthenticated) => {
  if (authenticated) {
    if (isUser) {
      return <>{children}</>;
    } else {
      return <></>;
    }
  }

  return <p>Войдите чтобы добавить в корзину</p>;
};

interface IProps {
  id: string;
  img: string;
  name: string;
  price: number;
  inStock: number;
}

export const ShopItem = ({ id, img, name, price, inStock }: IProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addToCartState, setAddToCartState] = useState({
    loading: false,
    error: false,
  });
  const { authenticated, authToken, isUser } = useSelector((state) => state.auth);

  const onClickHandler = () => {
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
      },
      undefined
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
        <IsUserAndAuthenticated authenticated={authenticated} isUser={isUser}>
          <Button inStock={inStock} loading={addToCartState.loading} error={addToCartState.error} onClick={onClickHandler} />
        </IsUserAndAuthenticated>
      </div>
    </div>
  );
};
