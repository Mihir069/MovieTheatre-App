import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import WatchList from "../common/watch-list";
import BookMark from "../common/mark/index";
import AddToList from "../common/add-to-list";
import AddFavourite from "../common/add-favourite";
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

    return (
        <>
            {selectedMovie && (
                <div className="movie-details-container p-5 my-3">
                    <div className="movie-details-card row">
                        <div className="movie-img col-6">
                            <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster}`} alt={selectedMovie.name}  />
                        </div>
                        <div className="movie-details col-6">
                            <div className="movie-title">
                                {selectedMovie.title}
                            </div>
                            <div className="movie-release d-inline">
                                {selectedMovie.release_date}|
                                {selectedMovie.genres}|
                                {selectedMovie.runtime}m
                            </div>
                            <div className="tool-bg row">
                                <div className="tool col-1 m-2 p-2">
                                    <BookMark/>
                                </div>
                                
                                <div className="tool col-1 m-2 p-2">
                                    <AddToList/>
                                </div>
                                <div className="tool col-1 m-2 p-2">
                                    <AddFavourite/>
                                </div>
                                
                            </div>
                            <div className="movie-overview my-3 py-3">
                                <h5>Overview</h5>
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
