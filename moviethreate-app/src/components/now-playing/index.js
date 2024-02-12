import { useMovie } from "../movie-context"
import MovieCard from "../common/movie-cards";
import { Link } from "react-router-dom";
const NowPlaying = () =>{
    const {playingMovies,movieGenre} = useMovie();
    if(!playingMovies){
        return(
            <div>Loading....</div>
        )
    }
    return(
        <section className="my-5">
            <div className="genre-heading">
                Now Playing
            </div>
            <div className="movie-card-container">
                <div className="movie-card d-inline-flex">
                    {
                        playingMovies.map((movie,index)=>(
                            <Link key={index} to={`/movie/${movie.id}`}>
                                <MovieCard movie={movie} index={index} movieGenre={movieGenre}/>
                            </Link>
                            
                        ))
                    },
                </div>
            </div>
        </section>
    )
}
export default NowPlaying;
