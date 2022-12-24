import React from "react";
import { Link } from "react-router-dom";

import styles from "./About.module.css";
import gitHub from "../../assets/github.png";
import linkedIn from "../../assets/linkedln.png";
import gmail from "../../assets/gmail.png";

const About = () => {
  return (
    <div className={styles.about}>
      <div className={styles.card}>
        <h2 className={styles.h2}>About Me</h2>
        <p className={styles.text}>
          My name is Alexis Uriarte. <br /> I'm Full-Stack Web Developer
        </p>
        <h5 className={styles.text}>Contact me:</h5>
        <a
          className={styles.links}
          href="mailto:uriarte2001alexis@gmail.com"
          target="_blank"
        >
          <img
            className={styles.ico}
            src={gmail}
            alt="Img Not Found"
            width="30"
            height="30"
          />
          Email
        </a>
        <br />
        <a
          className={styles.links}
          href="https://github.com/aouriarte"
          target="_blank"
        >
          <img
            className={styles.ico}
            src={gitHub}
            alt="Img Not Found"
            width="30"
            height="30"
          />
          GitHub
        </a>
        <br />
        <a
          className={styles.links}
          href="https://www.linkedin.com/in/aouriarte"
          target="_blank"
        >
          <img
            className={styles.ico}
            src={linkedIn}
            alt="Img Not Found"
            width="30"
            height="30"
          />
          LinkedIn
        </a>
        <br />
      </div>
      <Link to="/home">
        <button className={styles.button}>Go Home</button>
      </Link>
    </div>
  );
};

export default About;
