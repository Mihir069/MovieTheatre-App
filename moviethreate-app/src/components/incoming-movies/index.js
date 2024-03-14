import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiData} from "../../services";
import {setUpcomingMovies } from "../../reducers/movieReducer";
import MovieCard from "../common/movie-cards";
import SliderArrow from "../common/slider-arrow";
import Loading from "../common/loader";
import "../../index.css";

const IncomignMovie= () =>{
    const upcomingMovies = useSelector((state)=>state.movies.upcomingMovies);
    const [sliderPosition,setSliderPosition] = useState(0);
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
                    const upcomingData= await fetchMovies("movie/upcoming");
                    dispatch(setUpcomingMovies(upcomingData));
            }catch(error){
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    },[dispatch]);

    if(!upcomingMovies){
        return(
            <div><Loading/></div>
        )
    }
    const visibleMovie = upcomingMovies.slice(sliderPosition,sliderPosition+5)
    const movieCard = visibleMovie.map((movie,index)=>(
        <MovieCard key={index} movie={movie}/>
    ))
    return(
        <section className="my-1">
            <div className="slider-card-container justify-content-between">
                <SliderArrow sliderMovie={upcomingMovies} sliderPosition={sliderPosition}setSliderPosition={setSliderPosition}/>
            </div>
            <div className="genre-heading my-3">
                UpComing 
            </div>
            <div className="movie-card-container">
                <div className="movie-card d-inline-flex">
                    {movieCard}
                </div>
            </div>
        </section>

    )
}
export default IncomignMovie;