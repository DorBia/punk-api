import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
//style
import "./BeerPage.scss"

const BeerDetails = () => {

  const { id } = useParams();
  const [beer, setBeer] = useState();

  // using separate fetch, so it can immediately fetch single ones each time with just going straight to single page url
  useEffect(() => {
    const fetchBeer = async() => {
      const res = await fetch(`https://api.punkapi.com/v2/beers/${id}`)
      const json = await res.json();
      setBeer(json[0]);
    }
    fetchBeer()
  // eslint-disable-next-line
  }, [id])

  return (
    <>
      {beer && <div key={beer.id}>
        <div className="beer">
          <img src={beer.image_url ? beer.image_url : "https://images.punkapi.com/v2/keg.png"} alt="" className="beer__img"/>
          <div className="beer__main">
            <h1 className="beer__name">{beer.name}</h1>
            <h3 className="beer__tagline">"{beer.tagline}"</h3>
            <p className="beer__description">{beer.description}</p>
            <h6 className="beer__date">First brewed: {beer.first_brewed}</h6>
            <section className="beer__numbers">
              <h3 className="beer__abv">Alc {beer.abv}%</h3>
              <h3 className="beer__ph">PH: {beer.ph}</h3>
            </section>
          </div>

          <ul className="beer__food">
            <h4 className="beer__food--heading">Tastes best with:</h4>
            <li className="beer__food--item">{beer.food_pairing[0]}</li>
            <li className="beer__food--item">{beer.food_pairing[1]}</li>
            <li className="beer__food--item">{beer.food_pairing[2]}</li>
          </ul>
          <div className="beer__tips">
            <h3 className="beer__tips--span">Brewers tips:</h3>
            <p>{beer.brewers_tips}</p>
          </div>
        </div>
        <div className="beer__bottom">
          <Link to="/">
            <button className="beer__button">Go Back</button>
          </Link>
        </div>
      </div>}
    </>
  )
}

export default BeerDetails