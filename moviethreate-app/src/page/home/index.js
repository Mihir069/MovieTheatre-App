import MovieBanner from "../../components/banner";
import { MovieProvider } from "../../components/movie-context";
import IncomignMovie from "../../components/incoming-movies";
import NowPlaying from "../../components/now-playing";
import "./style.css"
const Home = () =>{
    return(
        <MovieProvider>
            <MovieBanner/>
            <IncomignMovie/>
            <NowPlaying/>
        </MovieProvider>
    )
}
export default Home; 