import React from "react";

import { Spinner } from "../spinner/spinner";

import styles from "./show-error-or-loading.module.css";

interface IProps {
  error: string;
  loading: boolean;
  children: React.ReactNode;
  dataTestId?: string;
}

export const ShowErrorOrLoading: React.FC<IProps> = ({ error, loading, children, dataTestId }) => {
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
        <Spinner dataTestId={dataTestId} />
      </div>
    );
  }

  return <>{children}</>;
};
