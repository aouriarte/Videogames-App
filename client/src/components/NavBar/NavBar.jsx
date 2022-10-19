import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogameName } from "../../redux/actions";
import { Link } from "react-router-dom";

import logo from "../../img/Logo.png";
import styles from "./NavBar.module.css";
import Filters from "../Filters/Filters";

const NavBar = ({ setPage, setOrder }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleName(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getVideogameName(name));
    setName("");
    setTimeout(() => {
      setPage(1);
    }, 2000);
  }

  return (
    <header className={styles.header}>
      <div className={styles.div}>
        <img
          className={styles.img}
          id="logo"
          src={logo}
          alt="Logo Not Found"
          width={100}
          height={100}
        />
        <h1 className={styles.h1}>Videogame-App</h1>
      </div>
      <Link to="/create">
        <button className={styles.button}>CREATE VIDEOGAME 🧩</button>
      </Link>
      <div className={styles.filters}>
        <Filters setPage={setPage} setOrder={setOrder} />
      </div>
      <div className={styles.searchBar}>
        <input
          className={styles.input}
          type="search"
          placeholder="Search videogame..."
          value={name}
          onChange={(e) => handleName(e)}
        />
        <button
          className={styles.b}
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          SEARCH 🔍
        </button>
      </div>
    </header>
  );
};

export default NavBar;
