import React from "react";
import styles from "./DocksPic.module.css";

const DocksPic = () => {
  return (
    <div className={styles.general}>
      <div className={styles.document}></div>
      <div className={styles.folders}></div>
    </div>
  );
};

export default DocksPic;