import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import BeerDetails from './components/BeerDetails/BeerDetails';
import CardList from './components/CardList/CardList';
import Navbar from './components/Navbar/Navbar';
import beers from './data/beers';
import useFetch from './hooks/useFetch';

function App() {
  const [beersList, setBeersList] = useState(beers);
  const [filterText, setFilterText] = useState("all");
  const [url, setUrl] = useState("https://api.punkapi.com/v2/beers?page=1&per_page=80");
  const [page, setPage] = useState(0);

  const {data, isPending} = useFetch(url)
  if (!isPending && beersList === beers) {
    setBeersList(data)
  }

  const handleInput = (e) => {
    const term = e.target.value.toLowerCase();
    if (Number(term) > 0 && Number(term) <= 325){
      setUrl(`https://api.punkapi.com/v2/beers/${term}`)
    } else if (term) {
      setUrl(`https://api.punkapi.com/v2/beers?page=1&per_page=80&beer_name=${term}`)
    } else {
      setUrl(`https://api.punkapi.com/v2/beers?page=1&per_page=80`);
    }
  }

  const handleFilter = (e) => {
    setFilterText(e.target.value)
    setPage(0);
    handleDisplay();
  }

  const getFilteredList = (filterBy) => {
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

  const filteredByFilter = getFilteredList(filterText)

  const perPage = 12;
  const seen = page * perPage;

  const handleDisplay = () => {
    const displayBeers = filteredByFilter.slice(seen, seen + perPage);
    const pageCount = Math.ceil(filteredByFilter.length / perPage);
    return [displayBeers, pageCount]
  }

  const display = handleDisplay();
  const handlePageChange = (e) => setPage(e.selected);

  return (
    <Router>
      <div className="app">
        <Navbar handleInput={handleInput} handleFilter={handleFilter}/>
        <Routes>
          <Route exact path="/" element={
            <CardList beers={display[0]} handlePageChange={handlePageChange} pageCount={display[1]}/>
          }></Route>
          <Route path="/beer/:id" element={
            <BeerDetails />
          }></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
