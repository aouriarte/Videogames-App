import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  postVideogame,
  getAllGenres,
  getAllVideogames,
  cleanVideogames,
} from "../../redux/actions";
import validate from "./Validator/Validate";

import styles from "./Create.module.css";
import swal from "sweetalert";

const Create = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const allGenres = useSelector((state) => state.allGenres);
  const platforms = useSelector((state) => state.platforms);
  const allVideogames = useSelector((state) => state.allVideogames);
  const [errors, setErrors] = useState({});

  // ESTADOS LOCALES ------------------------------------------------
  const [input, setInput] = useState({
    name: "",
    rating: "",
    released: "",
    description: "",
    image: "",
    platforms: [],
    genres: [],
  });

  // HANDLES -------------------------------------------------------
  // Inputs:
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  // Select Platforms:
  const handleSelectPlatforms = (e) => {
    setInput({
      ...input,
      platforms: [...new Set([...input.platforms, e.target.value])],
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleDeletePlatforms = (e) => {
    setInput({
      ...input,
      platforms: input.platforms.filter((el) => el !== e),
    });
  };

  // Select Genres:
  const handleSelectGenres = (e) => {
    setInput({
      ...input,
      genres: [...new Set([...input.genres, e.target.value])],
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleDeleteGenres = (e) => {
    setInput({
      ...input,
      genres: input.genres.filter((g) => g !== e),
    });
  };

  // SUBMIT FORMULARIO ---------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(errors).length !== 0) {
      swal("Oops", "Complete the form!", "error");
    } else if (!input.name.length) {
      swal("The name is required");
    } else if (
      allVideogames.find(
        (v) => v.name.toLowerCase() === input.name.toLowerCase()
      )
    ) {
      swal("Incorrect", `The ${input.name} already exists`, "error");
    } else {
      dispatch(postVideogame(input));
      swal("Success", "¡Your videogame is created!", "success");
      setInput({
        name: "",
        rating: "",
        released: "",
        description: "",
        image: "",
        platforms: [],
        genres: [],
      });
      history.push("/home");
      dispatch(cleanVideogames());
      dispatch(getAllVideogames());
    }
  };

  useEffect(() => {
    dispatch(getAllGenres());
    dispatch(getAllVideogames());
  }, [dispatch]);

  //-----------------------------------------------------------------
  return (
    <div className={styles.create}>
      <div className={styles.container}>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
          <div className={styles.header}>
            <label className={styles.label}>Name: </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              autoComplete="off"
              value={input.name}
              onChange={(e) => handleChange(e)}
              className={styles.input}
            ></input>
            {errors.name && <p className={styles.p}>{errors.name}</p>}
            <label className={styles.label}>Rating: </label>
            <input
              type="number"
              name="rating"
              placeholder="1"
              value={input.rating}
              onChange={(e) => handleChange(e)}
              className={styles.input}
            ></input>
            {errors.rating && <p className={styles.p}>{errors.rating}</p>}
            <label className={styles.label}>Released: </label>
            <input
              type="date"
              value={input.released}
              name="released"
              onChange={(e) => handleChange(e)}
              className={styles.input}
            />
            {errors.released && <p className={styles.p}>{errors.released}</p>}
            <label className={styles.label}>Description: </label>
            <textarea
              type="text"
              name="description"
              maxLength="1000"
              placeholder="Description of your videogame"
              autoComplete="off"
              value={input.description}
              onChange={(e) => handleChange(e)}
              className={styles.textarea}
            ></textarea>
            {errors.description && (
              <p className={styles.p}>{errors.description}</p>
            )}
            <label className={styles.label}>Image: </label>
            <input
              type="url"
              name="image"
              placeholder="Enter the url"
              autoComplete="off"
              value={input.image}
              onChange={(e) => handleChange(e)}
              className={styles.input}
            ></input>
            {errors.image && <p className={styles.p}>{errors.image}</p>}
            <button className={styles.b}>¡Create Videogame!</button>
          </div>
          <div className={styles.derecha}>
            <select
              className={styles.select}
              onChange={(e) => {
                handleSelectPlatforms(e);
              }}
            >
              <option disabled selected>
                Select Platform
              </option>
              {platforms?.map((e) => {
                return (
                  <option key={e} value={e}>
                    {e}
                  </option>
                );
              })}
            </select>
            {errors.platforms && <p className={styles.p2}>{errors.platforms}</p>}
            {input.platforms.map((e) => {
              return (
                <div key={e}>
                  <p className={styles.text}>{e}</p>
                  <button
                    className={styles.platforms}
                    onClick={() => {
                      handleDeletePlatforms(e);
                    }}
                  >
                    x
                  </button>
                </div>
              );
            })}
            <select
              className={styles.select}
              onChange={(e) => {
                handleSelectGenres(e);
              }}
            >
              <option disabled selected>
                Select Genre
              </option>
              {allGenres?.map((e) => {
                return (
                  <option key={e.id} value={e.name}>
                    {e.name}
                  </option>
                );
              })}
            </select>
            {errors.genres && <p className={styles.p2}>{errors.genres}</p>}
            {input.genres.map((e) => {
              return (
                <div key={e}>
                  <p className={styles.text}>{e}</p>
                  <button
                    className={styles.genres}
                    onClick={() => {
                      handleDeleteGenres(e);
                    }}
                  >
                    x
                  </button>
                </div>
              );
            })}
          </div>
        </form>
      </div>
      <Link to="/home">
        <button className={styles.button}>Go back</button>
      </Link>
    </div>
  );
};

export default Create;
