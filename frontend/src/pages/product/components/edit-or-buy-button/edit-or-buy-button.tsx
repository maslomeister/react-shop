import React, { useMemo } from "react";

import { Button } from "../../../../components/button/button";

import styles from "./edit-or-buy-button.module.css";

interface IProps {
  isUser: boolean;
  editMode: boolean;
  setEditMode: (val: boolean) => void;
  onSave: () => void;
  onSaveLoading: boolean;
  onSaveError: string;
  validationsError: string;
  resetEditItemState: () => void;
  children: React.ReactNode;
}

export const EditOrBuyButton: React.FC<IProps> = ({
  isUser,
  editMode,
  setEditMode,
  onSave,
  onSaveLoading,
  onSaveError,
  validationsError: finalError,
  resetEditItemState,
  children,
}) => {
  const setEditModeHandler = (mode: boolean) => {
    setEditMode(mode);
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
              ОТМЕНА
            </Button>
            <Button inactive={finalError ? true : false} loading={onSaveLoading} error={onSaveError ? true : false} onClick={onSave}>
              СОХРАНИТЬ
            </Button>
          </div>
          <label className={styles["edit-error"]}>{error}</label>
        </div>
      );
    } else {
      return (
        <div className={styles.edit}>
          <Button onClick={() => setEditModeHandler(true)}>РЕДАКТИРОВАТЬ</Button>
        </div>
      );
    }
  }

  return <>{children}</>;
};
