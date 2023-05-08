import React from "react";
import styles from "./Header.module.css";
import HeaderLogo from "../HeaderLogo/HeaderLogo";
import HeaderCheckSignIn from "../HeaderCheckSignIn/HeaderCheckSignIn";
import MobileMenu from "../MobileMenu/MobileMenu";

const Header = () => {
  return (
    <header className={styles.general}>
      <HeaderLogo />
      <HeaderCheckSignIn />
      <MobileMenu />
    </header>
  );
};
export default Header;
