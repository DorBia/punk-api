import './App.scss';
import CardList from './components/CardList/CardList';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="app">
      <Navbar />
      <CardList />
    </div>
  );
}

export default App;
