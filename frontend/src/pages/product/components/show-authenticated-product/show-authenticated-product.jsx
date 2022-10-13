import React from "react";

import { Button } from "../../../../components/button/button";

import styles from "./show-authenticated-product.module.css";

export const ShowAuthenticatedProduct = ({ authenticated, isUser, inStock, children }) => {
  if (!authenticated) {
    return <p className={styles.text}>Войдите чтобы добавить в корзину</p>;
  }

  if (inStock === 0 && isUser) {
    return <Button inStock={inStock} />;
  }

  return children;
};
