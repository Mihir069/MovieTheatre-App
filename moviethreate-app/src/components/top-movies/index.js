import { setMovieGenre, setTopRates } from "../../reducers/movieReducer";
import { useDispatch, useSelector } from "react-redux";
import {  useEffect, useState } from "react";
import { fetchApiData } from "../../services";
import SliderArrow from "../common/slider-arrow";
import MovieCard from "../common/movie-cards";
import Loading from "../common/loader";
import "../../index.css";

const TopRatedMovies = () =>{

    const [sliderPosition,setSliderPosition] = useState(0);
    const [fetchedData,setFetchedData] = useState(false);
    const topRatedMovies = useSelector((state)=>state.movie.topRatedMovies);
    const movieGenre = useSelector((state)=>state.movie.movieGenre);
    const dispatch = useDispatch();

    const fetchMovies = async(endpoint)=>{
        const data = await fetchApiData(endpoint);
        if (data) {
            return data;
        }
        return [];
    };

    const fetchGenre = async(endpoint) =>{
        const data = await fetchApiData(endpoint);
        if (data.genres) {
            return data.genres.map((item) => ({
                id: item.id,
                genre_name: item.name,
            }));
        }
        return [];
    }

    useEffect(()=>{
        const fetchData = async() =>{
            try{
                if(!fetchedData){
                    const [topRatedData,genreData] = await Promise.all([
                        fetchMovies("movie/top_rated"),
                        fetchGenre("genre/movie/list")
                    ]);
                    dispatch(setTopRates(topRatedData));
                    dispatch(setMovieGenre(genreData));
                    setFetchedData(true);
                }
            }catch(error){
                console.error("Error in fetching data: ",error);
            }
        };
        fetchData();
    },[fetchedData,dispatch]);


    const visibleMovie = topRatedMovies.slice(sliderPosition,sliderPosition+5);
    
    const movieCard =visibleMovie.map((movie,index)=>(
        <MovieCard movie={movie} index={index} movieGenre={movieGenre}/>
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
