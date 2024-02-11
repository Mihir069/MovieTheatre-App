import { useMovie } from "../movie-context"
import MovieCard from "../common/movie-cards";
const TopRatedMovies = () =>{
    const {topRates,movieGenre} = useMovie();
    if(!topRates){
        return(
            <div>Loading....</div>
        )
    }
    return(
        <section className="my-5">
            <div className="genre-heading">
                Top Rated Movies
            </div>
            <div className="movie-card-container">
                <div className="movie-card d-inline-flex">
                    {
                        topRates.map((movie,index)=>(
                            <MovieCard movie={movie} index={index} movieGenre={movieGenre}/>
                        ))
                    },
                </div>
            </div>
        </section>
    )
}
export default TopRatedMovies;
