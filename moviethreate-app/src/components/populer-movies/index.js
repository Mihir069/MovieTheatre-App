import {setPopulerMovies } from "../../reducers/movieReducer";
import { fetchApiData } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import {useEffect, useState } from "react";
import SliderArrow from "../common/slider-arrow";
import MovieCard from "../common/movie-cards";
import Loading from "../common/loader";
import "../../index.css";

const PopulerMovies = () =>{
    const [sliderPosition,setSliderPosition] = useState(0);
    const popularMovies = useSelector((state)=>state.movies.popularMovies);
    const visibleMovie = popularMovies.slice(sliderPosition,sliderPosition+5);
    const dispatch = useDispatch();

    const fetchMovies = async(endpoint)=>{
        const data = await fetchApiData(endpoint);
        if(data){
            return data;
        }
        return [];
    };
   
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const popularData = await fetchMovies("movie/popular");
                dispatch(setPopulerMovies(popularData));
            }catch(error){
                console.error("Error in fetching data :",error);
            }
        };
        fetchData();
    },[dispatch]);

    const movieCard = visibleMovie.map((movie,index)=>(
        <MovieCard movie={movie} index={index}/>
    ));

    if(!popularMovies){
        return(
            <div><Loading/></div>
        )
    };

    return(
        <section className="my-1">
            <div className="slider-card-container justify-content-between">
                <SliderArrow sliderMovie={popularMovies} sliderPosition={sliderPosition}setSliderPosition={setSliderPosition}/>
            </div>
            <div className="genre-heading my-3">
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
