import React from "react";
import styles from "./SearchService.module.css";
import store from "../../store/store";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

const SearchService = observer(() => {
  const navigate = useNavigate();
  return (
    <div className={styles.general}>
      <div className={styles.title}>
        <h1>
          сервис по поиску публикаций
          <br />о компании
          <br />
          по его ИНН
        </h1>
        <p>
          Комплексный анализ публикаций, получение данных в формате PDF на
          электронную почту.
        </p>
        <button
          onClick={() =>
            store.token === "" ? navigate("./auth") : navigate("./search")
          }>
          Запросить данные
        </button>
      </div>
      <div className={styles.image}></div>
    </div>
  );
});

export default SearchService;