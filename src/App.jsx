import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//components and containers
import BeerPage from './containers/BeerPage/BeerPage';
import Home from './containers/Home/Home';
import Navbar from './containers/Navbar/Navbar';
//style
import './App.scss';

function App() {

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/beer/:id" element={
            <BeerPage />
          }/>
          <Route path="/" element={
            <Home />
          }/>
        </Routes>
      </div>
    </Router>
  )
}

export default App;
