import React from "react";
import styles from "./Searching.module.css";

const Searching = () => {
  return (
    <div className={styles.general}>
      <div className={styles.discription}>
        <h1>Ищем. Скоро будут результаты</h1>
        <p>Поиск может занять некоторое время, просим сохранять терпение.</p>
      </div>
      <div className={styles.shieldGirl}></div>
    </div>
  );
};

export default Searching;