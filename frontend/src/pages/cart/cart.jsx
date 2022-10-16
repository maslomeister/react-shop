import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { clearCartApi } from "../../api/api";
import { clearCart } from "../../store/actions/shop";
import { Button } from "../../components/button/button";
import { CartItem } from "../../components/cart-item/cart-item";

import styles from "./cart.module.css";

export const Cart = ({ showFooter }) => {
  const dispatch = useDispatch();
  const { authToken } = useSelector((state) => state.auth);
  const { cart, cartLoading, cartTotal } = useSelector((state) => state.shop);

  const [clearCartState, setClearCartState] = useState({
    loading: false,
    error: false,
  });

  useEffect(() => {
    showFooter(false);
    return () => {
      showFooter(true);
    };
  }, []);

  const onClearCartHandler = () => {
    clearCartApi(
      authToken,
      () =>
        setClearCartState((prevState) => {
          return { ...prevState, loading: true };
        }),
      () => {
        setClearCartState((prevState) => {
          return { ...prevState, loading: false };
        });
        dispatch(clearCart());
      },
      () => {
        setClearCartState((prevState) => {
          return { ...prevState, loading: false, error: true };
        });
        setTimeout(
          () =>
            setClearCartState((prevState) => {
              return { ...prevState, loading: false, error: false };
            }),
          1000
        );
      }
    );
  };

  return (
    <main className={styles.cart}>
      <h2>Корзина</h2>
      {!cartLoading && (
        <>
          {cart.length === 0 ? (
            <div className={styles.empty}>
              <h2>Тут пока пусто</h2>
            </div>
          ) : (
            <table className={styles["fl-table"]}>
              <thead>
                <tr>
                  <th className={styles.id}>id</th>
                  <th className={styles.name}>Имя</th>
                  <th className={styles.price}>Цена</th>
                  <th className={styles.amount}>Кол-во</th>
                  <th className={styles.total}>Итог</th>
                  <th className={styles.delete}></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <CartItem
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    total={item.totalPrice}
                    key={item.id}
                  />
                ))}
              </tbody>
            </table>
          )}
          {cart.length > 0 && (
            <footer className={styles["controls-container"]}>
              <div className={styles.controls}>
                <Button loading={clearCartState.loading} error={clearCartState.error} onClick={onClearCartHandler}>
                  Отчистить корзину
                </Button>
                <div className={styles.pay}>
                  <p>Итог:{cartTotal}$</p>
                  <Button inactive={true}>Оплатить</Button>
                </div>
              </div>
            </footer>
          )}
        </>
      )}
    </main>
  );
};
