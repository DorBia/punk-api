import { Link } from "react-router-dom";
import "./Card.scss";

const Card = ({img, name, description, abv, id, isSummer}) => {

    const newDescription = description.length > 120 ? `${description.slice(0, 121)}...` : description
    // const newTitle = name.split(' ').slice(0,2).join(' ')


  return (
    <div className={isSummer ? "card card--summer" : "card card--winter"}>
      <div className="card__img-container">
        <img className="card__img" src={img} alt="" />
      </div>
      <div className="card__content">
        <h3 className={name.split(" ").length > 2 ? "card__heading long" : "card__heading short"}>{name}</h3>
        <p className="card__description">{newDescription}</p>
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