import { useState } from "react"
//components
import FiltersList from "../../components/FiltersList/FiltersList"
import Searchbox from "../../components/Searchbox/SearchBox"
//style and images
import menu from "../../assets/images/hamburger-menu-svgrepo-com.svg"
import "./Menu.scss"
import SortingList from "../SortingList/SortingList"


const Menu = ({handleInput, handleFilter, handleSort}) => {
  const [isActive, setIsActive] = useState(false); // for menu opening/closing

  // open/close menu
  const handleClick = () => setIsActive(!isActive)

  return (
    <>
      {!isActive && <img src={menu} alt="menu" className="menu" onClick={handleClick}/>}
      {isActive && <div className="menu--open">
        <p className="menu__close" onClick={handleClick}>x</p>
        <SortingList handleSort={handleSort} />
        <FiltersList handleFilter={handleFilter}/>
        <Searchbox handleInput={handleInput}/>
      </div>}
    </>
  )
}

export default Menu