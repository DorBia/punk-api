import "./Card.scss";

const Card = ({img, name, description, abv}) => {

    const newDescription = description.length > 120 ? `${description.slice(0, 121)}...` : description
    const newTitle = name.split(' ').slice(0,2).join(' ')

  return (
    <div className="card">
      <div className="card__img-container">
        <img className="card__img" src={img} alt="" />
      </div>
      <div className="card__content">
        <h3 className="card__heading">{newTitle}</h3>
        <p className="card__description">{newDescription}</p>
        <section className="card__bottom">
          <p className="card__abv">Alc {abv}%</p>
          <button className="card__button">More info</button>
        </section>
      </div>
    </div>
  )
}

export default Card