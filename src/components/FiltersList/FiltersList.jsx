import "./FiltersList.scss"

const FiltersList = ({handleFilter}) => {
  
  return (
    <label> 
      <span>Filter</span> 
      <select onChange={handleFilter} className="filter-list">
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