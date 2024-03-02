import MovieCard from "../common/movie-cards";
import SliderArrow from "../common/slider-arrow";
import { MovieContext } from "../movie-context";
import { useContext, useState } from "react";
import "../../index.css";
const IncomignMovie= () =>{
    const {movies,movieGenre} = useContext(MovieContext)
    const [sliderPosition,setSliderPosition] = useState(0)
    if(!movies){
        return(
            <div>Loading.....</div>
        )
    }
    const visibleMovie = movies.slice(sliderPosition,sliderPosition+5)
    const movieCard = visibleMovie.map((movie,index)=>(
        <MovieCard key={index} movie={movie} movieGenre={movieGenre}/>
    ))
    return(
        <section className="my-5">
            <div className="slider-card-container justify-content-between">
                <SliderArrow sliderMovie={movies} sliderPosition={sliderPosition}setSliderPosition={setSliderPosition}/>
            </div>
            <div className="genre-heading">
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