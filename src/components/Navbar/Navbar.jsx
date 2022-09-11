import { useState } from "react"
import FiltersList from "../FiltersList/FiltersList"
import Searchbox from "../Searchbox/SearchBox"
import "./Navbar.scss"
import logo from "../../assets/images/output-onlinepngtools.png"

const Navbar = ({handleInput, handleFilter}) => {
  const [isActive, setIsActive] = useState(false)

  const handleClick = () => {
    setIsActive(!isActive)
  }

  return (
    <div className="navbar">
      <h1 className="navbar__header"><img src={logo} alt="logo" className="navbar__logo"></img>BrewDog</h1>
      {!isActive && <svg onClick={handleClick} width="48px" height="48px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><title>70 Basic icons by Xicons.co</title><path d="M41,14H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,14Z" fill="#6f7380"/><path d="M41,26H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,26Z" fill="#6f7380"/><path d="M41,38H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,38Z" fill="#6f7380"/></svg>}
      {isActive && <div className="navbar__menu">
        <p className="navbar__close" onClick={handleClick}>x</p>
        <FiltersList handleFilter={handleFilter}/>
        <Searchbox handleInput={handleInput}/>
      </div>}

    </div>
  )
}

export default Navbar