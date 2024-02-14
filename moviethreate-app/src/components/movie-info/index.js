import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import WatchList from "../common/watch-list";
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
                    overview: data.overview,
                    runtime:data.runtime,
                    vote_count:data.vote_count
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
        <>
            {selectedMovie && (
                <div className="movie-details-container">
                    <div className="movie-details">
                        <div className="movie-heading p-3 row">
                            <div className="movie-title col-6">
                                <h2 >{selectedMovie.title}</h2>
                            </div>
                            <div className="star-rating col-3 d-inline-flex">
                                <img src="../svg/star-solid.svg" alt="star-solid" className="my-2"/>
                                <div>
                                    <p><span className="rating">{selectedMovie.ratings}/</span>10 </p>
                                    <p className="vote">{selectedMovie.vote_count}</p>
                                </div>
                            </div>
                            <div className="movie-genre d-inline-flex">
                                <p className="justify-content-between  px-1">{selectedMovie.genres}</p>
                                <p className="runtime  px-1">| {selectedMovie.runtime}m</p>
                                <p className="release-date">| {selectedMovie.release_date}</p>
                            </div>

                        </div>

                    </div>
                    <div className="movie-overview row">
                        <div className="movie-img col-auto">
                            <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster}`} alt={selectedMovie.title} />
                        </div>
                        <div className="movie-overview col-6">
                            <p> {selectedMovie.overview}</p>
                        </div>
                        <div className="watch-list">
                            <WatchList prop="Watch list"/>
                        </div>
                    </div>
                </div>
            )}
            {!selectedMovie && <p>Loading...</p>}
        </>
    );
};

export default MovieInfo;
