import React from "react";

import styles from "./spinner.module.css";

export const Spinner: React.FC<{ dataTestId?: string }> = ({ dataTestId }) => {
  return (
    <div className={styles["lds-spinner"]} data-testid={dataTestId}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
