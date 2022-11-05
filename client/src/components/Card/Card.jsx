import React from "react";
import styles from "./Card.module.css";
import imgDefault from "../../assets/image.png";

const Card = ({ image, name, genres }) => {
  return (
    <div>
      <img
        className={styles.img}
        src={image ? image : imgDefault}
        alt="Img Not Found"
      />
      <h3 className={styles.h3}>{name}</h3>
      {genres?.map((g) => (
        <p className={styles.p} key={g}>
          {g}
        </p>
      ))}
    </div>
  );
};

export default Card;
