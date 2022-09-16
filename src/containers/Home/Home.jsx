import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
//containers and components
import Menu from "../../components/Menu/Menu"
import Card from "../../components/Card/Card";
//style and images
import sun from "../../assets/images/sun-svgrepo-com-2.svg"
import snow from "../../assets/images/snowflake-cold-svgrepo-com.svg"
import "./Home.scss";


const Home = () => {
  /* ----- STATES ----- */
  const [beersList, setBeersList] = useState([]); // actual list of beers
  const [isSummerTheme, setIsSummerTheme] = useState(false) // just for the theme change
  const [page, setPage] = useState(0); // current page
  // for search, filter and sort
  const [searchTerm, setSearchTerm] = useState("")
  const [filterText, setFilterText] = useState("");
  const [sortText, setSortText] = useState("");

  // to load all 325 beers on a page load
  useEffect(() => {
    const fetchBeers = async () => {
      try {
        const url = [ "https://api.punkapi.com/v2/beers?page=1&per_page=80", 
                      "https://api.punkapi.com/v2/beers?page=2&per_page=80", 
                      "https://api.punkapi.com/v2/beers?page=3&per_page=80", 
                      "https://api.punkapi.com/v2/beers?page=4&per_page=80", 
                      "https://api.punkapi.com/v2/beers?page=5&per_page=80" ]

        const res = await Promise.all(url.map(url => fetch(url)))
        const json = await Promise.all(res.map(res => res.json()));
        const list = await Promise.all(json[0].concat(json[1], json[2], json[3], json[4]))
        setBeersList(list)
        setPage(0)
      } catch (err) {
        console.log(err)
      }
    }
    fetchBeers()
  }, [])

  // handle input, filter and sort and always go back to first page, so it doesn't show empty site even when there is matching data
  const handleInput = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setPage(0)
  }

  const handleFilter = (e) => {
    setFilterText(e.target.value)
    setPage(0)
  }

  const handleSort = (e) => {
    setSortText(e.target.value)
    setPage(0)
  }

  // get the list of beers after search - at first it's all beers as it's searching for empty string, so everything matches
  const searchBeers = (beerArr, searchTerm) => beerArr.filter((beer) => beer.name.toLowerCase().includes(searchTerm))

  // take searched beers and filter them, return filtered list - which by default is all beers
  const filterBeers = (filterBy) => {
    if(!filterBy) {
      return searchBeers(beersList, searchTerm)
    } else if(filterBy === "abv-high") {
      return searchBeers(beersList, searchTerm).filter((beer) => beer.abv > 6);
    } else if(filterBy === "abv-low") {
      return searchBeers(beersList, searchTerm).filter((beer) => beer.abv < 6);
    } else if(filterBy === "ph-low") {
      return searchBeers(beersList, searchTerm).filter((beer) => beer.ph < 4);
    } else if(filterBy === "ph-high") {
      return searchBeers(beersList, searchTerm).filter((beer) => beer.ph > 4);
    } else if(filterBy === "first_brewed") {
      return searchBeers(beersList, searchTerm).filter((beer) => Number(beer.first_brewed.slice(3)) < 2010)
    }
  }

  // take filtered beers and sort them, by default sorting is by id
  // "? 1 : -1" - firefox and safari don't need it anymore, but chrome still does
  const sortBeers = (sortBy) => {
    if(!sortBy) {
      return filterBeers(filterText).sort((a, b) => a.id > b.id ? 1 : -1); 
    } else if (sortBy === "a-z") {
      return filterBeers(filterText).sort((a, b) => a.name > b.name ? 1 : -1);
    } else if (sortBy === "z-a") {
      return filterBeers(filterText).sort((a, b) => a.name < b.name ? 1 : -1)
    } else if (sortBy === "alc-low") {
      return filterBeers(filterText).sort((a, b) => a.abv > b.abv ? 1 : -1)
    } else if (sortBy === "alc-high") {
      return filterBeers(filterText).sort((a, b) => a.abv < b.abv ? 1 : -1)
    }
  }

  /* ----- PAGES ----- */
  // variables for using pages
  const perPage = 24;
  const seenBeers = page * perPage;

  // check if the list has already loaded from API, slice the sorted list, find out the number of pages, return both values 
  const handlePages = () => {
    if(beersList) {
      const beersPerPage = sortBeers(sortText).slice(seenBeers, seenBeers + perPage);
      const pageCount = Math.ceil(sortBeers(sortText).length / perPage);
      return [beersPerPage, pageCount]
    }
  }

  // for theme change - toggling it between two themes
  const handleThemeChange = () => setIsSummerTheme(!isSummerTheme)

  return (
    <div className="container">
      {beersList && <>
        <Menu 
          handleInput={handleInput} 
          handleFilter={handleFilter} 
          handleSort={handleSort}
        />
        <div className="card-container">
          <img src={isSummerTheme ? snow : sun} alt="theme switch" className="card-container__button" onClick={handleThemeChange} />
          {handlePages()[0].map((beer) =>(
            <Card 
              key={beer.id} 
              beer={beer}
              isSummerTheme={isSummerTheme} 
            />
          ))}
        </div>
        <ReactPaginate
            className={"pagination"}
            pageCount={handlePages()[1]}
            previousLabel={"Previous"}
            previousLinkClassName={"previous"}
            nextLabel={"Next"}
            nextLinkClassName={"next"}
            onPageChange={(e) => setPage(e.selected)}
            activeClassName={"active"}
            disabledClassName={"disabled"}
          />
      </>}
    </div>
  )
}

export default Home