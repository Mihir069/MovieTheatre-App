import { MovieContext } from "../movie-context";
import MovieCard from "../common/movie-cards";
import { useContext } from "react";
const PopulerMovies = () =>{
    const {populerMovie,movieGenre} = useContext(MovieContext);
    console.log("popular ",populerMovie)
    if(!populerMovie){
        return(
            <div>Loading....</div>
        )
    }
    const movieCard = populerMovie.map((movie,index)=>(
        <MovieCard movie={movie} index={index} movieGenre={movieGenre}/>
    ))
    return(
        <section className="my-5">
            <div className="genre-heading">
                Populer Movies
            </div>
            <div className="movie-card-container">
                <div className="movie-card d-inline-flex">
                    {movieCard}
                </div>
            </div>
        </section>
    )
}
export default PopulerMovies;
