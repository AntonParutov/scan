import React from "react";
import CompanyLimit from "../CompanyLimit/CompanyLimit";
import Profile from "../Profile/Profile";
import styles from "./Signed.module.css";

const Signed = () => {
  return (
    <div className={styles.general}>
      <CompanyLimit />
      <Profile />
    </div>
  );
};

export default Signed;