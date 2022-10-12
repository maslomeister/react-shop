import React, { useState, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Spinner } from "../spinner/spinner.jxs";
import { authUserRequest, authUserSuccess, authUserError } from "../../store/actions/auth";
import closeIcon from "../../icons/close.svg";
import { loginUser } from "../../api/api";
import { Button } from "../button/button";
import { Input } from "../input/input";
import { toggleModal } from "../../store/actions/shop";

import styles from "./login-modal.module.css";

const emptyFields = {
  login: "",
  password: "",
};

export function LoginModal() {
  const { error, authenticated, authLoading, authToken, userRole } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const [inputValues, setInputValues] = useState({ ...emptyFields });
  const [errorValues, setErrorValues] = useState({ ...emptyFields });

  const modalRoot = document.getElementById("portal-root");

  const closeHandler = useCallback(() => {
    setInputValues({ ...emptyFields });
    setErrorValues({ ...emptyFields });
    dispatch();
    dispatch(toggleModal());
  }, []);

  useEffect(() => {
    if (authenticated) {
      if (authToken) {
        localStorage.setItem("authToken", JSON.stringify({ authToken, userRole }));
        closeHandler();
        if (location.pathname !== "/") {
          navigate("/");
        }
      }
    }
  }, [authenticated, authToken, userRole, closeHandler, location.pathname, navigate]);

  useEffect(() => {
    const closeOnESC = (e) => {
      if (e.key === "Escape") {
        closeHandler();
      }
    };

    document.body.addEventListener("keydown", closeOnESC);

    return () => {
      document.body.removeEventListener("keydown", closeOnESC);
    };
  }, [closeHandler]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    validateLogin();
    validatePassword();

    if (validateLogin() && validatePassword()) {
      const login = event.currentTarget.elements.login.value.trim();
      const password = event.currentTarget.elements.password.value.trim();

      loginUser(login, password, dispatch, authUserRequest, authUserSuccess, authUserError);
    }
  };

  const handleFormReset = () => {
    setInputValues({ ...emptyFields });
    setErrorValues({ ...emptyFields });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const validateLogin = () => {
    const login = inputValues.login.trim();

    if (login.length === 0) {
      setErrorValues((prevValue) => {
        return { ...prevValue, login: "Поле пустое. Заполните пожалуйста" };
      });
      return false;
    } else {
      setErrorValues((prevValue) => {
        return { ...prevValue, login: "" };
      });
      return true;
    }
  };

  const validatePassword = () => {
    const password = inputValues.password.trim();

    if (password.length === 0) {
      setErrorValues((prevValue) => {
        return { ...prevValue, password: "Поле пустое. Заполните пожалуйста" };
      });
      return false;
    } else {
      setErrorValues((prevValue) => {
        return { ...prevValue, password: "" };
      });
      return true;
    }
  };

  const formErrors = useMemo(() => {
    if (JSON.stringify(errorValues) !== JSON.stringify(emptyFields)) {
      return "В каком-то из полей ошибка";
    } else if (error) {
      return error;
    } else {
      return "";
    }
  }, [errorValues, error]);

  return createPortal(
    <div className={styles["modal-overlay"]} onClick={closeHandler}>
      <div className={styles["modal"]} onClick={(e) => e.stopPropagation()}>
        {authLoading ? (
          <div className={styles["spinner-container"]}>
            <Spinner />
          </div>
        ) : (
          <>
            <img className={styles.close} src={closeIcon} alt="close" onClick={closeHandler} />
            <form className={styles.form} onSubmit={handleFormSubmit} onReset={handleFormReset} noValidate>
              <Input
                label="Логин*"
                type="text"
                name="login"
                placeholder="Логин"
                value={inputValues.login}
                onChange={handleInputChange}
                error={errorValues.login}
                onBlur={validateLogin}
              />
              <Input
                label="Пароль*"
                type="password"
                name="password"
                placeholder="Пароль"
                value={inputValues.password}
                onChange={handleInputChange}
                error={errorValues.password}
                onBlur={validatePassword}
              />
              <div className={styles.controls}>
                <Button type="reset" variant="red" width={160} blocked={true}>
                  Отмена
                </Button>
                <Button type="submit" width={160}>
                  Войти
                </Button>
              </div>
              <label className={styles.error}>{formErrors}</label>
            </form>
          </>
        )}
      </div>
    </div>,
    modalRoot
  );
}
