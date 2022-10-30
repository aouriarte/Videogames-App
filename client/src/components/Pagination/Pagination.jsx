import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../../redux/actions";

import "./Pagination.css";

const Pagination = () => {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  const videogamesPerPage = useSelector((state) => state.videogamesPerPage);
  const currentPage = useSelector((state) => state.currentPage);
  
  const pageNumbers = [];
  const allVideogames = videogames.length;
  for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleChangePage = (e) => {
    dispatch(changePage(e.target.value));
  };

  return (
    <div>
      <ul className="ul">
      {pageNumbers && currentPage > 1 ? <button className="page_button" value='Prev' onClick={handleChangePage}>Prev</button> : null}
      {pageNumbers?.map(number => (
                    <button key={number} className={currentPage === number ? "current" : "page_button"} value={number} onClick={handleChangePage}>{number}</button>
                ))}
      {pageNumbers && currentPage < pageNumbers.length ? <button className="page_button" value='Next' onClick={handleChangePage}>Next</button> : null}
      </ul>
    </div>
  );
};

export default Pagination;
