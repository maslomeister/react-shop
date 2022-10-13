import React from "react";

import { Input } from "../../../../components/input/input";

export const InputOrTitle = ({ value, onChange, onBlur, readOnly, error, editMode }) => {
  if (editMode) {
    return (
      <Input
        type="text"
        placeholder="Название"
        label="Название"
        name="name"
        value={value}
        maxLength={30}
        onChange={onChange}
        onBlur={onBlur}
        readOnly={readOnly}
        error={error}
      />
    );
  }

  return <h3>{value}</h3>;
};
