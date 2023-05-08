import React from "react";
import styles from "./NotSigned.module.css";
import { Link } from "react-router-dom";

const NotSigned = () => {
  return (
    <div className={styles.general}>
      <button className={styles.signUp}>Зарегистрироваться</button>
      <span className={styles.line}></span>
      <Link to="/auth" className={styles.signIn}>
        Войти
      </Link>
    </div>
  );
};

export default NotSigned;