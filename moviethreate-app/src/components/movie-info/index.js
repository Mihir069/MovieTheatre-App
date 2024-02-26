import {useEffect, useState } from "react";
import MovieImages from "../common/movie-Image";
import MovieCast from "../common/movie-cast";
import "./style.css";
import YouTube from "react-youtube";
import MovieSimilerCard from "../common/movie-similer-card";
import { useParams } from "react-router-dom";
import { fetchDetailApi } from "../../services";
const MovieInfo = () => {
    const [selectedMovie,setSelectedMovie] = useState({});
    const [movieImages,setMovieImages] = useState([]);
    const [movieCast,setMovieCast] = useState([]);
    const [review,setReview] = useState([]);
    const [video,setVideo] = useState([]);
    const [similerMovies,setSimilerMovies] = useState([]);
    const {movieId} = useParams();

    const fetchDetails = async (endpoint) =>{
        const data = await fetchDetailApi(endpoint);
        return data;
    }

    useEffect(()=>{
        const fetchMovieDetails =  async () =>{
            const [movieData,imagesData,creditsData,similarData,reviewData,videoData]= await Promise.all([
                fetchDetails(`movie/${movieId}`),   
                fetchDetails(`movie/${movieId}/images`),
                fetchDetails(`movie/${movieId}/credits`),
                fetchDetails(`movie/${movieId}/similar`),
                fetchDetails(`movie/${movieId}/reviews`),
                fetchDetails(`movie/${movieId}/videos`)
            ]);
            setSelectedMovie(movieData);
            setMovieImages(imagesData);
            setMovieCast(creditsData);
            setSimilerMovies(similarData);
            setReview(reviewData)
        }
        fetchMovieDetails()
    },[movieId])


    const reviews = review.map((review,movie) => (
        <div key={review.id} className="review">
            <h2>{review.author}</h2>
            {review.rating && <p>Rating: {review.rating}</p>}
            <p>{review.content}</p>
            <p>Created at: {review.created_at}</p>
        </div>
    ))
    return (
        <>
            {selectedMovie && (
                <div className="movie-details-container">
                    <div className="movie-details-card row">
                        <div className="movie-details p-4 col-6 my-3">
                            <div className="movie-title">
                                {selectedMovie.title}
                            </div>
                            <div className="movie-release d-inline">
                                {selectedMovie.release_date}|
                                {selectedMovie.genres}|
                                {selectedMovie.runtime}m
                            </div>
                        </div>
                        <div className="movie-details p-4 col-6 my-3">
                            <div className="movie-star  d-inline-flex">
                                <img src="../svg/star-solid.svg" alt="star" />
                                <div className="rating">{selectedMovie.ratings}/10 <br/>{selectedMovie.vote_count} </div>
                            </div>
                        </div>
                        <div className="details p-4 row">
                            <div className="movie-main-img col-auto">
                                <MovieImages movieImages={movieImages}/>
                            </div>
                            <div className="movie-overview my-3">
                                <p><strong>Overview :</strong>{selectedMovie.overview}</p>
                            </div>
                            <YouTube videoId={video}/>
                        </div>
                        <div className="movie-cast-container">
                            <h3>Cast</h3>
                            <MovieCast movieCast={movieCast}/>
                        </div>
                        
                    </div>
                </div>
            )}
            <div className="my-5 py-5">
                <h2>Movie Reviews</h2>
                <div className="review-container">
                    {reviews}
                </div>
            </div>
            <div className="more-movies">
                <h2>More Like This</h2>
                <div className="similer-movies-container">
                    <div className="similer-movie d-inline-flex my-4">
                        <MovieSimilerCard similerMovies={similerMovies}/>
                    </div>
                </div>
            </div>

            {!selectedMovie && <p>Loading...</p>}
            
        </>
    );
};

export default MovieInfo;
