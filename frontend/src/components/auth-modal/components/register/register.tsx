import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../../../store";

import { Button } from "../../../button/button";
import { registerUserApi } from "../../../../api/api";
import { registerUserRequest, registerUserSuccess, registerUserError, authClearError } from "../../../../store/actions/auth";

import { Input } from "../../../input/input";

import styles from "./register.module.css";

const emptyFields = {
  login: "",
  password: "",
  repeatPassword: "",
};

export const Register = () => {
  const { registerError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
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

    if (validateLogin() && validatePassword() && comparePasswords()) {
      registerUserApi(inputValues.login, inputValues.password, dispatch, registerUserRequest, registerUserSuccess, (error) => {
        dispatch(registerUserError(error));
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

  const validateRepeatPassword = () => {
    const repeatPassword = inputValues.repeatPassword.trim();

    if (repeatPassword.length === 0) {
      setErrorValues((prevValue) => {
        return { ...prevValue, repeatPassword: "Поле пустое. Заполните пожалуйста" };
      });
      return false;
    } else {
      setErrorValues((prevValue) => {
        return { ...prevValue, repeatPassword: "" };
      });
      return true;
    }
  };

  const comparePasswords = () => {
    if (inputValues.password === inputValues.repeatPassword) {
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
      <form className={styles.form} onSubmit={handleFormSubmit} onReset={handleFormReset} noValidate autoComplete="off">
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
        <Input
          label="Повторите пароль*"
          labelColor="#fff"
          type="password"
          name="repeatPassword"
          placeholder="Повторите пароль"
          value={inputValues.repeatPassword}
          onChange={handleInputChange}
          error={errorValues.repeatPassword}
          onBlur={validateRepeatPassword}
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
