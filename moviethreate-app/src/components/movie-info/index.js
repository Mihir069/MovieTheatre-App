import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieImages from "../movie-Image";
import "./style.css";
const MovieInfo = () => {
    const { movieId } = useParams();
    const [selectedMovie, setSelectedMovie] = useState([]);
    const [movieImages,setMovieImages] = useState([]);
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
                    genres: data.genres ? data.genres.map(genre => genre.name).join(", ") : "",
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

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=27e7bd3c69a085aeeb14e90dccf23dfe`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.backdrops);
            if (data.backdrops && data.backdrops.length > 0) {
                const movieImages = data.backdrops.map(backdrop => ({
                    file_path: backdrop.file_path,
                    aspect_ratio: backdrop.aspect_ratio,
                    height: backdrop.height,
                    width: backdrop.width,
                }));
                setMovieImages(movieImages);
            } else {
                setMovieImages([]);
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
                    <div className="movie-details-card ">
                        <div className="movie-details p-4">
                            <div className="movie-title">
                                {selectedMovie.title}
                            </div>
                            <div className="movie-release d-inline">
                                {selectedMovie.release_date}|
                                {selectedMovie.genres}|
                                {selectedMovie.runtime}m
                            </div>
                        </div>
                        <div className="details p-4 row">
                            <div className="movie-main-img col-auto">
                                <MovieImages movieImages={movieImages}/>
                            </div>
                            <div className="movie-overview col-auto">
                                <p>{selectedMovie.overview}</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            )}
            {!selectedMovie && <p>Loading...</p>}
        </>
    );
};

export default MovieInfo;
