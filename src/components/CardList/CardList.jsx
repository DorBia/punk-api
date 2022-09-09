import Card from "../Card/Card";
import "./CardList.scss";

const CardList = ({beers}) => {

  return (
    <div className="card-container">
      {beers.map((beer) =>(
        <Card key={beer.id} name={beer.name} description={beer.description} abv={beer.abv} img={beer.image_url}/>
      ))}
    </div>
  )
}

export default CardList