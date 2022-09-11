import { useParams } from "react-router-dom"
import useFetch from "../../hooks/useFetch";

const BeerDetails = () => {

    const { id } = useParams();

    const {data: beer, isPending} = useFetch("https://api.punkapi.com/v2/beers/" +id)

  return (
    <>
    {isPending && <div>Loading...</div>}
    {beer && <>{beer.map((beer) =>(
        <div key={beer.id} className="beer">
            <img src={beer.image_url} alt="beer" className="beer__img"/>
            <h1 className="beer__name">{beer.name}</h1>
        </div>
      ))}
    </>}
    </>
  )
}

export default BeerDetails