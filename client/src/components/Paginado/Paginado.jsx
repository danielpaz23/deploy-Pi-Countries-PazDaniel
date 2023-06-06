import React from "react";
import style from "./Paginado.module.css"
const Paginado = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  return (
    <div>
      <ul >
        {pageNumbers.map((number) => (
          <div  className={style.pagination}>
          <li key={number} className={currentPage === number ? "active" : ""}>
            <button className={style.links} onClick={() => onPageChange(number)}>{number}</button>
          </li></div>
        ))}
      </ul>
    </div>
  );
};
export default Paginado;
