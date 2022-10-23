import React, { useEffect, useMemo, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../../store";

import { Button } from "../../../button/button";
import { loginUserApi } from "../../../../api/api";
import { loginUserRequest, loginUserError, loginUserSuccess, authClearError } from "../../../../store/actions/auth";

import { Input } from "../../../input/input";

import styles from "./login.module.css";

const emptyFields = {
  login: "",
  password: "",
};

export const Login: React.FC = () => {
  const { loginError } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [inputValues, setInputValues] = useState({ ...emptyFields });
  const [errorValues, setErrorValues] = useState({ ...emptyFields });

  useEffect(() => {
    return () => {
      setInputValues({ ...emptyFields });
      setErrorValues({ ...emptyFields });
    };
  }, []);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    validateLogin();
    validatePassword();

    if (validateLogin() && validatePassword()) {
      loginUserApi(inputValues.login, inputValues.password, dispatch, loginUserRequest, loginUserSuccess, (error) => {
        dispatch(loginUserError(error));
        setTimeout(() => dispatch(authClearError()), 1500);
      });
    }
  };

  const handleFormReset = () => {
    setInputValues({ ...emptyFields });
    setErrorValues({ ...emptyFields });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    } else if (loginError) {
      return loginError;
    } else {
      return "";
    }
  }, [errorValues, loginError]);

  return (
    <>
      <form data-testid="login-form" className={styles.form} onSubmit={handleFormSubmit} onReset={handleFormReset} noValidate>
        <Input
          label="Логин*"
          labelColor="#fff"
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
          labelColor="#fff"
          type="password"
          name="password"
          placeholder="Пароль"
          value={inputValues.password}
          onChange={handleInputChange}
          error={errorValues.password}
          onBlur={validatePassword}
        />
        <div className={styles.controls}>
          <Button type="reset" variant="red" width={160}>
            Отмена
          </Button>
          <Button type="submit" width={160}>
            Войти
          </Button>
        </div>
        <label className={styles.error}>{formErrors}</label>
      </form>
    </>
  );
};
