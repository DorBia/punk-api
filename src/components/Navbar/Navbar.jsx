import FiltersList from "../FiltersList/FiltersList"
import Searchbox from "../Searchbox/SearchBox"
import "./Navbar.scss"

const Navbar = ({handleInput, handleFilter}) => {
  return (
    <div className="navbar">
      <h1>BrewDog</h1>
      <FiltersList handleFilter={handleFilter}/>
      <Searchbox handleInput={handleInput}/>
    </div>
  )
}

export default Navbar