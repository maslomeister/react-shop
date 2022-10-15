import React, { useMemo } from "react";

import styles from "./text-area.module.css";

interface IProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder?: string;
  name: string;
  label?: string;
  value: string;
  error: string;
}

export const TextArea = ({ placeholder, name, label, value, onChange, readOnly, error }: IProps) => {
  const counterOrError = useMemo(() => (error ? value.length + "/600 " + error : value.length + "/600"), [value, error]);
  return (
    <div className={styles["input-container"]}>
      <label className={styles.label}>{label}</label>
      <textarea className={styles.input} placeholder={placeholder} name={name} value={value} onChange={onChange} readOnly={readOnly} />
      <label className={`${styles.counter} ${error ? styles.error : ""}`}>{counterOrError}</label>
    </div>
  );
};
