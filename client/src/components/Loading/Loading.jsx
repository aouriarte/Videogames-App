import React from "react";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div>
      <h2 className={styles.h2}>Loading...</h2>
      <div className={styles.container}>
        <div className={styles.progress}></div>
      </div>
    </div>
  );
};

export default Loading;
