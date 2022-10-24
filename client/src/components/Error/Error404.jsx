import React from "react";
import { Link } from "react-router-dom";
import styles from "./Error404.module.css";

const Error404 = () => {
  return (
    <div className={styles.error}>
      <div className={styles.div}>
        <h1 className={styles.h1}>Error 404</h1>
        <h3 className={styles.h3}>Page Not Found</h3>
      </div>
      <Link to={"/home"}>
        <button className={styles.button}>Redirect Home</button>
      </Link>
    </div>
  );
};

export default Error404;
