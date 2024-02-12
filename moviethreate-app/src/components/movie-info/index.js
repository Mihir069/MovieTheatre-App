import { useParams } from "react-router-dom";
import { useMovie } from "../movie-context";

const MovieInfo = () => {
    const { movieId } = useParams();
    const { playingMovies } = useMovie();

    const selectedMovie = playingMovies.find(movie => movie.id === parseInt(movieId));

    if (!selectedMovie) {
        return <div>Loading....</div>;
    }

    const { name, poster, release_date, ratings, genre } = selectedMovie;

    return (
        <div className="container">
            <h2>{name}</h2>
            <img src={`https://image.tmdb.org/t/p/w500${poster}`} alt={name} />
            <p>Release Date: {release_date}</p>
            <p>Ratings: {ratings}</p>
            <p>Genre: {genre.join(', ')}</p>
        </div>
    );
};

export default MovieInfo;
