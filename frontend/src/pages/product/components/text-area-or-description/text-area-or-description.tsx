import React from "react";

import { TextArea } from "../../../../components/text-area/text-area";

import styles from "./text-area-or-description.module.css";

interface IProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error: string;
  editMode: boolean;
}

export const TextAreaOrDescription: React.FC<IProps> = ({ value, onChange, readOnly, error, editMode }) => {
  if (editMode) {
    return (
      <TextArea
        placeholder="Описание"
        name="description"
        label="Описание"
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        error={error}
      />
    );
  }

  return (
    <div className={styles.description}>
      <p>
        <span className={styles.span}>Описание:</span>
        {value}
      </p>
    </div>
  );
};
