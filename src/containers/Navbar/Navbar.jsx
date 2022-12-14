import { Link } from "react-router-dom"
// styling and images
import "./Navbar.scss"
import logo from "../../assets/images/logo.png"


const Navbar = () => {

  return (
    <div className="navbar">
      <Link to="/">
        <h1 className="navbar__header"><img src={logo} alt="logo" className="navbar__logo"></img>BrewDog</h1>
      </Link>
    </div>
  )
}

export default Navbar