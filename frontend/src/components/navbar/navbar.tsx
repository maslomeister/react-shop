import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store";

import { ButtonText } from "../button/buttonText";
import { clearCartLogout, toggleModal } from "../../store/actions/shop";
import { userLogout } from "../../store/actions/auth";

import styles from "./navbar.module.css";

export const Navbar: React.FC = () => {
  const { authenticated, isUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const onLoginClick = () => {
    dispatch(toggleModal());
  };

  const onLogoutClick = () => {
    localStorage.removeItem("authToken");
    dispatch(userLogout());
    dispatch(clearCartLogout());
  };

  return (
    <header data-testid="navbar" className={styles.navbar}>
      <ul className={styles.menu}>
        <div className={styles.submenu}>
          <li>
            <NavLink to="/" className={styles.logo}>
              Shoply
              {authenticated && !isUser && <p>&nbsp;&nbsp;Admin panel</p>}
            </NavLink>
          </li>
        </div>

        <div className={styles.submenu}>
          <li>
            <NavLink to="/about" className={styles.link}>
              О магазине
            </NavLink>
          </li>
          {authenticated ? (
            <li>
              <ButtonText className={styles.link} color="ffffffcc" onClick={onLogoutClick}>
                Выйти
              </ButtonText>
            </li>
          ) : (
            <li>
              <ButtonText className={styles.link} color="ffffffcc" onClick={onLoginClick}>
                Войти
              </ButtonText>
            </li>
          )}
        </div>
      </ul>
    </header>
  );
};
