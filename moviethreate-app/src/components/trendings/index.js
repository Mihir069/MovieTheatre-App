import MovieCard from "../common/movie-cards";
import SliderArrow from "../common/slider-arrow";
import { MovieContext } from "../movie-context";
import { useContext, useState} from "react";
import Loading from "../common/loader";
import "../../index.css";

const TrendingMovies = () => {
    const { trendingMovies, movieGenre } = useContext(MovieContext);
    const [sliderPosition,setSliderPosition] = useState(0)

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
