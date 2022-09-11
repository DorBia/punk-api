import { useParams } from "react-router-dom"
import useFetch from "../../hooks/useFetch";

import "./BeerDetails.scss"

const BeerDetails = () => {

    const { id } = useParams();

    const {data: beer, isPending} = useFetch("https://api.punkapi.com/v2/beers/" +id)

  return (
    <>
    {isPending && <div className="loading-screen">Loading...</div>}
    {beer && <>{beer.map((beer) =>(
        <div key={beer.id} className="beer">
            <img src={beer.image_url} alt="beer" className="beer__img"/>
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
      ))}
    </>}
    </>
  )
}

export default BeerDetails