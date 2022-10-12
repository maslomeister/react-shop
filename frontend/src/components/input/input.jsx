import React from "react";

import styles from "./input.module.css";

export const Input = ({ type, placeholder, name, value, label, maxLength, onChange, onBlur, onFocus, error }) => {
  return (
    <div className={styles["input-container"]}>
      <label className={styles.label}>{label}</label>
      <input
        className={`${styles.input} ${value.length > 0 ? styles.active : ""}`}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        onFocus={onFocus}
        name={name}
        maxLength={maxLength}
      />
      <label className={styles.error}>{error}</label>
    </div>
  );
};
