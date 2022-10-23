import React from "react";

import { Input } from "../../../../components/input/input";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  editMode: boolean;
}

export const InputOrTitle: React.FC<IProps> = ({ value, onChange, onBlur, readOnly, error, editMode }) => {
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
