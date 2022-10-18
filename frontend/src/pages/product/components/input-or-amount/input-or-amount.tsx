import React from "react";

import { Input } from "../../../../components/input/input";

import styles from "./input-or-amount.module.css";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  editMode: boolean;
}

export const InputOrAmount: React.FC<IProps> = ({ value, onChange, onBlur, readOnly, error, editMode }) => {
  if (editMode) {
    return (
      <Input
        type="text"
        placeholder="В наличии"
        label="В наличии"
        name="inStock"
        value={value.toString()}
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
