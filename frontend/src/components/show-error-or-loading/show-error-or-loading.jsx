import React from "react";

import { Spinner } from "../spinner/spinner";

import styles from "./show-error-or-loading.module.css";

export const ShowErrorOrLoading = ({ error, loading, children }) => {
  if (error) {
    return (
      <div className={styles.error}>
        <h1>Произошла ошибка</h1>
        <p>{error}</p>
        <p>Попробуйте обновить страницу</p>
      </div>
    );
  } else if (loading) {
    return (
      <div className={styles.error}>
        <Spinner />
      </div>
    );
  }

  return children;
};
