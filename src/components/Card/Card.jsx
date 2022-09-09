import "./Card.scss";

const Card = ({img, name, description, abv}) => {

    const newDescription = description.length > 150 ? `${description.slice(0, 151)}...` : description

  return (
    <div className="card">
        <img className="card__img" src={img} alt="" />
        <h3 className="card__heading">{name}</h3>
        <p className="card__description">{newDescription}</p>
        <p className="card__abv">{abv}</p>
    </div>
  )
}

export default Card