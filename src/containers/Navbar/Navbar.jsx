import FiltersList from "../../components/FiltersList/FiltersList"
import Searchbox from "../../components/Searchbox/SearchBox"
import "./Navbar.scss"
import logo from "../../assets/images/output-onlinepngtools.png"
import { Link } from "react-router-dom"

const Navbar = ({handleInput, handleFilter, isHome, handleMenu, isActive, setIsActive}) => {

  const handleClick = () => setIsActive(!isActive)

  return (
    <div className="navbar">
      <Link to="/">
        <h1 className="navbar__header" onClick={() => handleMenu(true)}><img src={logo} alt="logo" className="navbar__logo"></img>BrewDog</h1>
      </Link>
      {!isActive && isHome && <svg onClick={handleClick} width="48px" height="48px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><title>70 Basic icons by Xicons.co</title><path d="M41,14H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,14Z" fill="#6f7380"/><path d="M41,26H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,26Z" fill="#6f7380"/><path d="M41,38H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,38Z" fill="#6f7380"/></svg>}
      {isActive && isHome && <div className="navbar__menu">
        <p className="navbar__close" onClick={handleClick}>x</p>
        <FiltersList handleFilter={handleFilter}/>
        <Searchbox handleInput={handleInput}/>
      </div>}

    </div>
  )
}

export default Navbar