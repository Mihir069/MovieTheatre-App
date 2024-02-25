
import MovieCard from "../common/movie-cards";
import { MovieContext } from "../movie-context";
import { useContext } from "react";
const TopRatedMovies = () =>{
    const {topRates,movieGenre} = useContext(MovieContext);
    if(!topRates){
        return(
            <div>Loading....</div>
        )
    }
    const movieCard =topRates.map((movie,index)=>(
        <MovieCard movie={movie} index={index} movieGenre={movieGenre}/>
    ))
    return(
        <section className="my-5">
            <div className="genre-heading">
                Top Rated Movies
            </div>
            <div className="movie-card-container">
                <div className="movie-card d-inline-flex">
                    {movieCard}
                </div>
            </div>
        </section>
    )
}
export default TopRatedMovies;
