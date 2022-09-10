import "./FiltersList.scss"

const FiltersList = ({handleFilter}) => {
  return (
    <select onChange={handleFilter} className="filter-list">
        <option value="all">All</option>
        <option value="abv" >High Alcohol</option>
        <option value="first_brewed">Classic Range</option>
        <option value="ph">High Acidity</option>
    </select>
  )
}

export default FiltersList