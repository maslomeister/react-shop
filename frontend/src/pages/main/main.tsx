import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../store";

import { fetchCartApi } from "../../api/api";
import { cartDataError, cartDataRequest, cartDataSuccess, clearProduct } from "../../store/actions/shop";
import { ShopItemMemo } from "../../components/shop-item/shop-item";
import { ShowErrorOrLoading } from "../../components/show-error-or-loading/show-error-or-loading";

import styles from "./main.module.css";

export const Main: React.FC = () => {
  const dispatch = useDispatch();
  const { authToken, authenticated, isUser } = useSelector((state) => state.auth);
  const { products, productsLoading, productsError } = useSelector((state) => state.shop);

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
      <ShowErrorOrLoading loading={productsLoading} error={productsError} dataTestId="main-spinner">
        <div className={styles.container}>
          {products.length > 0 &&
            products.map((product) => {
              return (
                <ShopItemMemo
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
      </ShowErrorOrLoading>
    </main>
  );
};
