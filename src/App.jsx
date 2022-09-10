import { useState, useEffect } from 'react';
import './App.scss';
import CardList from './components/CardList/CardList';
import Navbar from './components/Navbar/Navbar';
import beers from './data/beers';

function App() {
  const [beersList, setBeersList] = useState(beers);
  const [filterText, setFilterText] = useState("all");
  const [url, setUrl] = useState("https://api.punkapi.com/v2/beers?page=1&per_page=80");

  useEffect(() => {
    fetch(url)
    .then(response => response.json())
    .then(json => setBeersList(json))
  }, [url])

  const handleInput = (e) => {
    const term = e.target.value.toLowerCase();
    term ? setUrl(`https://api.punkapi.com/v2/beers?page=1&per_page=80&beer_name=${term}`) : setUrl(`https://api.punkapi.com/v2/beers?page=1&per_page=80`);
  }
  const handleFilter = (e) => setFilterText(e.target.value);

  const getFilteredList = (filterBy) => {
    switch (filterBy) {
      case "abv":
        return beersList.filter((beer) => beer.abv > 4.8);
      case "ph":
        return beersList.filter((beer) => beer.ph < 4);
      case "first_brewed":
        return beersList.filter((beer) => Number(beer.first_brewed.slice(3)) > 2010)
      default:
        return beersList;
    } 
  }

  const filteredByFilter = getFilteredList(filterText)

  return (
    <div className="app">
      <Navbar handleInput={handleInput} handleFilter={handleFilter}/>
      <CardList beers={filteredByFilter}/>
    </div>
  );
}

export default App;
