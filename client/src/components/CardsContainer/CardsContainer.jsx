import Card from "../Card/Card";
import style from "./CardsContainer.module.css";

export default function CardsContainer({ countries}) {
  return (
    <div className={style.container}>
      {countries.map((country) => (
        <Card
          key={country.id}
          id={country.id}
          flags={country.flags}
          name={country.name}
          continents={country.continents}
        />
      ))}
    </div>
  );
}
