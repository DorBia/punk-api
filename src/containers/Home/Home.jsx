import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
//containers and components
import Menu from "../../components/Menu/Menu"
import Card from "../../components/Card/Card";
//style and images
import sun from "../../assets/images/sun-svgrepo-com-2.svg"
import snow from "../../assets/images/snowflake-cold-svgrepo-com.svg"
import "./Home.scss";


const Home = ({ page, setPage, setUrl, isPending, setIsPending, beersList, urlAll}) => {

  const [filterText, setFilterText] = useState();
  const [isSummer, setIsSummer] = useState(false) // just for theme change
  
  // eslint-disable-next-line
  useEffect(() => setUrl(urlAll),[]); // setting url to all 325 beers every time someone goes back to the home page

  // for theme change - toggling it between two themes
  const handleThemeChange = () => setIsSummer(!isSummer)

  // for handling input from search box - by using API, sending request to App.jsx to update the data with new url
  // this way search is working along with filter
  const handleInput = (e) => {
    const term = e.target.value.toLowerCase();
    if (Number(term) > 0 && Number(term) <= 325){
      setUrl([`https://api.punkapi.com/v2/beers/${term}`])
    } else if (term) {
      setUrl([`https://api.punkapi.com/v2/beers?page=1&per_page=80&beer_name=${term}`])
    } else {
      setUrl(urlAll);
    }
  }

  //for handling the filter - setting filter value and going back to first page 
  //(to not be stuck on page 26 when having just 3 pages back)
  const handleFilter = (e) => {
    setFilterText(e.target.value)
    setPage(0)
  }

  // switch between dropdown option and filter the list, else return whe whole list
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

  // create pages, 24 beers per page
  const perPage = 24;
  const seen = page * perPage;
  //check how many pages is needed and return the sliced data, ready for pages along with the total page count
  const handleDisplay = () => {
    if(beersList) {
      const beersPerPage = getFilteredList(filterText).slice(seen, seen + perPage);
      const pageCount = Math.ceil(getFilteredList(filterText).length / perPage);
      return [beersPerPage, pageCount]
    }
  }

  // handle what to display
  const display = handleDisplay()

  //handle what page to display
  // const handlePageChange = ;

  return (
    <div className="container">
      {isPending && <div className="loading-screen">Loading...</div>}
      {!isPending && <>
        <Menu handleThemeChange={handleThemeChange} isSummer={isSummer} handleInput={handleInput} handleFilter={handleFilter} />
        <div className="card-container">
        <img src={isSummer ? snow : sun} alt="theme switch" className="card-container__button" onClick={handleThemeChange} />
          {display[0].map((beer) =>(
            <Card 
              setUrl={setUrl} 
              key={beer.id} 
              beer={beer}
              isSummer={isSummer} 
              setIsPending={setIsPending}/>
          ))}
        </div>
        <ReactPaginate
            className={"pagination"}
            pageCount={display[1]}
            previousLabel={"Previous"}
            previousLinkClassName={"previous"}
            nextLabel={"Next"}
            nextLinkClassName={"next"}
            onPageChange={(e) => setPage(e.selected)}
            activeClassName={"active"}
          />
      </>}
    </div>
  )
}

export default Home