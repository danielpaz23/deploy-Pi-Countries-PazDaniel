import { Link } from "react-router-dom"
import style from "./Landing.module.css"
const Landing = ()=>{
    return(
    <div className={style.divreset}>
        <h1>Pi-Countries by Paz Daniel</h1>
        <p className={style.welcom}>¡Bienvenido/a a nuestra pagina!
En donde vas a poder encontrar todos los paises con sus informacion mas importante, ademas de ver diferentes actividades que se realizan en cada pais. </p>
<p className={style.thanks}>Gracias por tu visita!</p>
        <Link className={style.links} to="/home">¡Comenzar Aventura!</Link>
    </div>
    )
}
export default Landing;