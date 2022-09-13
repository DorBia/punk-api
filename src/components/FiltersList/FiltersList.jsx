import "./FiltersList.scss"

const FiltersList = ({handleFilter}) => {
  
  return (
    <select onChange={handleFilter} className="filter-list">
        <option value="all">All</option>
        <option value="abv-high">High Alcohol</option>
        <option value="abv-low">Low Alcohol</option>
        <option value="first_brewed">Classic Range</option>
        <option value="ph-low">Low Acidity</option>
        <option value="ph-high">High Acidity</option>
    </select>
  )
}

export default FiltersList