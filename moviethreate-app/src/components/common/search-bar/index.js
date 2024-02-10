import "./style.css"
const SearchBar = () =>{
    return(
        <div className="search-bar d-flex">
            <input type="text" className="custom-input" placeholder="Search movies..." />
            <span className="input-group-text p-2">
                <img src="./svg/magnifying-glass-solid.svg" alt="search-icon" className="img-fluid" />
            </span>
        </div>
    )
}
export default SearchBar;