import React from "react";
import styles from "./Discription.module.css";

const Discription = () => {
  return (
    <div className={styles.general}>
      <h1>Найдите необходимые данные в пару кликов.</h1>
      <p>
        Задайте параметры поиска.
        <br />
        Чем больше заполните, тем точнее поиск
      </p>
    </div>
  );
};

export default Discription;