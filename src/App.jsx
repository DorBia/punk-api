import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//components and containers
import BeerDetails from './components/BeerDetails/BeerDetails';
import Home from './containers/Home/Home';
import Navbar from './containers/Navbar/Navbar';
//style
import './App.scss';

function App() {
  const urlAll = ["https://api.punkapi.com/v2/beers?page=1&per_page=80", 
  "https://api.punkapi.com/v2/beers?page=2&per_page=80", 
  "https://api.punkapi.com/v2/beers?page=3&per_page=80", 
  "https://api.punkapi.com/v2/beers?page=4&per_page=80", 
  "https://api.punkapi.com/v2/beers?page=5&per_page=80"]

  const [isPending, setIsPending] = useState(true); //for loading screen
  const [url, setUrl] = useState(urlAll); // api endpoint
  const [page, setPage] = useState(0); // current page
  const [beersList, setBeersList] = useState(); // actual list of beers

  // fetch api each time url is changing - if it's a single url, fetch only this and set the beersList to the data received
  // if url list is 5 long (to fetch all 325 beers) wait for all to be fetched, make one list out of them and set them as beersList
  // go back to page 1, as there might not be page 12 when fetching just one url
  useEffect(() => {
    const fetchData = async (url) => {
      try {
        if(url.length === 1) {
          const res = await fetch(url[0]);
          const json = await res.json();
          setBeersList(json)
        } else if (url.length === 5) {
          const res = await Promise.all(url.map(url => fetch(url)))
          const json = await Promise.all(res.map(res => res.json()));
          const list = await Promise.all(json[0].concat(json[1], json[2], json[3], json[4]))
          setBeersList(list)
        } 
        setIsPending(false)
        setPage(0)
        console.log("worked")
      } catch (err) {
        console.log(err)
      }
    }
    fetchData(url)
  }, [url])
    

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/beer/:id" element={
            <BeerDetails 
              isPending={isPending} 
              setIsPending={setIsPending}
            />
          }></Route>
          <Route path="/" element={
            <Home 
              urlAll={urlAll} 
              setUrl={setUrl} 
              beersList={beersList} 
              page={page} 
              setPage={setPage} 
              isPending={isPending} 
              setIsPending={setIsPending}
            />
          }></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
