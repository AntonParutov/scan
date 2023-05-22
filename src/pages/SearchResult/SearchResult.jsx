import React, { useEffect } from "react";
import Documents from "../../components/Documents/Documents";
import Searching from "../../components/Searching/Searching";
import Summary from "../../components/Summary/Summary";
import styles from "./SearchResult.module.css";
import store from "../../store/store";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";
import SummaryLoader from "../../components/SummaryLoader/SummaryLoader";

const SearchResult = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    store.checkToken();
    if (store.token === "") {
      navigate("/auth");
    }
  }, []);

  return (
    <div className={styles.general}>
      <Searching />
      {store.isSummaryLoading === true ? (
        <div className={styles.loaderContainer}>
          <SummaryLoader />
        </div>
      ) : store.isSummaryError === true ? (
        <div className={styles.noResults}>
          <p>Ваши статьи в другом замке!</p>
          <p>Попробуйте изменить условия запроса.</p>
          <button
            onClick={() => {
              store.setIsSummaryAllowed(false);
              navigate("/search");
            }}
          >
            Попробовать снова
          </button>
        </div>
      ) : (
        <>
          <Summary />
          <Documents />
        </>
      )}
    </div>
  );
});

export default SearchResult;
