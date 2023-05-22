import React from "react";
import styles from "./WhyWeCard.module.css";

const WhyWeCard = (props) => {
  return (
    <div className={styles.general}>
      <img src={props.image} alt="because" />
      <p>{props.text}</p>
    </div>
  );
};

export default WhyWeCard;