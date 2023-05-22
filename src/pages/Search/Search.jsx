import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import Discription from "../../components/Discription/Discription";
import DocksPic from "../../components/DocksPic/DocksPic";
import RocketPic from "../../components/RocketPic/RocketPic";
import SearchingForm from "../../components/SearchingForm/SearchingForm";
import styles from "./Search.module.css";
import store from "../../store/store";
import { useNavigate } from "react-router";

const Search = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    store.setIsSummaryAllowed(false);
  }, []);

  useEffect(() => {
    store.checkToken();
    if (store.token === "") {
      navigate("/auth");
    }
  }, []);

  return (
    <div className={styles.general}>
      <div className={styles.top}>
        <Discription />
        <DocksPic />
      </div>
      <div className={styles.buttom}>
        <SearchingForm />
        <RocketPic />
      </div>
    </div>
  );
});

export default Search;
