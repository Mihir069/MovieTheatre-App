import MovieCard from "../common/movie-cards";
import SliderArrow from "../common/slider-arrow";
import { useEffect, useState } from "react";
import Loading from "../common/loader";
import "../../index.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiData, fetchGenreApi } from "../../services";
import { setMovieGenre, setMovies } from "../../reducers/movieReducer";

const IncomignMovie= () =>{
    const [fetchedData,setFetchedData] = useState(false);
    const movies = useSelector((state)=>state.movie.movies);
    const movieGenre = useSelector((state)=>state.movie.movieGenre);
    const [sliderPosition,setSliderPosition] = useState(0);
    const dispatch = useDispatch();

    const fetchMovies = async(endpoint)=>{
        const data = await fetchApiData(endpoint);
        if (data) {
            return data;
        }
        return [];
    };

    const fetchGenre = async (endpoint) =>{
        const data = await fetchGenreApi(endpoint);
        if (data.genres) {
            return data.genres.map((item) => ({
                id: item.id,
                genre_name: item.name,
            }));
        }
        return [];
    };

    useEffect(()=>{
        const fetchData = async() =>{
            try{
                if(!fetchedData){
                    const [upcomingData,genreData] = await Promise.all([
                        fetchMovies("movie/upcoming"),
                        fetchGenre("genre/movie/list")
                    ]);
                    dispatch(setMovies(upcomingData));
                    dispatch(setMovieGenre(genreData));
                    setFetchedData(true);
                }
            }catch(error){
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    },[fetchedData,dispatch]);

    if(!movies){
        return(
            <div><Loading/></div>
        )
    }
    const visibleMovie = movies.slice(sliderPosition,sliderPosition+5)
    const movieCard = visibleMovie.map((movie,index)=>(
        <MovieCard key={index} movie={movie} movieGenre={movieGenre}/>
    ))
    return(
        <section className="my-1">
            <div className="slider-card-container justify-content-between">
                <SliderArrow sliderMovie={movies} sliderPosition={sliderPosition}setSliderPosition={setSliderPosition}/>
            </div>
            <div className="genre-heading my-3">
                New Incoming
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