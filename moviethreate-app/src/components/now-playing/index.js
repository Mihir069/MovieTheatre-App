import {setPlayingMovies } from "../../reducers/movieReducer";
import { fetchApiData} from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SliderArrow from "../common/slider-arrow";
import MovieCard from "../common/movie-cards";
import Loading from "../common/loader";
import "../../index.css";

const NowPlaying = () =>{

    const [sliderPosition,setSliderPosition] = useState(0);
    const dispatch = useDispatch();
    const playingMovies = useSelector((state)=>state.movies.playingMovies);

    const fetchMovies = async(endpoint)=>{
        const data = await fetchApiData(endpoint);
        if(data){
            return data;
        }
        return [];
    };
    
    const visibleMovie = playingMovies.slice(sliderPosition,sliderPosition+5);
    const movieCard = visibleMovie.map((movie,index)=>(
        <MovieCard movie={movie} index={index}/>
    ));

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const nowPlayingData= await fetchMovies("movie/now_playing");
                dispatch(setPlayingMovies(nowPlayingData));
            }catch(error){
                console.error("Error in fetching data:",error);
            }
        };
        fetchData();
    },[dispatch]);

    if(!playingMovies){
        return(
            <div><Loading/></div>
        )
    }
    return(
        <section className="my-1">
            <div className="slider-card-container justify-content-between">
                <SliderArrow sliderMovie={playingMovies} sliderPosition={sliderPosition}setSliderPosition={setSliderPosition}/>
            </div>
            <div className="genre-heading my-3">
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
