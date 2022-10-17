import React from "react";

import styles from "./button-text.module.css";

interface IProps {
  className?: string;
  onClick?: () => void;
  color?: string;
  children?: string;
}
export const ButtonText = ({ className, color, onClick, children }: IProps) => {
  return (
    <button data-testid="text-button" className={`${styles.button} ${className}`} onClick={onClick} style={{ color: color }}>
      {children}
    </button>
  );
};
