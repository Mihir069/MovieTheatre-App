import MovieBanner from "../../components/banner";
import IncomignMovie from "../../components/incoming-movies";
import NowPlaying from "../../components/now-playing";
import PopulerMovies from "../../components/populer-movies";
import TopRatedMovies from "../../components/top-movies";
import GenreList from "../../components/genre-list";
import TrendingMovies from "../../components/trendings";
// import Loading from "../../components/common/loader";
// import { useState } from "react";

const Home = () =>{
    // const [loading,setLoading] = useState(true)
    // setTimeout(()=>setLoading(false),2000);
    // if(loading){
    //     return(
    //         <Loading/>
    //     )
    // }
    return(
        <>
            <MovieBanner/>
            <GenreList/>
            <TrendingMovies/>
            <IncomignMovie/>
            <NowPlaying/>
            <PopulerMovies/>
            <TopRatedMovies/>
        </>
    )
}
export default Home; 