import React from "react";
import styles from "./Landing.module.css";
import CheckGuy from "../../components/CheckGuy/CheckGuy";
import SearchService from "../../components/SearchService/SearchService";
import Tarifs from "../../components/Tarifs/Tarifs";
import WhyWe from "../../components/WhyWe/WhyWe";

const Landing = () => {
  return (
    <div className={styles.general}>
      <SearchService />
      <WhyWe />
      <CheckGuy />
      <Tarifs />
    </div>
  );
};

export default Landing;