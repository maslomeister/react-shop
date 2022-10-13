import React from "react";

import { TextArea } from "../../../../components/text-area/text-area";

import styles from "./text-area-or-description.module.css";

export const TextAreaOrDescription = ({ value, onChange, readOnly, error, editMode }) => {
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
