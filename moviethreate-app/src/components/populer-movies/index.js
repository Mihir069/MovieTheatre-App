import { setMovieGenre, setPopulerMovies } from "../../reducers/movieReducer";
import { fetchApiData, fetchGenreApi } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import {useEffect, useState } from "react";
import SliderArrow from "../common/slider-arrow";
import MovieCard from "../common/movie-cards";
import Loading from "../common/loader";
import "../../index.css";

const PopulerMovies = () =>{
    const [sliderPosition,setSliderPosition] = useState(0);
    const [fetchedData,setFetchedData] = useState(false);
    const popularMovies = useSelector((state)=>state.movie.popularMovies);
    const movieGenre = useSelector((state)=>state.movie.movieGenre);
    const visibleMovie = popularMovies.slice(sliderPosition,sliderPosition+5);
    const dispatch = useDispatch();

    const fetchMovies = async(endpoint)=>{
        const data = await fetchApiData(endpoint);
        if(data){
            return data;
        }
        return [];
    };

    const fetchGenre = async(endpoint)=>{
        const data = await fetchGenreApi(endpoint);
        if (data.genres) {
            return data.genres.map((item) => ({
                id: item.id,
                genre_name: item.name,
            }));
        }
        return [];
    }
   
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                if(!fetchedData){
                    const [popularData,genreData] = await Promise.all([
                        fetchMovies("movie/popular"),
                        fetchGenre("genre/movie/list")
                    ]);
                    dispatch(setPopulerMovies(popularData));
                    dispatch(setMovieGenre(genreData));
                    setFetchedData(true)
                }
            }catch(error){
                console.error("Error in fetching data :",error);
            }
        };
        fetchData();
    },[fetchedData,dispatch]);

    const movieCard = visibleMovie.map((movie,index)=>(
        <MovieCard movie={movie} index={index} movieGenre={movieGenre}/>
    ));

    if(!popularMovies){
        return(
            <div><Loading/></div>
        )
    };

    return(
        <section className="my-5">
            <div className="slider-card-container justify-content-between">
                <SliderArrow sliderMovie={popularMovies} sliderPosition={sliderPosition}setSliderPosition={setSliderPosition}/>
            </div>
            <div className="genre-heading">
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
