import "./Navbar.scss"
import logo from "../../assets/images/output-onlinepngtools.png"
import { Link } from "react-router-dom"

const Navbar = ({setUrl}) => {

  return (
    <div className="navbar">
      <Link to="/">
        <h1 className="navbar__header" onClick={() => setUrl(`https://api.punkapi.com/v2/beers?page=1&per_page=80`)}><img src={logo} alt="logo" className="navbar__logo"></img>BrewDog</h1>
      </Link>
      

    </div>
  )
}

export default Navbar