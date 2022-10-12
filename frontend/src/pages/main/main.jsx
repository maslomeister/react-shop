import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { clearProduct } from "../../store/actions/shop";
import { ShopItem } from "../../components/shop-item/shop-item";
import { Spinner } from "../../components/spinner/spinner.jxs";

import styles from "./main.module.css";

export const Main = () => {
  const dispatch = useDispatch();
  const { products, productsLoading } = useSelector((state) => state.shop);

  useEffect(() => {
    dispatch(clearProduct());
  }, []);

  return (
    <main className={styles.main}>
      {productsLoading && (
        <div className={styles["spinner-container"]}>
          <Spinner />
        </div>
      )}

      {!productsLoading && (
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
      )}
    </main>
  );
};
