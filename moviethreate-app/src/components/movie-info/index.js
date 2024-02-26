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
    const [fetchedData,setFetchedData] = useState(false)
    const {movieId} = useParams();

    const fetchDetails = async (endpoint) =>{
        const data = await fetchDetailApi(endpoint);
        return data;
    }

    useEffect(()=>{
        const fetchMovieDetails =  async () =>{
            try{
                if(!fetchedData){
                    const [movieData,imagesData,creditsData,similarData,reviewsData,videosData]= await Promise.all([
                        fetchDetails(`movie/${movieId}`),   
                        fetchDetails(`movie/${movieId}/images`),
                        fetchDetails(`movie/${movieId}/credits`),
                        fetchDetails(`movie/${movieId}/similar`),
                        fetchDetails(`movie/${movieId}/reviews`),
                        fetchDetails(`movie/${movieId}/videos`)
                    ]);
                    const movie = {
                        title: movieData.title,
                        poster: movieData.backdrop_path,
                        release_date: movieData.release_date,
                        ratings: movieData.vote_average,
                        genres: movieData.genres ? movieData.genres.map(genre => genre.name).join(", ") : "",
                        overview: movieData.overview,
                        runtime: movieData.runtime,
                        vote_count: movieData.vote_count
                    };
                    setSelectedMovie(movie);
        
                    const movieImages = imagesData.backdrops.map(backdrop => ({
                        file_path: backdrop.file_path,
                        aspect_ratio: backdrop.aspect_ratio,
                        height: backdrop.height,
                        width: backdrop.width,
                    }));
                    setMovieImages(movieImages || []);
        
                    const movieCast =creditsData.cast.map(castMember => ({
                        profile: castMember.profile_path,
                        name: castMember.name,
                        gender: castMember.gender === 2 ? 'Male' : castMember.gender === 1 ? 'Female' : 'Other',
                        character: castMember.character
                    }));
                    setMovieCast(movieCast || []);
        
                    const similer =  similarData.results.map(item => ({
                        id: item.id,
                        title: item.original_title,
                        poster: item.backdrop_path,
                    }));
                    setSimilerMovies(similer || []);
        
                    const reviews =  reviewsData.results.map(review => ({
                        id: review.id,
                        author: review.author,
                        content: review.content,
                        rating: review.author_details.rating,
                        created_at: review.created_at
                    }));
                    setReview(reviews || []);
                    const trailer = videosData.results.find(clip => clip.type === "Trailer");
                    if (trailer) setVideo(trailer.key);
                    setFetchedData(true);
                }
            }catch(error){
                console.log("Error fetching data:",error);
            }
        }

        fetchMovieDetails()
    },[movieId,fetchedData]);


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
