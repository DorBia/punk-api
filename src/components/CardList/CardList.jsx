import ReactPaginate from "react-paginate";
import Card from "../Card/Card";
import "./CardList.scss";

const CardList = ({beers, pageCount, handlePageChange}) => {

  return (
    <div className="container">
      <div className="card-container">
        {beers.map((beer) =>(
          <Card key={beer.id} name={beer.name} description={beer.description} abv={beer.abv} img={beer.image_url}/>
        ))}
      </div>
      <ReactPaginate
          className={"pagination"}
          pageCount={pageCount}
          previousLabel={"Previous"}
          previousLinkClassName={"previous"}
          nextLabel={"Next"}
          nextLinkClassName={"next"}
          onPageChange={handlePageChange}
          activeClassName={"active"}
        />
    </div>
  )
}

export default CardList