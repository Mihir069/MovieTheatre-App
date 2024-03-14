import {setTrendingMovies } from "../../reducers/movieReducer";
import { fetchApiData} from "../../services";
import { useDispatch, useSelector } from "react-redux";
import {  useEffect, useState} from "react";
import SliderArrow from "../common/slider-arrow";
import MovieCard from "../common/movie-cards";
import Loading from "../common/loader";
import "../../index.css";




const TrendingMovies = () => {
    const [sliderPosition,setSliderPosition] = useState(0);
    const trendingMovies = useSelector((state)=>state.movies.trendingMovies);
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
                const trendingData = await fetchMovies("trending/all/day");
                dispatch(setTrendingMovies(trendingData));
            }catch(error){
                console.error("Error in fetching data: ",error);
            }
        }
        fetchData();
    },[dispatch]);
    
    if (!trendingMovies) {
        return (
            <div><Loading/></div>
        )
    }

    const visibleMovie = trendingMovies.slice(sliderPosition,sliderPosition+5);
    const movieCard = visibleMovie.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
    ));

    return (
        <section className="my-1">
            <div className="slider-card-container justify-content-between">
                <SliderArrow sliderMovie={trendingMovies} sliderPosition={sliderPosition}setSliderPosition={setSliderPosition}/>
            </div>
            <div className="genre-heading my-3">
                Trendings
            </div>
            <div className="movie-card-container">
                <div className="movie-card d-inline-flex">
                    {movieCard}
                </div>
            </div>
        </section>
    )
}

export default TrendingMovies;
