import Searchbox from "../Searchbox/SearchBox"
import "./Navbar.scss"

const Navbar = () => {
  return (
    <div className="navbar">
      <h1>BrewDog</h1>
      <Searchbox />
    </div>
  )
}

export default Navbar