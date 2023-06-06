import { Link , useHistory} from "react-router-dom"
import style from "./NavBar.module.css"
import React from "react";
export default function Nav() {
    const history = useHistory();

  const handleHomeClick = () => {
    if (history.location.pathname === '/home') {
      window.location.reload();
    }
  };

    return (
        <nav>
            <div className={style.divContainer}>
                <Link to="/home" className={style.links} onClick={handleHomeClick}>Home</Link>
                <Link to="/activities" className={style.links}>Create Activity</Link>
            </div>
        </nav>
    )
}