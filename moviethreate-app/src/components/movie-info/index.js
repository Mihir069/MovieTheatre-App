import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./style.css";
const MovieInfo = () => {
    const { movieId } = useParams();
    const [selectedMovie, setSelectedMovie] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=27e7bd3c69a085aeeb14e90dccf23dfe`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data) {
                const movieData = {
                    id: data.id,
                    title: data.title,
                    poster: data.backdrop_path,
                    release_date: data.release_date,
                    ratings: data.vote_average,
                    genres: data.genres.map(genre => genre.name),
                    overview: data.overview
                };
                setSelectedMovie(movieData);
            } else {
                setSelectedMovie([]);
            }
        })
        .catch(error => {
            console.error("Error fetching movie data:", error);
        });
    }, [movieId]);

    return (
        <div className="container">
            {selectedMovie && (
                <div className="movie-details-container d-inline-flex my-3 py-3">
                    <div className="movie-img col-6 d-inline">
                        <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster}`} alt={selectedMovie.title} />
                    </div>
                    <div className="movie-details col-6 p-4 d-inline">
                        <div className="movie-title">
                            <h2>{selectedMovie.title}</h2>
                        </div>
                        <div className="movie-genre">
                            <p>{selectedMovie.genres}</p>
                        </div>
                        <div className="movie-releasing">
                            <p><strong>Release Date:</strong> {selectedMovie.release_date}</p>
                        </div>
                        <div className="movie-ratings">
                            <p><strong>Ratings:</strong> {selectedMovie.ratings}</p>
                        </div>

                        <div className="movie-overview">
                            <p><strong>Overview:</strong> {selectedMovie.overview}</p>
                        </div>
                    </div>
                </div>
            )}
            {!selectedMovie && <p>Loading...</p>}
        </div>
    );
};

export default MovieInfo;
