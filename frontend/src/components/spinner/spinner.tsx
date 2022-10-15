import React from "react";

import styles from "./spinner.module.css";

export const Spinner = () => {
  return (
    <div className={styles["lds-spinner"]}>
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
