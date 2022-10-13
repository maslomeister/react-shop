import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { clearCartLogout, toggleModal } from "../../store/actions/shop";
import { userLogout } from "../../store/actions/auth";

import styles from "./navbar.module.css";

export const Navbar = () => {
  const { authenticated } = useSelector((state) => state.auth);
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
              <NavLink className={styles.link} onClick={onLogoutClick}>
                Выйти
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink className={styles.link} onClick={onLoginClick}>
                Войти
              </NavLink>
            </li>
          )}
        </div>

        {/* <Logo /> */}
        {/* <img src={logo} className="" alt="logo" /> */}
      </ul>
    </header>
  );
};
