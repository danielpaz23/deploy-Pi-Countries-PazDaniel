import { Link } from "react-router-dom"
import style from "./NavBar.module.css"
import React from "react";
export default function Nav() {
    return (
        <nav>
            <div className={style.divContainer}>
                <Link to="/home" className={style.links}>Home</Link>
                <Link to="/activities" className={style.links}>Create Activity</Link>
            </div>
        </nav>
    )
}