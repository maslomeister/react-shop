import React from "react";

import { Input } from "../../../../components/input/input";

import styles from "./input-or-price.module.css";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  editMode: boolean;
}

export const InputOrPice = ({ value, onChange, onBlur, readOnly, error, editMode }: IProps) => {
  if (editMode) {
    return (
      <Input
        type="text"
        placeholder="Цена"
        label="Цена"
        name="price"
        value={value}
        maxLength={10}
        onChange={onChange}
        onBlur={onBlur}
        readOnly={readOnly}
        error={error}
      />
    );
  }

  return (
    <div className={styles.info}>
      <p>Цена:</p>
      <p>{value}$</p>
    </div>
  );
};
