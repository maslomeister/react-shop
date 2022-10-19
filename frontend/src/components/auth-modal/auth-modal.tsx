import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store";

import { Spinner } from "../spinner/spinner";
import { Login } from "./components/login/login";
import { Register } from "./components/register/register";
import { toggleModal } from "../../store/actions/shop";
import closeIcon from "../../icons/close.svg";

import styles from "./auth-modal.module.css";

export const AuthModal: React.FC = () => {
  const { authenticated, loginLoading, registerLoading, authToken, userRole } = useAppSelector((state) => state.auth);
  const [loginWindow, setLoginWindow] = useState(true);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const modalRoot = document.getElementById("portal-root") as HTMLElement;

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
      <div data-testid="auth-modal" className={styles["modal"]} onClick={(e) => e.stopPropagation()}>
        {loginLoading || registerLoading ? (
          <div className={styles["spinner-container"]}>
            <Spinner dataTestId="auth-modal-spinner" />
          </div>
        ) : (
          <>
            <img className={styles.close} src={closeIcon} alt="close" onClick={closeHandler} />
            {loginWindow ? <Login /> : <Register />}
            <div data-testid="login-register-switch" className={styles["login-register"]} onClick={() => setLoginWindow(!loginWindow)}>
              {loginWindow ? <p>Нет аккаунта? Регистрация</p> : <p>Есть аккаунт? Вход</p>}
            </div>
          </>
        )}
      </div>
    </div>,
    modalRoot
  );
};
