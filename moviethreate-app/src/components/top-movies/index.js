import { setTopRates } from "../../reducers/movieReducer";
import { useDispatch, useSelector } from "react-redux";
import {  useEffect, useState } from "react";
import { fetchApiData } from "../../services";
import SliderArrow from "../common/slider-arrow";
import MovieCard from "../common/movie-cards";
import Loading from "../common/loader";
import "../../index.css";

const TopRatedMovies = () =>{

    const [sliderPosition,setSliderPosition] = useState(0);
    const topRatedMovies = useSelector((state)=>state.movies.topRatedMovies);
    const dispatch = useDispatch();

    const fetchMovies = async(endpoint)=>{
        const data = await fetchApiData(endpoint);
        if (data) {
            return data;
        }
        return [];
    };

    useEffect(()=>{
        const fetchData = async() =>{
            try{
                const topRatedData = await fetchMovies("movie/top_rated");
                dispatch(setTopRates(topRatedData));
           
            }catch(error){
                console.error("Error in fetching data: ",error);
            }
        };
        fetchData();
    },[dispatch]);


    const visibleMovie = topRatedMovies.slice(sliderPosition,sliderPosition+5);
    
    const movieCard =visibleMovie.map((movie,index)=>(
        <MovieCard movie={movie} index={index}/>
    ));

    if(!topRatedMovies){
        return <div><Loading/></div>
    };

    return(
        <section className="my-1 mb-5">
            <div className="slider-card-container justify-content-between">
            <SliderArrow sliderMovie={topRatedMovies} sliderPosition={sliderPosition}setSliderPosition={setSliderPosition}/>
            </div>
            <div className="genre-heading my-3">
                Top Rated Movies
            </div>
            <div className="movie-card-container">
                <div className="movie-card d-inline-flex">
                    {movieCard}
                </div>
            </div>
        </section>
    )
}
export default TopRatedMovies;
