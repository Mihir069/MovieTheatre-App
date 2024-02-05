import "../css/bootstrap-css/bootstrap-grid.css";
import "../css/movieHeader.css";
const MovieHeader = () =>{
    return(
        <div className="container">
            <nav className="navbar ">
                <div className="row align-items-center">
                    <div className="col-12 col-lg-3">
                        <img src="./svg/movie-logo.png" alt="movie-logo" height="55px" width="200px"/>
                    </div>
                    <div className="col-12 col-lg-6 ">
                        <div className="input-group d-lg-flex">
                            <input type="text" className="custom-input" placeholder="Search movies..." />
                            <span className="input-group-text m-lg-6">
                                <img src="./svg/magnifying-glass-solid.svg" alt="search-icon" className="img-fluid" />
                            </span>
                        </div>
                        <div className="input-group-append">

                        </div>
                    </div>
                    <div className="col-12 col-lg-3 ">
                        <img src="./svg/movie-logo.png" alt="movie-logo" height="55px" width="200px"/>
                    </div>
                </div>
                
                hello
            </nav>
        </div>
    )
}
export default MovieHeader;