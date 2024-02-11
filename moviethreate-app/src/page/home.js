import MovieBanner from "../components/banner";
import { MovieProvider } from "../components/movie-context";
import MovieCard from "../components/movie-card";

const Home = () =>{
    return(
        <MovieProvider>
            <MovieBanner/>
            <MovieCard/>
        </MovieProvider>
    )
}
export default Home; 