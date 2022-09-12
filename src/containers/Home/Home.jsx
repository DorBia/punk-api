
import ReactPaginate from "react-paginate";
import useFetch from "../../hooks/useFetch";
import Card from "../../components/Card/Card";
import "./Home.scss";
import { useState } from "react";
import sun from "../../assets/images/sun-svgrepo-com-2.svg"
import snow from "../../assets/images/snowflake-cold-svgrepo-com.svg"

const Home = ({filterText, url, page, setPage, handleMenu}) => {

  const [isSummer, setIsSummer] = useState(false)

  const {data: beersList, isPending} = useFetch(url)


  const getFilteredList = (filterBy) => {
    if(beersList) {
      switch (filterBy) {
        case "abv-high":
          return beersList.filter((beer) => beer.abv > 4.8);
        case "abv-low":
          return beersList.filter((beer) => beer.abv < 4.8);
        case "ph-low":
          return beersList.filter((beer) => beer.ph < 4);
        case "ph-high":
          return beersList.filter((beer) => beer.ph > 4);
        case "first_brewed":
          return beersList.filter((beer) => Number(beer.first_brewed.slice(3)) > 2010)
        default:
          return beersList;
      } 
    }
  }

  const perPage = 12;
  const seen = page * perPage;

  const handleDisplay = () => {
    if(beersList) {
      const displayBeers = filteredByFilter.slice(seen, seen + perPage);
      const pageCount = Math.ceil(filteredByFilter.length / perPage);
      return [displayBeers, pageCount]
    }
  }

  const filteredByFilter = getFilteredList(filterText)

  const display = handleDisplay(filteredByFilter)
  const handlePageChange = (e) => setPage(e.selected);

  const handleThemeChange = () => setIsSummer(!isSummer)

  return (
    <div className="container">
      {isPending && <div className="loading-screen">Loading...</div>}
      {beersList && <>
      <div className="card-container">
        <img src={isSummer ? snow : sun} alt="theme switch" className="card-container__button" onClick={handleThemeChange}></img>
        {display[0].map((beer) =>(
          <Card key={beer.id} name={beer.name} description={beer.description} abv={beer.abv} img={beer.image_url} id={beer.id} handleMenu={handleMenu} isSummer={isSummer}/>
        ))}
      </div>
      <ReactPaginate
          className={"pagination"}
          pageCount={display[1]}
          previousLabel={"Previous"}
          previousLinkClassName={"previous"}
          nextLabel={"Next"}
          nextLinkClassName={"next"}
          onPageChange={handlePageChange}
          activeClassName={"active"}
        />
      </>}
    </div>
  )
}

export default Home