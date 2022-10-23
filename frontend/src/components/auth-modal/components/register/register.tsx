import React, { useEffect, useMemo, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../../store";

import { Button } from "../../../button/button";
import { registerUserApi } from "../../../../api/api";
import { registerUserRequest, registerUserSuccess, registerUserError, authClearError } from "../../../../store/actions/auth";

import { Input } from "../../../input/input";

import styles from "./register.module.css";

const emptyFields = {
  register_login: "",
  register_password: "",
  register_repeatPassword: "",
};

export const Register: React.FC = () => {
  const { registerError } = useAppSelector((state) => state.auth);
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
    validateRepeatPassword();

    if (validateLogin() && validatePassword() && validateRepeatPassword() && comparePasswords()) {
      registerUserApi(
        inputValues.register_login,
        inputValues.register_password,
        dispatch,
        registerUserRequest,
        registerUserSuccess,
        (error) => {
          dispatch(registerUserError(error));
          setTimeout(() => dispatch(authClearError()), 1500);
        }
      );
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
    const login = inputValues.register_login.trim();

    if (login.length === 0) {
      setErrorValues((prevValue) => {
        return { ...prevValue, register_login: "Поле пустое. Заполните пожалуйста" };
      });
      return false;
    } else {
      setErrorValues((prevValue) => {
        return { ...prevValue, register_login: "" };
      });
      return true;
    }
  };

  const validatePassword = () => {
    const password = inputValues.register_password.trim();

    if (password.length === 0) {
      setErrorValues((prevValue) => {
        return { ...prevValue, register_password: "Поле пустое. Заполните пожалуйста" };
      });
      return false;
    } else {
      setErrorValues((prevValue) => {
        return { ...prevValue, register_password: "" };
      });
      return true;
    }
  };

  const validateRepeatPassword = () => {
    const repeatPassword = inputValues.register_repeatPassword.trim();

    if (repeatPassword.length === 0) {
      setErrorValues((prevValue) => {
        return { ...prevValue, register_repeatPassword: "Поле пустое. Заполните пожалуйста" };
      });
      return false;
    } else {
      setErrorValues((prevValue) => {
        return { ...prevValue, register_repeatPassword: "" };
      });
      return true;
    }
  };

  const comparePasswords = () => {
    if (inputValues.register_password === inputValues.register_repeatPassword) {
      return true;
    }

    return false;
  };

  const formErrors = useMemo(() => {
    if (JSON.stringify(errorValues) !== JSON.stringify(emptyFields)) {
      return "В каком-то из полей ошибка";
    } else if (!comparePasswords()) {
      return "Пароль и повторите пароль не совпадают";
    } else if (registerError) {
      return registerError;
    } else {
      return "";
    }
  }, [errorValues, registerError, inputValues]);

  return (
    <>
      <form
        data-testid="register-form"
        className={styles.form}
        onSubmit={handleFormSubmit}
        onReset={handleFormReset}
        noValidate
        autoComplete="off"
      >
        <Input
          label="Логин*"
          labelColor="#fff"
          type="text"
          name="register_login"
          placeholder="Логин"
          value={inputValues.register_login}
          onChange={handleInputChange}
          error={errorValues.register_login}
          onBlur={validateLogin}
          autoComplete="off"
        />
        <Input
          label="Пароль*"
          labelColor="#fff"
          type="password"
          name="register_password"
          placeholder="Пароль"
          value={inputValues.register_password}
          onChange={handleInputChange}
          error={errorValues.register_password}
          onBlur={validatePassword}
          autoComplete="off"
        />
        <Input
          label="Повторите пароль*"
          labelColor="#fff"
          type="password"
          name="register_repeatPassword"
          placeholder="Повторите пароль"
          value={inputValues.register_repeatPassword}
          onChange={handleInputChange}
          error={errorValues.register_repeatPassword}
          onBlur={validateRepeatPassword}
          autoComplete="off"
        />
        <div className={styles.controls}>
          <Button type="reset" variant="red" width={160}>
            Отмена
          </Button>
          <Button type="submit" width={160}>
            Регистрация
          </Button>
        </div>
        <label className={styles.error}>{formErrors}</label>
      </form>
    </>
  );
};
