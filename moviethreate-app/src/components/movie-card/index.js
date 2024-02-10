import "./style.css"
import { useMovie } from "../movie-context";
import { Link } from "react-router-dom";
const MovieCard = () =>{
    const {movies,movieGenre} = useMovie();
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
                            <div className="movie-poster">
                                <Link to="/">
                                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster}`} alt={movie.name} />
                                </Link>
                            </div>
                            <div className="movie-name">
                                <h6>{movie.name}</h6>
                            </div>
                            <div className="movie-rating">
                                <h6>rating {movie.ratings}</h6>
                            </div>
                            <div className="movie-release">
                                <h6>Releasing {movie.release_date}</h6>
                            </div>
                            <div className="movie-genre">
                                {movie.genre.map((genreId, index) => {
                                    const genre = movieGenre.find(genre => genre.id === genreId);
                                    return <div key={index} className=" d-inline-flex justify-content-centre">{genre && genre.genre_name}</div>;
                                })}
                            </div>
                        </div>
                    ))
                },
            </div>
   
        </div>
        </section>

    )
}
export default MovieCard;