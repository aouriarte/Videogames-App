import React from "react";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.progress}></div>
      </div>
    </div>
  );
};

export default Loading;
