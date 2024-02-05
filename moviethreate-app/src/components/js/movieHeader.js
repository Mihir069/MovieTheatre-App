import "../css/bootstrap-css/bootstrap-grid.css";
import "../css/movieHeader.css";
const MovieHeader = () =>{
    return(
        <div className="container">
            <nav className="navbar">
                <div className="row align-items-center px-sm-3 py-sm-3">
                    <div className="col-12 col-lg-3">
                        <img src="./svg/movie-logo.png" alt="movie-logo" height="55px" width="200px"/>
                    </div>
                    <div className="col-12 col-lg-6 ">
                        <div className="input-group d-lg-flex">
                            <input type="text" className="custom-input" placeholder="Search movies..." />
                            <span className="input-group-text m-lg-auto">
                                <img src="./svg/magnifying-glass-solid.svg" alt="search-icon" className="img-fluid" />
                            </span>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 ">
                        <div className="mx-5">
                        <img src="./svg/book-bookmark-solid.svg" alt="bookmark" height="20px" className="curser mx-3"/>
                        <img src="./svg/user-solid.svg" alt="user" height="20px"lassName=" curser mx-3"/>
                        </div>
                        
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default MovieHeader;