import "./FiltersList.scss"

const FiltersList = ({handleFilter}) => {
  
  return (
    <label className="dropdown-list"> 
      <span className="dropdown-list__span">Filter: </span> 
      <select onChange={handleFilter} className="dropdown-list__dropdown">
        <option value="">All</option>
        <option value="abv-high">High Alcohol</option>
        <option value="abv-low">Low Alcohol</option>
        <option value="first_brewed">Classic Range</option>
        <option value="ph-low">Low Acidity</option>
        <option value="ph-high">High Acidity</option>
      </select>
    </label>
  )
}

export default FiltersList