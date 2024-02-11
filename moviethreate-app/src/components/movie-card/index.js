import "./style.css"
import { useMovie } from "../movie-context";
import { Link } from "react-router-dom";
import WatchList from "../common/watch-list/watch-list";
import Reviews from "../common/review/review";
const MovieCard = () =>{
    const {movies,movieGenre} = useMovie();
    console.log("Movies",movies)
    if(!movies){
        return(
            <div>Loading.....</div>
        )
    }
    return(
        <>
                <section className="my-5">
            <div className="genre-heading">
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
                                <div className="movie-name m-3">
                                    <h6>{movie.name}</h6>
                                </div>
                                <div className="movie-rating my-2">
                                    <Reviews stars={movie.ratings}/>
                                </div>
                                <div className="movie-genre my-2 py-2">
                                    {movie.genre.map((genreId, index) => {
                                        const genre = movieGenre.find(genre => genre.id === genreId);
                                        return <div key={index} className="genre d-inline m-1">{genre && genre.genre_name}</div>;
                                    })}
                                </div>
                                <div className="watch-list">
                                    <WatchList/>
                                </div>
                            </div>
                        ))
                    },
                </div>
    
            </div>
        </section>
        
        </>


    )
}
export default MovieCard;