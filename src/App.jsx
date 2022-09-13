import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import BeerDetails from './components/BeerDetails/BeerDetails';
import Home from './containers/Home/Home';
import Navbar from './containers/Navbar/Navbar';

function App() {


  const [url, setUrl] = useState(["https://api.punkapi.com/v2/beers?page=1&per_page=80"]);
  const [page, setPage] = useState(0);
  const [beersList, setBeersList] = useState();
  const [isPending, setIsPending] = useState(true)

  
  useEffect(() => {
    setTimeout(() => {
      const fetchData = async (url) => {
        // setIsPending(true)
        try {
          if(url.length === 1) {
            const res = await fetch(url[0]);
            const json = await res.json();
            setBeersList(json)
          } else if (url.length === 5) {
            const res = await Promise.all([fetch(url[0]), fetch(url[1]), fetch(url[2]), fetch(url[3]), fetch(url[4])])
            const json = await Promise.all(res.map(res => res.json()));
            const list = await Promise.all(json[0].concat(json[1], json[2], json[3], json[4]))
            setBeersList(list)
          } 
          setIsPending(false)
          setPage(0)
        } catch (err) {
          console.log(err)
        }
      }
      fetchData(url)
    }, 500)
    }, [url])
    


  return (
    <Router>
      <div className="app">
        <Navbar setUrl={setUrl}/>
        <Routes>
          <Route exact path="/" element={
            <Home setUrl={setUrl} beersList={beersList} page={page} updatePage={(val) => setPage(val)} isPending={isPending} setIsPending={setIsPending}/>
          }></Route>
          <Route path="/beer/:id" element={
            <BeerDetails beer={beersList} setUrl={setUrl} isPending={isPending} setIsPending={setIsPending}/>
          }></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
