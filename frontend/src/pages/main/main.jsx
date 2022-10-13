import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { cartDataError, cartDataRequest, cartDataSuccess, clearProduct } from "../../store/actions/shop";
import { ShopItem } from "../../components/shop-item/shop-item";

import styles from "./main.module.css";
import { fetchCartApi } from "../../api/api";

export const Main = () => {
  const dispatch = useDispatch();
  const { authToken, authenticated, isUser } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.shop);

  useEffect(() => {
    dispatch(clearProduct());
  }, []);

  useEffect(() => {
    if (authenticated && isUser) {
      fetchCartApi(authToken, dispatch, cartDataRequest, cartDataSuccess, cartDataError);
    }
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {products.length > 0 &&
          products.map((product) => {
            return (
              <ShopItem
                id={product.id}
                img={product.picture}
                name={product.name}
                price={product.price}
                inStock={product.inStock}
                key={product.id}
              />
            );
          })}
      </div>
    </main>
  );
};
