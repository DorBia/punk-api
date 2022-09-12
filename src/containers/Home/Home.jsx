import ReactPaginate from "react-paginate";
import Card from "../../components/Card/Card";
import "./Home.scss";
import { useEffect, useState } from "react";
import Menu from "../../components/Menu/Menu"
import sun from "../../assets/images/sun-svgrepo-com-2.svg"
import snow from "../../assets/images/snowflake-cold-svgrepo-com.svg"


const Home = ({ page, setPage, setUrl, isPending, setIsPending, beersList, urlAll}) => {

  const [filterText, setFilterText] = useState();
  const [isSummer, setIsSummer] = useState(false)
  // const [beersList, setBeersList] = useState(); 

  useEffect(() => {
    setIsPending(true)
    setUrl(urlAll)
  }, []);

  // useEffect(() => {
  //     const fetchAll = async () => {
  //     try {
  //       const url1 = "https://api.punkapi.com/v2/beers?page=1&per_page=80"
  //       const url2 = "https://api.punkapi.com/v2/beers?page=2&per_page=80"
  //       const url3 = "https://api.punkapi.com/v2/beers?page=3&per_page=80"
  //       const url4 = "https://api.punkapi.com/v2/beers?page=4&per_page=80"
  //       const url5 = "https://api.punkapi.com/v2/beers?page=5&per_page=80"

  //       const res = await Promise.all([fetch(url1), fetch(url2), fetch(url3), fetch(url4), fetch(url5)])
  //       const json = await Promise.all(res.map(res => res.json()));
  //       const list = await Promise.all(json[0].concat(json[1], json[2], json[3], json[4]))
  //       setBeersList(list)
  //       setIsPending(false)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //     }
  //     fetchAll()
  //   }, [setIsPending])

  // for theme change
  const handleThemeChange = () => setIsSummer(!isSummer)

  // for handling input from search box
  const handleInput = (e) => {
    setPage(0)
    const term = e.target.value.toLowerCase();
    if (Number(term) > 0 && Number(term) <= 325){
      setUrl([`https://api.punkapi.com/v2/beers/${term}`])
    } else if (term) {
      setUrl([`https://api.punkapi.com/v2/beers?page=1&per_page=80&beer_name=${term}`])
    } else {
      setUrl(urlAll);
    }
  }

  //for handling the filter
  const handleFilter = (e) => {
    setFilterText(e.target.value)
    setPage(0)
  }

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

  // pages
  const perPage = 12;
  const seen = page * perPage;

  const handleDisplay = () => {
    if(beersList) {
      const displayBeers = filteredByFilter.slice(seen, seen + perPage);
      const pageCount = Math.ceil(filteredByFilter.length / perPage);
      return [displayBeers, pageCount]
    }
  }

  // filtered list
  const filteredByFilter = getFilteredList(filterText)

  // handle what to display
  const display = handleDisplay(filteredByFilter)

  const handlePageChange = (e) => setPage(e.selected);

  return (
    <div className="container">
      {isPending && <div className="loading-screen">Loading...</div>}
      {!isPending && <>
        <Menu handleThemeChange={handleThemeChange} isSummer={isSummer} handleInput={handleInput} handleFilter={handleFilter} />
        <div className="card-container">
        <img src={isSummer ? snow : sun} alt="theme switch" className="card-container__button" onClick={handleThemeChange} />
          {display[0].map((beer) =>(
            <Card setUrl={setUrl} key={beer.id} name={beer.name} description={beer.description} abv={beer.abv} img={beer.image_url} id={beer.id} isSummer={isSummer}/>
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