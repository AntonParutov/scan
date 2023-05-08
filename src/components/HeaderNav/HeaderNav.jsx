import React from "react";
import styles from "./HeaderNav.module.css";
import { Link } from "react-router-dom";

const HeaderNav = () => {
  return (
    <nav className={styles.general}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/">Главная</Link>
        </li>
        <li className={styles.navItem}>Тарифы</li>
        <li className={styles.navItem}>FAQ</li>
      </ul>
    </nav>
  );
};

export default HeaderNav;
