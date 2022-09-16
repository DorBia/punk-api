import { Link } from "react-router-dom";
import "./Card.scss";

const Card = ({ beer, isSummerTheme }) => {

  const { 
    image_url, 
    name, 
    description, 
    abv, 
    id
  } = beer;

  // if description is longer than 120 characters slice it and add "..." else leave it as it is
  const newDescription = description.length > 120 ? `${description.slice(0, 121)}...` : description

  return (
    <div className={isSummerTheme ? "card card--summer" : "card card--winter"}>
      <div className="card__img-container">
        <img className="card__img" src={image_url ? image_url : "https://images.punkapi.com/v2/keg.png"} alt={name} />
      </div>
      <div className="card__content">
        <h3 className={name.split(" ").length > 2 ? "card__heading long" : "card__heading short"}>{name}</h3>
        <p className="card__description" data-testid="description">{newDescription}</p>
        <section className="card__bottom">
          <p className="card__abv">Alc {abv}%</p>
          <Link to={`/beer/${id}`}>
            <button className="card__button"> More info</button>
          </Link>
        </section>
      </div>
    </div>
  )
}

export default Card