import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Filtro.module.css";
import {
  getCountries,
  filterByContinent,
  filterByActivity,
  sortByNameAsc,
  sortByNameDesc,
  sortByPopulationAsc,
  sortByPopulationDesc,
  getAct,
  searchCountryName,
} from "../../redux/actions";
import CardsContainer from "../CardsContainer/CardsContainer.jsx";
import Paginado from "../Paginado/Paginado.jsx";

const Filtro = () => {
  const dispatch = useDispatch();
  const [continentFilter, setContinentFilter] = useState("");
  const [activityFilter, setActivityFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState("");
  const allCountries = useSelector((state) => state.countries);
  const filteredCountries = useSelector((state) =>
    state.filteredCountries.length > 0 ? state.filteredCountries : allCountries
  );
  const activities = useSelector((state) => state.activities);

  useEffect(() => {
    dispatch(getAct());
    dispatch(getCountries());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setName(value);
    dispatch(searchCountryName(value));
    setActivityFilter("");
    setContinentFilter("");
    setSortOrder("");
  };

  const handleClick = (e) => {
    e.preventDefault();
    setName("");
    dispatch(getCountries());
  };

  const handleContinentFilter = (continent) => {
    setContinentFilter(continent);
    dispatch(filterByContinent(continent));
    setName("");
    setActivityFilter("");
    setSortOrder("");
    setCurrentPage(1);
  };

  const handleActivityFilter = (activity) => {
    setActivityFilter(activity);
    dispatch(filterByActivity(activity));
    setName("");
    setContinentFilter("");
    setSortOrder("");
    setCurrentPage(1);
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
    switch (order) {
      case "nameAsc":
        dispatch(sortByNameAsc());
        break;
      case "nameDesc":
        dispatch(sortByNameDesc());
        break;
      case "populationAsc":
        dispatch(sortByPopulationAsc());
        break;
      case "populationDesc":
        dispatch(sortByPopulationDesc());
        break;
      default:
        break;
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const countriesPerPage = 10;
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );
  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

  return (
    <div className={style.divreset}>
      <div className={style.box1}>
        <div className={style.box2}>
          <button onClick={handleClick} className={style.links}>
            Clear Search
          </button>
        </div>
        <div className={style.box3}>
          <form action>
            <input
              className={style.links}
              type="search"
              placeholder="Search..."
              value={name}
              onChange={handleInputChange}
            />
          </form>
        </div>
      </div>
      <div className={style.box4}>
        <h2 className={style.text}>Continents:</h2>
        <button
          className={style.linksconst}
          onClick={() => handleContinentFilter("")}
        >
          All
        </button>
        <button
          className={style.linksconst}
          onClick={() => handleContinentFilter("Africa")}
        >
          Africa
        </button>
        <button
          className={style.linksconst}
          onClick={() => handleContinentFilter("North America")}
        >
          North America
        </button>
        <button
          className={style.linksconst}
          onClick={() => handleContinentFilter("South America")}
        >
          South America
        </button>
        <button
          className={style.linksconst}
          onClick={() => handleContinentFilter("Asia")}
        >
          Asia
        </button>
        <button
          className={style.linksconst}
          onClick={() => handleContinentFilter("Europe")}
        >
          Europe
        </button>
        <button
          className={style.linksconst}
          onClick={() => handleContinentFilter("Oceania")}
        >
          Oceania
        </button>
        <button
          className={style.linksconst}
          onClick={() => handleContinentFilter("Antarctic")}
        >
          Antarctic
        </button>
      </div>
      <div className={style.box5} >
        <div className={style.box6}>
          <h2 className={style.text}>Activity:</h2>
          <div className={style.listas}>
            <select
              className={style.classic}
              onChange={(e) => handleActivityFilter(e.target.value)}
              value={activityFilter}
            >
              <option value="">Select Activity</option>
              {activities.map((t) => (
                <option value={t.name} key={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={style.box7}>
          <h2 className={style.text}> Order:</h2>
          <div className={style.listas}>
            <select
              className={style.classic}
              value={sortOrder}
              onChange={(e) => handleSortOrderChange(e.target.value)}
            >
              <option value="">None</option>
              <option value="nameAsc">Ascending Name</option>
              <option value="nameDesc">Descending Name</option>
              <option value="populationAsc">Ascending Population</option>
              <option value="populationDesc">Descending Population</option>
            </select>
          </div>
        </div>
      </div>
      <Paginado
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <CardsContainer countries={currentCountries} />
    </div>
  );
};

export default Filtro;
