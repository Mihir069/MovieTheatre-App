import { useMovie } from "../movie-context"
import MovieCard from "../common/movie-cards";
const TrendingMovies = () =>{
    const {trendingMovies,movieGenre} = useMovie();
    if(!trendingMovies){
        return(
            <div>Loading....</div>
        )
    }
    return(
        <section className="my-5">
            <div className="genre-heading">
                Trendings
            </div>
            <div className="movie-card-container">
                <div className="movie-card d-inline-flex">
                    {
                        trendingMovies.map((movie,index)=>(
                            <MovieCard movie={movie} index={index} movieGenre={movieGenre}/>
                        ))
                    },
                </div>
            </div>
        </section>
    )
}
export default TrendingMovies;
