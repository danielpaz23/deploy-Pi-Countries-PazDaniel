import style from "./Card.module.css"
import React from "react";
import { Link } from "react-router-dom";

export default function Card(props) {
   
    return (
        <div className={style.divCards} >
                
            <div className={style.card}>
                <img className={style.cardimg} src={props.flags} alt="Bandera del país"></img>
                <p className={style.p}> {props.continents}</p>
            </div>
            <Link
                    to={`/countries/${props.id}`}
                    style={{textDecoration: "none" }}
                >
                    <h2 className={style.links}>{props.name}</h2>
                </Link>
        </div>
    )
}