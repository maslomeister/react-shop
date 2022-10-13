import React, { useMemo } from "react";

import styles from "./button.module.css";

export const Button = ({ inStock, inactive, variant, width, type, onClick, loading, error, children }) => {
  const buyButtonText = useMemo(() => {
    if (error) {
      return "ОШИБКА";
    } else if (loading) {
      return "ДОБАВЛЯЕМ";
    } else if (inStock <= 0) {
      return "НЕТ В НАЛИЧИИ";
    } else if (inStock > 0) {
      return "В КОРЗИНУ";
    }
  }, [inStock, loading, error]);

  const onClickHandler = () => {
    if (onClick) {
      if (loading || error) {
        return undefined;
      } else if (inStock !== undefined && inStock > 0) {
        return onClick();
      } else if (children) {
        return onClick();
      }
    }

    return undefined;
  };

  const loadingStyle = useMemo(() => {
    if (error) {
      return styles.error;
    } else if (loading) {
      return styles.loading;
    }
    return "";
  }, [loading, error]);

  const buyStyle = useMemo(() => {
    if (inStock !== undefined && inStock <= 0) {
      return styles.inactive;
    } else {
      return "";
    }
  }, [inStock]);

  const blockedType = useMemo(() => {
    if (inactive) {
      return styles.inactive;
    } else {
      return "";
    }
  }, [inactive]);

  const variantType = useMemo(() => {
    switch (variant) {
      case "red":
        return styles.red;
      case "error":
        return styles.error;
      default:
        return "";
    }
  }, [variant]);

  return (
    <button
      className={`${styles.button} ${blockedType} ${variantType} ${buyStyle} ${loadingStyle}`}
      type={type}
      onClick={onClickHandler}
      style={{ width: width + "px" }}
    >
      {children ? children : buyButtonText}
    </button>
  );
};
