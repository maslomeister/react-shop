import React from "react";

import styles from "./button-text.module.css";

interface IProps {
  className?: string;
  onClick?: () => void;
  color?: string;
  children?: string;
}
export const ButtonText: React.FC<IProps> = ({ className, color, onClick, children }) => {
  return (
    <button data-testid="text-button" className={`${styles.button} ${className}`} onClick={onClick} style={{ color: color }}>
      {children}
    </button>
  );
};
