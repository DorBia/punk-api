import { useState } from 'react';
import './App.scss';
import CardList from './components/CardList/CardList';
import Navbar from './components/Navbar/Navbar';
import beers from './data/beers';

function App() {

  const [beersList, setBeersList] = useState(beers);

  return (
    <div className="app">
      <Navbar />
      <CardList beers={beersList}/>
    </div>
  );
}

export default App;
