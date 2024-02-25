
import MovieCard from "../common/movie-cards";
import { MovieContext } from "../movie-context";
import { useContext } from "react";
const TrendingMovies = () =>{
    const {trendingMovies,movieGenre} = useContext(MovieContext);
    if(!trendingMovies){
        return(
            <div>Loading....</div>
        )
    }
    const movieCard = trendingMovies.map((movie,index)=>(
        <MovieCard movie={movie} index={index} movieGenre={movieGenre}/>
    ));
    return(
        <section className="my-5">
            <div className="genre-heading">
                Trendings
            </div>
            <div className="movie-card-container">
                <div className="movie-card d-inline-flex">
                    {movieCard}
                </div>
            </div>
        </section>
    )
}
export default TrendingMovies;
