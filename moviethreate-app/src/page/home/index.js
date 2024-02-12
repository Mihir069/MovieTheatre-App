import MovieBanner from "../../components/banner";
import { MovieProvider } from "../../components/movie-context";
import IncomignMovie from "../../components/incoming-movies";
import NowPlaying from "../../components/now-playing";
import PopulerMovies from "../../components/populer-movies";
import TopRatedMovies from "../../components/top-movies";
import GenreList from "../../components/genre-list";
import "./style.css"
const Home = () =>{
    return(
        <MovieProvider>
            <MovieBanner/>
            <GenreList/>
            <IncomignMovie/>
            <NowPlaying/>
            <PopulerMovies/>
            <TopRatedMovies/>
        </MovieProvider>
    )
}
export default Home; 