//js

import MovieCard from "../common/movie-cards";
import { MovieContext } from "../movie-context";
import "./style.css";
import { useContext, useState } from "react";

const TrendingMovies = () => {
    const { trendingMovies, movieGenre } = useContext(MovieContext);
    const [sliderPosition, setSliderPosition] = useState(0);

    const handlePrevClick = () => {
        if (sliderPosition > 0) {
            setSliderPosition(sliderPosition - 1);
        }
    }

    const handleNextClick = () => {
        if (sliderPosition < (trendingMovies.length - 5)) {
            setSliderPosition(sliderPosition + 1);
        }
    }

    if (!trendingMovies) {
        return (
            <div>Loading....</div>
        )
    }

    const visibleMovies = trendingMovies.slice(sliderPosition, sliderPosition + 5);

    const movieCard = visibleMovies.map((movie, index) => (
        <MovieCard key={index} movie={movie} movieGenre={movieGenre} />
    ));

    return (
        <section className="my-5">
            <div className="container"></div>
            <div className="slider-card-container justify-content-between">
                {sliderPosition<(trendingMovies.length)&&(
                    <div className="slider-card-arrow p-3 " onClick={handlePrevClick}>&lt;</div>
                )}   
                {sliderPosition<(trendingMovies.length-5)&&(
                    <div className="slider-card-arrow p-3" onClick={handleNextClick}>&gt;</div>
                )}
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
