import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ videogamesPerPage, allVideogames, pagination }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className={styles.ul}>
        {pageNumbers?.map((number) => (
          <div className={styles.div} key={number}>
            <button
              className={styles.button}
              onClick={() => pagination(number)}
            >
              {number}
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
