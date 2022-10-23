import React from "react";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store";

import { clearProduct } from "../../store/actions/shop";
import { ShopItemMemo } from "../../components/shop-item/shop-item";
import { ShowErrorOrLoading } from "../../components/show-error-or-loading/show-error-or-loading";

import styles from "./main.module.css";

export const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, productsLoading, productsError } = useAppSelector((state) => state.shop);

  useEffect(() => {
    dispatch(clearProduct());
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
