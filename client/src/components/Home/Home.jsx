import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllVideogames } from "../../redux/actions";
import NavBar from "../NavBar/NavBar";
import Card from "../Card/Card";
import Loading from "../Loading/Loading";
import Pagination from "../Pagination/Pagination";

import styles from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state?.videogames);

  // PAGINADO ----------------------------------------------------------------------------------
  const [order, setOrder] = useState("");
  const currentPage = useSelector((state) => state.currentPage);
  const videogamesPerPage = useSelector((state) => state.videogamesPerPage);
  const indexOfLastVideogames = currentPage * videogamesPerPage;
  const indexFirstVideogames = indexOfLastVideogames - videogamesPerPage;

  const currentVideogames = allVideogames?.slice(indexFirstVideogames, indexOfLastVideogames);

  //--------------------------------------------------------------------------------------------
  useEffect(() => {
    dispatch(getAllVideogames());
  }, [dispatch]);

  //--------------------------------------------------------------------------------------------
  return (
    <div className={styles.home}>
      <NavBar setOrder={setOrder} />
      <div className={styles.container}>
        {currentVideogames?.length < 1 ? (
          <Loading />
        ) : (
          currentVideogames?.map((v, i) => {
            return (
              <div className={styles.cards} key={i}>
                <div className={styles.card}>
                  <Card
                    key={v.id}
                    image={v.image}
                    name={v.name}
                    genres={v.genres}
                  />
                  <div>
                    <Link to={`/home/${v.id}`}>
                      <button className={styles.b}>See Details</button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div>
        <Pagination
          // videogamesPerPage={videogamesPerPage}
          // allVideogames={allVideogames?.length}
          // pagination={pagination}
        />
      </div>
    </div>
  );
};

export default Home;
