import React, { useMemo, useState } from "react";

import showIcon from "../../icons/eye-show.svg";
import hideIcon from "../../icons/eye-hide.svg";

import styles from "./input.module.css";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  label?: string;
  labelColor?: string;
  maxLength?: number;
  error?: string;
  autoComplete?: string;
}

export const Input: React.FC<IProps> = ({
  type,
  placeholder,
  name,
  value,
  label,
  labelColor,
  maxLength,
  onChange,
  onBlur,
  onFocus,
  error,
  autoComplete,
  readOnly,
}) => {
  const [showPass, setShowPass] = useState(false);
  const toggleShowPass = () => {
    setShowPass(!showPass);
  };

  const inputType = useMemo(() => {
    if (type === "password") {
      if (showPass) {
        return "text";
      }
      return type;
    }
    return type;
  }, [type, showPass]);

  const showToggle = useMemo(() => {
    if (type === "password") {
      return true;
    }
    return false;
  }, [type]);

  return (
    <div className={styles["input-container"]}>
      {label && (
        <label data-testid="label" className={styles.label} style={{ color: labelColor }}>
          {label}
        </label>
      )}
      <div className={styles["input-container"]}>
        <input
          className={`${styles.input} ${value && value.length > 0 ? styles.active : ""}`}
          type={inputType}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          onBlur={onBlur}
          onFocus={onFocus}
          name={name}
          maxLength={maxLength}
          readOnly={readOnly}
          autoComplete={autoComplete}
        />
        {showToggle && (
          <img
            data-testid="show-hide"
            className={styles["show-hide"]}
            src={showPass ? hideIcon : showIcon}
            alt="eye"
            onClick={toggleShowPass}
          />
        )}
      </div>
      <label data-testid="error-label" className={styles.error}>
        {error}
      </label>
    </div>
  );
};
