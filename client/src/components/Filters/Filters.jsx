import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllGenres,
  filterGenres,
  orderName,
  orderRating,
  filterCreated,
} from "../../redux/actions";

import styles from "./Filters.module.css";

const Filters = ({ setPage, setOrder }) => {
  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.allGenres);

  // FILTRADOS -------------------------------------------------
  const handleFilterGenres = (e) => {
    e.preventDefault();
    dispatch(filterGenres(e.target.value));
    setPage(1);
  };

  const handleFilterCreated = (e) => {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    setPage(1);
  };
  // ORDENAMIENTOS ---------------------------------------------
  const handleOrderName = (e) => {
    e.preventDefault();
    dispatch(orderName(e.target.value));
    setPage(1);
    setOrder(e.target.value);
  };

  const handleOrderRating = (e) => {
    e.preventDefault();
    dispatch(orderRating(e.target.value));
    setPage(1);
    setOrder(e.target.value);
  };

  //------------------------------------------------------------
  useEffect(() => {
    dispatch(getAllGenres());
  }, [dispatch]);

  //------------------------------------------------------------
  return (
    <div>
      <select className={styles.select} onChange={(e) => handleFilterGenres(e)}>
        <option value="all">Filter By Genre 🕹️</option>
        {allGenres?.map((g) => {
          return (
            <option key={g.id} value={g.name}>
              {g.name}
            </option>
          );
        })}
      </select>
      <select
        className={styles.select}
        onChange={(e) => handleFilterCreated(e)}
      >
        <option value="all">All 🎲</option>
        <option value="api">Api</option>
        <option value="created">Created</option>
      </select>
      <select className={styles.select} onChange={(e) => handleOrderName(e)}>
        <option value="all">Alphabetically 🔠</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
      <select className={styles.select} onChange={(e) => handleOrderRating(e)}>
        <option value="all">All Rating ⭐</option>
        <option value="asc">+ Rating</option>
        <option value="desc">- Rating</option>
      </select>
    </div>
  );
};

export default Filters;
