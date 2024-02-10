import MovieBanner from "../banner";
import MovieCard from "../movie-card";
import { MovieProvider } from "../movie-context";
const Movie = () =>{
    return(
        <MovieProvider>
            <MovieBanner/>
            <MovieCard/>
        </MovieProvider>
    )
}
export default Movie;