import { MovieContext } from "../movie-context";
import MovieCard from "../common/movie-cards";
import SliderArrow from "../common/slider-arrow";
import { useContext, useState } from "react";
import Loading from "../common/loader";
import "../../index.css";
const PopulerMovies = () =>{
    const {popularMovies,movieGenre} = useContext(MovieContext);
    const [sliderPosition,setSliderPosition] = useState(0)
    if(!popularMovies){
        return(
            <div><Loading/></div>
        )
    }
    const visibleMovie = popularMovies.slice(sliderPosition,sliderPosition+5)
    const movieCard = visibleMovie.map((movie,index)=>(
        <MovieCard movie={movie} index={index} movieGenre={movieGenre}/>
    ))
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
