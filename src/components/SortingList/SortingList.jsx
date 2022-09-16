import React from 'react'
import "./SortingList.scss"

const SortingList = ({handleSort}) => {
  return (
    <label className="dropdown-list">
      <span className="dropdown-list__span">Sort: </span>  
      <select onChange={handleSort} className="dropdown-list__dropdown dropdown-list--sort">
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