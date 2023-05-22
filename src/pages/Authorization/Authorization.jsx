import React from "react";
import Description from "../../components/Description/Description"
import styles from "./Authorization.module.css";
import KeyImage from "../../components/KeyImage/KeyImage";
import AuthForm from "../../components/AuthForm/AuthForm";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import store from "../../store/store";
import { observer } from "mobx-react-lite";

const Authorization = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    store.checkToken();
    if (store.token !== "") {
      navigate("/");
    }
    
  }, [store.token]);

  return (
    <div className={styles.general}>
      <div className={styles.discriptionNAuth}>
        <Description />
        <AuthForm />
      </div>
      <KeyImage />
    </div>
  );
});

export default Authorization;