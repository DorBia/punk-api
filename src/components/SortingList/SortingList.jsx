import React from 'react'

const SortingList = ({handleSort}) => {
  return (
    <label>
      <span>Sort</span>  
      <select onChange={handleSort} className="filter-list">
        <option value="">Default</option>
        <option value="a-z">A-Z</option>
        <option value="z-a">Z-A</option>
        <option value="alc-low">Alcohol low-high</option>
        <option value="alc-high">Alcohol high-low</option>
      </select>
    </label>

  )
}

export default SortingList