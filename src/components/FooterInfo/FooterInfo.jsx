import React from "react";
import styles from "./FooterInfo.module.css";

const FooterInfo = () => {
  return (
    <div className={styles.general}>
      <div className={styles.contacts}>
        <span>г. Москва, Цветной б-р, 40</span>
        <span>+7 495 771 21 11</span>
        <span>info@skan.ru</span>
      </div>
      <span className={styles.copyright}>Copyright. 2022</span>
    </div>
  );
};

export default FooterInfo;