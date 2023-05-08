import { observer } from "mobx-react-lite";
import React from "react";
import store from "../../store/store";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router";

const Profile = observer(() => {
  const navigate = useNavigate();
  return (
    <div className={styles.general}>
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
  );
});

export default Profile;