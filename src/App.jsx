import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import BeerDetails from './components/BeerDetails/BeerDetails';
import Home from './containers/Home/Home';
import Navbar from './containers/Navbar/Navbar';

function App() {

  const [url, setUrl] = useState("https://api.punkapi.com/v2/beers?page=1&per_page=80");
  const [page, setPage] = useState(0);
  const [beersList, setBeersList] = useState();

  useEffect(() => {
    const fetchData = async (url) => {
    try {
      const res = await fetch(url);
      const json = await res.json();
      setBeersList(json)
    } catch (err) {
      console.log(err)
    }
    }
    fetchData(url)
  }, [url])


  return (
    <Router>
      <div className="app">
        <Navbar setUrl={setUrl}/>
        <Routes>
          <Route exact path="/" element={
            <Home setUrl={setUrl} beersList={beersList} page={page} setPage={setPage}/>
          }></Route>
          <Route path="/beer/:id" element={
            <BeerDetails beer={beersList} setUrl={setUrl}/>
          }></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
