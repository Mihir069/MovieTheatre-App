import { MovieContext } from "../movie-context";
import MovieCard from "../common/movie-cards";
import { useContext } from "react";
const NowPlaying = () =>{
    const {playingMovies,movieGenre} = useContext(MovieContext);
    if(!playingMovies){
        return(
            <div>Loading....</div>
        )
    }
    const movieCard = playingMovies.map((movie,index)=>(
        <MovieCard movie={movie} index={index} movieGenre={movieGenre}/>
    ))
    return(
        <section className="my-5">
            <div className="genre-heading">
                Now Playing
            </div>
            <div className="movie-card-container">
                <div className="movie-card d-inline-flex">
                    {movieCard}
                </div>
            </div>
        </section>
    )
}
export default NowPlaying;
