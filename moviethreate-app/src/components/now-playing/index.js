import { useMovie } from "../movie-context"
import MovieCard from "../common/movie-cards";
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
                            <MovieCard movie={movie} index={index} movieGenre={movieGenre}/>
                        ))
                    },
                </div>
            </div>
        </section>
    )
}
export default NowPlaying;
