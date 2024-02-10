import "./style.css"
import { useMovie } from "../movie-context";
import { Link } from "react-router-dom";
const MovieCard = () =>{
    const {movies} = useMovie();
    console.log("Movies",movies)
    if(!movies){
        return(
            <div>Loading.....</div>
        )
    }
    return(
        <section className="my-5">
        <div className="genre">
            New Incoming
        </div>
        <div className="movie-card-container">
            <div className="movie-card d-inline-flex">
                {
                    movies.map((movie,index)=>(
                        <div key={index} className="movie row-cols-auto">
                            <Link to="/">
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster}`} alt={movie.name} />
                            </Link>
                            
                            <p>{movie.name}</p>
                            <h6>Releasing {movie.release_date}</h6>
                            <h6>rating {movie.ratings}</h6>

                        </div>
                    ))
                },
            </div>
   
        </div>
        </section>

    )
}
export default MovieCard;