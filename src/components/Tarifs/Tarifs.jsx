import React from "react";
import styles from "./Tarifs.module.css";

const Tarifs = () => {
  return (
    <div className={styles.general}>
      <h2>Наши тарифы</h2>
      <div className={styles.tariffs}>
        <div className={styles.beginner}>
          <div className={styles.discription}>
            <div className={styles.discriptionText}>
              <h3>Beginner</h3>
              <p>Для небольшого исследования</p>
            </div>
            <div className={styles.lamp}></div>
          </div>
          <div
            className={`${styles.detailedDiscription} ${styles.currentTariff}`}
          >
            <span className={styles.tariffNow}>Текущий тариф</span>
            <div className={styles.price}>
              <span className={styles.priceNow}>799 ₽</span>
              <span className={styles.pricePrevios}>1 200 ₽</span>
            </div>
            <p>или 150 ₽/мес. при рассрочке на 24 мес.</p>
            <h4>В тариф входит:</h4>
            <ul className={styles.consList}>
              <li className={styles.consItem}>Безлимитная история запросов</li>
              <li className={styles.consItem}>Безопасная сделка</li>
              <li className={styles.consItem}>Поддержка 24/7</li>
            </ul>
          </div>
          <button className={styles.privateButton}>
            Перейти в личный кабинет
          </button>
        </div>
        <div className={styles.pro}>
          <div className={styles.discription}>
            <div className={styles.discriptionText}>
              <h3>Pro</h3>
              <p>Для HR и фрилансеров</p>
            </div>
            <div className={styles.target}></div>
          </div>
          <div className={styles.detailedDiscription}>
            <div className={styles.price}>
              <span className={styles.priceNow}>1 299 ₽</span>
              <span className={styles.pricePrevios}>2 600 ₽</span>
            </div>
            <p>или 279 ₽/мес. при рассрочке на 24 мес.</p>
            <h4>В тариф входит:</h4>
            <ul className={styles.consList}>
              <li className={styles.consItem}>Все пункты тарифа Beginner</li>
              <li className={styles.consItem}>Экспорт истории</li>
              <li className={styles.consItem}>Рекомендации по приоритетам</li>
            </ul>
          </div>
          <button className={styles.detailButton}>Подробнее</button>
        </div>
        <div className={styles.business}>
          <div className={styles.discription}>
            <div className={styles.discriptionText}>
              <h3>Business</h3>
              <p>Для корпоративных клиентов</p>
            </div>
            <div className={styles.notebook}></div>
          </div>
          <div className={styles.detailedDiscription}>
            <div className={`${styles.price} ${styles.priceBusiness}`}>
              <span className={styles.priceNow}>2 379 ₽</span>
              <span className={styles.pricePrevios}>3 700 ₽</span>
            </div>
            <h4>В тариф входит:</h4>
            <ul className={styles.consList}>
              <li className={styles.consItem}>Все пункты тарифа Pro</li>
              <li className={styles.consItem}>
                Безлимитное количество запросов
              </li>
              <li className={styles.consItem}>Приоритетная поддержка</li>
            </ul>
          </div>
          <button className={styles.detailButton}>Подробнее</button>
        </div>
      </div>
    </div>
  );
};

export default Tarifs;
