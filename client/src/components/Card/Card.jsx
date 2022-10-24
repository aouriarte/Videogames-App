import React from "react";
import styles from "./Card.module.css";

const Card = ({ image, name, genres }) => {
  return (
    <div>
        <img className={styles.img} src={image} alt="Img Not Found" />
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
