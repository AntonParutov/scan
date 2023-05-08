import React, { useEffect } from "react";
import HeaderNav from "../HeaderNav/HeaderNav";
import styles from "./HeaderCheckSignIn.module.css";
import NotSigned from "../NotSigned/NotSigned";
import Signed from "../Signed/Signed";
import { observer } from "mobx-react-lite";
import store from "../../store/store";

const HeaderCheckSignIn = observer(() => {
  useEffect(() => {
    store.checkToken();
  }, []);

  return (
    <div className={styles.general}>
      <HeaderNav />
      {store.token === "" ? <NotSigned /> : <Signed />}
    </div>
  );
});

export default HeaderCheckSignIn;
