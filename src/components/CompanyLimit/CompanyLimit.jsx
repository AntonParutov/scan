import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import styles from "./CompanyLimit.module.css";
import store from "../../store/store";
import InfoLoader from "../InfoLoader/InfoLoader";

const CompanyLimit = observer(() => {
  useEffect(() => {
    store.getCompaniesInfo();
  }, []);

  return (
    <div className={styles.general}>
      {store.isCompanyInfoLoading === true ? (
        <div className={styles.loaderContainer}>
          <InfoLoader />
        </div>
      ) : (
        <div className={styles.lists}>
          <ul className={styles.usedList}>
            <li className={styles.usedItem}>Использовано компаний</li>
            <li className={styles.usedItem}>{store.companiesInfo.used}</li>
          </ul>
          <ul className={styles.limitList}>
            <li className={styles.limitItem}>Лимит по компаниям</li>
            <li className={styles.limitItem}>{store.companiesInfo.limit}</li>
          </ul>
        </div>
      )}
    </div>
  );
});

export default CompanyLimit;