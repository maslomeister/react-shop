import React, { useMemo } from "react";

import { Button } from "../../../../components/button/button";

import styles from "./edit-or-buy-button.module.css";

export const EditOrBuyButton = ({
  isUser,
  editMode,
  setEditMode,
  onSave,
  onSaveLoading,
  onSaveError,
  finalError,
  resetEditItemState,
  children,
}) => {
  const setEditModeHandler = (mode) => {
    if (mode) {
      setEditMode(mode);
    } else {
      setEditMode(mode);
    }
  };

  const error = useMemo(() => {
    if (onSaveError) {
      return onSaveError;
    } else if (finalError) {
      return finalError;
    }
    return "";
  }, [onSaveError, finalError]);

  if (!isUser) {
    if (editMode) {
      return (
        <div className={styles["controls-container"]}>
          <div className={styles.controls}>
            <Button variant="red" onClick={resetEditItemState}>
              Отмена
            </Button>
            <Button loading={onSaveLoading} error={error} onClick={onSave}>
              Сохранить
            </Button>
          </div>
          <label className={styles["edit-error"]}>{finalError}</label>
        </div>
      );
    } else {
      return (
        <div className={styles.edit}>
          <Button onClick={() => setEditModeHandler(true)}>Редактировать</Button>
        </div>
      );
    }
  }

  return children;
};
