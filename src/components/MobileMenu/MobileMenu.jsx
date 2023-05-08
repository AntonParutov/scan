import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./MobileMenu.module.css";
import { observer } from "mobx-react-lite";
import store from "../../store/store";
import { Link, useNavigate } from "react-router-dom";

const MobileMenu = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    store.checkToken();
  }, []);

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  return (
    <div className={styles.general} onClick={() => setIsMenuVisible(true)}>
      {isMenuVisible ? (
        <div className={styles.mobileMenu}>
          <div className={styles.logoNClose}>
            <div className={styles.logo}></div>
            <button
              className={styles.close}
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuVisible(false);
              }}></button>
          </div>
          <nav>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <Link to="/">Главная</Link>
              </li>
              <li className={styles.navItem}>Тарифы</li>
              <li className={styles.navItem}>FAQ</li>
            </ul>
          </nav>
          <div className={styles.signSection}>
            {store.token === "" ? (
              <>
                <button className={styles.signUp}>Зарегистрироваться</button>
                <span className={styles.line}></span>
                <Link to="/auth" className={styles.signIn}>
                  Войти
                </Link>
              </>
            ) : (
              <div className={styles.infoContainer}>
                <div className={styles.info}>
                  <span className={styles.name}>Алексей А.</span>
                  <button
                    className={styles.logout}
                    onClick={() => {
                      store.setToken("");
                      localStorage.clear();
                      navigate("/");
                    }}>
                    Выйти
                  </button>
                </div>
                <div className={styles.avatar}></div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
});

export default MobileMenu;