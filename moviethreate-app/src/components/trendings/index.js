import { setMovieGenre, setTrendingMovies } from "../../reducers/movieReducer";
import { fetchApiData, fetchGenreApi } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import {  useEffect, useState} from "react";
import SliderArrow from "../common/slider-arrow";
import MovieCard from "../common/movie-cards";
import Loading from "../common/loader";
import "../../index.css";




const TrendingMovies = () => {
    const [fetchedData, setFetchedData] = useState(false);
    const [sliderPosition,setSliderPosition] = useState(0);
    const trendingMovies = useSelector((state)=>state.movie.trendingMovies);
    const movieGenre = useSelector((state)=>state.movie.movieGenre);
    const dispatch = useDispatch();

    const fetchMovies = async(endpoint)=>{
        const data = await fetchApiData(endpoint);
        if(data){
            return data;
        }
        return [];
    };

    const fetchGenre =  async(endpoint) =>{
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
        const fetchData = async()=>{
            try{
                if(!fetchedData){
                    const [trendingData,genreData] = await Promise.all([
                        fetchMovies("trending/all/day"),
                        fetchGenre("genre/movie/list")
                    ]);
                    dispatch(setTrendingMovies(trendingData));
                    dispatch(setMovieGenre(genreData));
                    setFetchedData(true);
                }
            }catch(error){
                console.error("Error in fetching data: ",error);
            }
        }
        fetchData();
    },[fetchedData,dispatch]);
    
    if (!trendingMovies) {
        return (
            <div><Loading/></div>
        )
    }

    const visibleMovie = trendingMovies.slice(sliderPosition,sliderPosition+5);
    const movieCard = visibleMovie.map((movie, index) => (
        <MovieCard key={index} movie={movie} movieGenre={movieGenre} />
    ));

    return (
        <section className="my-5">
            <div className="slider-card-container justify-content-between">
                <SliderArrow sliderMovie={trendingMovies} sliderPosition={sliderPosition}setSliderPosition={setSliderPosition}/>
            </div>
            <div className="genre-heading">
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
