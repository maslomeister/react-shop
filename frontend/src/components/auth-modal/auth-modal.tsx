import React, { useState, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "../../store";

import { loginUserApi } from "../../api/api";
import { Spinner } from "../spinner/spinner";
import { Button } from "../button/button";
import { Input } from "../input/input";
import { Login } from "./components/login/login";
import { Register } from "./components/register/register";
import { toggleModal } from "../../store/actions/shop";
import closeIcon from "../../icons/close.svg";

import styles from "./auth-modal.module.css";

export function AuthModal() {
  const { authenticated, loginLoading, registerLoading, authToken, userRole } = useSelector((state) => state.auth);
  const [loginWindow, setLoginWindow] = useState(true);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const modalRoot = document.getElementById("portal-root");

  const closeHandler = () => {
    dispatch(toggleModal());
  };

  useEffect(() => {
    if (authenticated) {
      if (authToken) {
        localStorage.setItem("authToken", authToken);
        closeHandler();
        if (location.pathname !== "/") {
          navigate("/");
        }
      }
    }
  }, [authenticated, authToken, userRole, location.pathname]);

  useEffect(() => {
    const closeOnESC = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeHandler();
      }
    };

    document.body.addEventListener("keydown", closeOnESC);

    return () => {
      document.body.removeEventListener("keydown", closeOnESC);
    };
  }, []);

  return createPortal(
    <div className={styles["modal-overlay"]} onClick={closeHandler}>
      <div className={styles["modal"]} onClick={(e) => e.stopPropagation()}>
        {loginLoading || registerLoading ? (
          <div className={styles["spinner-container"]}>
            <Spinner />
          </div>
        ) : (
          <>
            <img className={styles.close} src={closeIcon} alt="close" onClick={closeHandler} />
            {loginWindow ? <Login /> : <Register />}
            <div className={styles["login-register"]} onClick={() => setLoginWindow(!loginWindow)}>
              {loginWindow ? <p>Нет аккаунта? Регистрация</p> : <p>Есть аккаунт? Вход</p>}
            </div>
          </>
        )}
      </div>
    </div>,
    modalRoot!
  );
}
