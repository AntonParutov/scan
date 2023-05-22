import React from "react";
import styles from "./DateResult.module.css";

const DateResult = (props) => {
  return (
    <div className={styles.general}>
      <span>{props.date}</span>
      <span>{props.all}</span>
      <span>{props.risks}</span>
    </div>
  );
};

export default DateResult;