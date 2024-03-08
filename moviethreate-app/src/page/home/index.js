import MovieBanner from "../../components/banner";
import IncomignMovie from "../../components/incoming-movies";
import NowPlaying from "../../components/now-playing";
import PopulerMovies from "../../components/populer-movies";
import TopRatedMovies from "../../components/top-movies";
// import GenreList from "../../components/genre-list";
import TrendingMovies from "../../components/trendings";

const Home = () =>{

    return(
        <>
            <MovieBanner/>
            {/* <GenreList/> */}
            <TrendingMovies/>
            <IncomignMovie/>
            <NowPlaying/>
            <PopulerMovies/>
            <TopRatedMovies/>
        </>
    )
}
export default Home; 