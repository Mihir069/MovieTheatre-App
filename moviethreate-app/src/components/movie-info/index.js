import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const MovieInfo = () => {
    const { movieId } = useParams();
    const [selectedMovie, setSelectedMovie] = useState(null);

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
                setSelectedMovie(null);
            }
        })
        .catch(error => {
            console.error("Error fetching movie data:", error);
        });
    }, [movieId]);

    return (
        <div className="container">
            {selectedMovie && (
                <div>
                    <h2>{selectedMovie.title}</h2>
                    <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster}`} alt={selectedMovie.title} />
                    <p><strong>Release Date:</strong> {selectedMovie.release_date}</p>
                    <p><strong>Ratings:</strong> {selectedMovie.ratings}</p>
                    <p><strong>Genres:</strong> {selectedMovie.genres.join(', ')}</p>
                    <p><strong>Overview:</strong> {selectedMovie.overview}</p>
                </div>
            )}
            {!selectedMovie && <p>Loading...</p>}
        </div>
    );
};

export default MovieInfo;
