import React from "react";
import FooterInfo from "../FooterInfo/FooterInfo";
import FooterLogo from "../FooterLogo/FooterLogo";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.general}>
      <div className={styles.container}>
        <FooterLogo />
        <FooterInfo />
      </div>
    </div>
  );
};

export default Footer;
