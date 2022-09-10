import { useState } from 'react';
import './App.scss';
import CardList from './components/CardList/CardList';
import Navbar from './components/Navbar/Navbar';
import beers from './data/beers';

function App() {
  const [beersList] = useState(beers);
  const [searchText, setSearchText] = useState("");
  const [filterText, setFilterText] = useState("all");
  

  const handleFilter = (e) => setFilterText(e.target.value);

  const handleInput = (e) => setSearchText(e.target.value.toLowerCase());

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

  const filteredBeers = searchText ? filteredByFilter.filter((beer) => beer.name.toLowerCase().includes(searchText)) : filteredByFilter

  return (
    <div className="app">
      <Navbar handleInput={handleInput} handleFilter={handleFilter}/>
      {filterText && <CardList beers={filteredBeers}/>}

    </div>
  );
}

export default App;
