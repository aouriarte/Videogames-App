import React from "react";
import { Link } from "react-router-dom";

import logo from '../../assets/Logo.png';
import styles from "./Landing.module.css";

const Lading = () => {
  return (
    <div className={styles.landing}>
      <div className={styles.div}>
        <img className={styles.img} src={logo} alt="Logo Not Found" width={100} height={100} />
        <h1 className={styles.h1}>Videogames-App</h1>
      </div>
      <h2 className={styles.h2}>¡Welcome!</h2>
      <Link to="/home">
        <button className={styles.button}>Start</button>
      </Link>
    </div>
  );
};

export default Lading;
