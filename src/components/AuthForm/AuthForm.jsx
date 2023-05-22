import React from "react";
import styles from "./AuthForm.module.css";
import { useForm } from "react-hook-form";
import store from "../../store/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const AuthForm = observer(() => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const onFormSubmit = (data) => {
    store.setLogin(data.login);
    store.setPassword(data.password);
    store.getToken();
    reset();
  };

  return (
    <form className={styles.general} onSubmit={handleSubmit(onFormSubmit)}>
      <div className={styles.lock}></div>
      <div className={styles.authChoose}>
        <button
          className={`${styles.button} ${styles.signIn} ${styles.activeButton}`}
          disabled
        >
          Войти
        </button>
        <button className={`${styles.button} ${styles.signUp}`} disabled>
          Зарегистрироваться
        </button>
      </div>
      {store.isAuthError ? (
        <div className={styles.authError}>
          <span>Неверный логин или пароль!</span>
          <button
            onClick={() => {
              store.setIsAuthLoading(false);
              store.setIsAuthError(false);
            }}
          >
            Попробовать снова
          </button>
        </div>
      ) : (
        <>
          <label className={styles.label}>
            Логин или номер телефона:
            <input
              className={styles.textInput}
              type="text"
              {...register("login", {
                required: true,
                minLength: 5,
              })}
            />
          </label>
          <span className={styles.errorMessage}>
            {errors?.login && <p>Введите корректные данные</p>}
          </span>
          <label className={styles.label}>
            Пароль:
            <input
              className={styles.textInput}
              type="password"
              {...register("password", {
                required: true,
                minLength: 5,
              })}
            />
          </label>
          <span className={styles.errorMessage}>
            {errors?.password && <p>Неверный пароль</p>}
          </span>
          {store.isAuthLoading ? (
            <input
              className={styles.submitInput}
              value="Проверка..."
              type="submit"
              disabled={true}
            />
          ) : (
            <input
              className={styles.submitInput}
              value="Войти"
              type="submit"
              disabled={!isValid}
            />
          )}
        </>
      )}
      <span className={styles.passwordRecovery}>Восстановить пароль</span>
      <span className={styles.socialLabel}>Войти через:</span>
      <div className={styles.social}>
        <Link
          className={styles.google}
          to="https://google.com"
          target="_blank"
        ></Link>
        <Link
          className={styles.facebook}
          to="https://facebook.com"
          target="_blank"
        ></Link>
        <Link
          className={styles.yandex}
          to="https://yandex.ru"
          target="_blank"
        ></Link>
      </div>
    </form>
  );
});

export default AuthForm;
