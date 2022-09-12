import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import BeerDetails from './components/BeerDetails/BeerDetails';
import Home from './containers/Home/Home';
import Navbar from './containers/Navbar/Navbar';

function App() {
  const [filterText, setFilterText] = useState("all");
  const [url, setUrl] = useState("https://api.punkapi.com/v2/beers?page=1&per_page=80");
  const [page, setPage] = useState(0);
  const [isHome, setIsHome] = useState(true);
  const [isActive, setIsActive] = useState(false)

  const handleMenu = (state) => {
    setIsHome(state);
    setIsActive(false)
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
    setPage(0)
  }

  return (
    <Router>
      <div className="app">
        <Navbar handleInput={handleInput} handleFilter={handleFilter} isHome={isHome} handleMenu={handleMenu} isActive={isActive} setIsActive={setIsActive}/>
        <Routes>
          <Route exact path="/" element={
            <Home url={url} filterText={filterText} page={page} setPage={setPage} handleMenu={handleMenu}/>
          }></Route>
          <Route path="/beer/:id" element={
            <BeerDetails handleMenu={handleMenu}/>
          }></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
