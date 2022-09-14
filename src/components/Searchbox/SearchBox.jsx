import "./SearchBox.scss";

const Searchbox = ({handleInput}) => {
  
  return (
    <div className="search">
        <input className="search__input" type="text" placeholder="Search here..." onChange={handleInput}/>
    </div>
  )
}

export default Searchbox