import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "../../store";

import { ButtonText } from "../button/buttonText";
import { clearCartLogout, toggleModal } from "../../store/actions/shop";
import { userLogout } from "../../store/actions/auth";

import styles from "./navbar.module.css";

export const Navbar = () => {
  const { authenticated, isUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onLoginClick = () => {
    dispatch(toggleModal());
  };

  const onLogoutClick = () => {
    localStorage.removeItem("authToken");
    dispatch(userLogout());
    dispatch(clearCartLogout());
  };

  return (
    <header className={styles.navbar}>
      <ul className={styles.menu}>
        <div className={styles.submenu}>
          <li>
            <NavLink to="/" className={styles.logo}>
              Shoply
              {authenticated && !isUser && <> - Admin panel</>}
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
