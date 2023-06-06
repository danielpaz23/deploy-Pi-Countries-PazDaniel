import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import React from "react";
import style from "./Detail.module.css";
import { getCountry } from "../../redux/actions.js";

export default function Detail() {
    const { idPais } = useParams();
    const dispatch = useDispatch();
    const country = useSelector((state) => state.country);

    useEffect(() => {
        dispatch(getCountry(idPais));
    }, [dispatch, idPais]);

    return (
        <div className={style.divreset}>
            <div className={style.boxa}>
                <div className={style.box1}>
                    <div className={style.box2}>
                        {country.id && (
                            <p className={style.countryid}>
                                <b>ID: </b>
                                {country.id}
                            </p>
                        )}
                        {country.name && (
                            <p className={style.countryname}>
                                <b>Name: </b>
                                {country.name}
                            </p>
                        )}
                        {country.continents && (
                            <p>
                                <b>Continent: </b>
                                {country.continents}
                            </p>
                        )}
                        {country.capital && (
                            <p>
                                <b>Capital: </b>
                                {country.capital}
                            </p>
                        )}
                        {country.area && (
                            <p>
                                <b>Area: </b>
                                {country.area}
                                <b> km2</b>
                            </p>
                        )}
                        {country.population && (
                            <p>
                                <b>Population: </b>
                                {country.population}
                            </p>
                        )}
                    </div>
                    <div className={style.box3}>
                        <img className={style.imgn} src={country.flags} alt="Country Flag" />
                    </div>
                </div>
                <div className={style.box4}>
                    {country.Activities && country.Activities.length > 0 && (
                        <div className={style.box5}>
                            <h3>Activities:</h3>
                            <ul className={style.ul}>
                                {country.Activities.map((activity) => (
                                    <li className={style.li} key={activity.id}>
                                        <div className={style.box6}>
                                            <p>
                                                <b>Name: </b>
                                                {activity.name}
                                            </p>
                                            <p>
                                                <b>Difficulty: </b>
                                                {activity.difficulty}
                                            </p>
                                            <p>
                                                <b>Season: </b>
                                                {activity.season}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}