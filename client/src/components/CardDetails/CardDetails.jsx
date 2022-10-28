import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameDetail, cleanDetails } from "../../redux/actions";
import { Link, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";

import styles from "./CardDetails.module.css";
import imgDefault from "../../img/image.png";

const CardDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const videogame = useSelector((state) => state?.videogameDetails);

  useEffect(() => {
    dispatch(getVideogameDetail(id));
    dispatch(cleanDetails());
  }, [dispatch]);

  //---------------------------------------------------------------------------------
  return (
    <div className={styles.details}>
      {videogame && videogame ? (
        <div>
          <div className={styles.container}>
            <div className={styles.card}>
              <div className={styles.header}>
                <img
                  src={videogame?.image ? videogame?.image : imgDefault}
                  width="400px"
                  height="250px"
                  alt="Img Not Found"
                />
                <h2 className={styles.font}>{videogame?.name}</h2>
                <label className={styles.label}>Genres:</label>
                {videogame?.genres?.map((g, i) => {
                  return (
                    <p className={styles.genre} key={i}>
                      {g.name}
                    </p>
                  );
                })}
                <br />
                <label className={styles.label2}>Rating:</label>
                <p className={styles.font}>{videogame?.rating}</p>
                <label className={styles.label2}>Released:</label>
                <p className={styles.font}>{videogame?.released}</p>
              </div>
              <div className={styles.description}>
                <label className={styles.label2}>Description: </label>
                <p className={styles.font}>{videogame?.description}</p>
                <br />
                <label className={styles.label}>Platforms: </label>
                {videogame?.platforms?.map((p, i) => {
                  return (
                    <p className={styles.platform} key={i}>
                      {p}
                    </p>
                  );
                })}
              </div>
            </div>
            <Link to="/home">
              <button className={styles.button}>Go Home</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.load}>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default CardDetails;
