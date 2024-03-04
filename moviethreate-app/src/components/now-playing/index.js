import { MovieContext } from "../movie-context";
import MovieCard from "../common/movie-cards";
import SliderArrow from "../common/slider-arrow";
import { useContext, useEffect, useState } from "react";
import Loading from "../common/loader";
import "../../index.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiData, fetchGenreApi } from "../../services";
import { setMovieGenre, setPlayingMovies } from "../../reducers/movieReducer";
const NowPlaying = () =>{
    //const {playingMovies,movieGenre} = useContext(MovieContext);
    const [sliderPosition,setSliderPosition] = useState(0);
    const [fetchedData,setFetchedData] = useState(false);
    const dispatch = useDispatch();
    const playingMovies = useSelector((state)=>state.movie.playingMovies);
    const movieGenre = useSelector((state)=>state.movie.movieGenre);


    const fetchMovies = async(endpoint)=>{
        const data = await fetchApiData(endpoint);
        if(data){
            return data;
        }
        return [];
    }

    const fetchGenre = async (endpoint) => {
        const data = await fetchGenreApi(endpoint);
        if (data.genres) {
            return data.genres.map((item) => ({
                id: item.id,
                genre_name: item.name,
            }));
        }
        return [];
    };
    const visibleMovie = playingMovies.slice(sliderPosition,sliderPosition+5);

    const movieCard = visibleMovie.map((movie,index)=>(
        <MovieCard movie={movie} index={index} movieGenre={movieGenre}/>
    ));

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                if(!fetchedData){
                    const [nowPlayingData,genreData] = await Promise.all([
                        fetchMovies("movie/now_playing"),
                        fetchGenre("genre/movie/list")
                    ]);
                    dispatch(setPlayingMovies(nowPlayingData));
                    dispatch(setMovieGenre(genreData));
                    setFetchedData(true);
                }
            }catch(error){
                console.error("Error in fetching data:",error);
            }
        };
        fetchData();
    },[fetchedData,dispatch]);

    if(!playingMovies){
        return(
            <div><Loading/></div>
        )
    }
    return(
        <section className="my-5">
            <div className="slider-card-container justify-content-between">
                <SliderArrow sliderMovie={playingMovies} sliderPosition={sliderPosition}setSliderPosition={setSliderPosition}/>
            </div>
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
