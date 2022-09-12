
import FiltersList from "../../components/FiltersList/FiltersList"
import Searchbox from "../../components/Searchbox/SearchBox"
import menu from "../../assets/images/hamburger-menu-svgrepo-com.svg"
import { useState } from "react"

const Menu = ({handleInput, handleFilter}) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => setIsActive(!isActive)

  return (<>
    {!isActive && <img src={menu} alt="menu" className="menu" onClick={handleClick}/>}
    {isActive && <div className="menu--open">
      <p className="menu__close" onClick={handleClick}>x</p>
      <FiltersList handleFilter={handleFilter}/>
      <Searchbox handleInput={handleInput}/>
    </div>}
    </>
  )
}

export default Menu