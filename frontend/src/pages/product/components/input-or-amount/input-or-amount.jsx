import React from "react";

import { Input } from "../../../../components/input/input";

import styles from "./input-or-amount.module.css";

export const InputOrAmount = ({ value, onChange, onBlur, readOnly, error, editMode }) => {
  if (editMode) {
    return (
      <Input
        type="text"
        placeholder="В наличии"
        label="В наличии"
        name="inStock"
        value={value}
        maxLength={10}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        readOnly={readOnly}
      />
    );
  }

  return (
    <div className={styles.info}>
      <p>В наличии:</p>
      <p>{value}</p>
    </div>
  );
};
