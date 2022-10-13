import React from "react";

import styles from "./input.module.css";

export const Input = ({ type, placeholder, name, value, label, labelColor, maxLength, onChange, onBlur, onFocus, error, readOnly }) => {
  return (
    <div className={styles["input-container"]}>
      {label && (
        <label className={styles.label} style={{ color: labelColor }}>
          {label}
        </label>
      )}
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
        readOnly={readOnly}
      />
      <label className={styles.error}>{error}</label>
    </div>
  );
};
