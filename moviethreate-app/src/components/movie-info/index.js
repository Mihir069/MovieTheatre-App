import {useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDetailApi } from "../../services";
import { useDispatch,useSelector } from "react-redux";
import { setSelectedMovie,setMovieImages,setMovieCast,setReview,setVideo,setSimilerMovies } from "../../reducers/movieInfoReducer";
import MovieImages from "../common/movie-Image";
import MovieCast from "../common/movie-cast";
import ProgressBar from "../common/progress-bar";
import WatchList from "../common/watch-list";
import Favourite from "../common/favourite";
import YouTube from "react-youtube";
import MovieSimilerCard from "../common/movie-similer-card";
import Loading from "../common/loader";
import "./style.css";

const MovieInfo = () => {
    // const [selectedMovie,setSelectedMovie] = useState({});
    // const [movieImages,setMovieImages] = useState([]);
    // const [movieCast,setMovieCast] = useState([]);
    // const [review,setReview] = useState([]);
    // const [video,setVideo] = useState([]);
    // const [similerMovies,setSimilerMovies] = useState([]);

    const [fetchedData,setFetchedData] = useState(false);
    const selectedMovie = useSelector((state)=>state.movieInfo.selectedMovie);
    const movieImages = useSelector((state)=>state.movieInfo.movieImages);
    const movieCast = useSelector((state)=>state.movieInfo.movieCast);
    const review = useSelector((state)=>state.movieInfo.review);
    const video = useSelector((state)=>state.movieInfo.video);
    const similerMovies = useSelector((state)=>state.movieInfo.similerMovies);
    const dispatch = useDispatch();
    const {movieId} = useParams();

    const fetchDetails = async (endpoint) =>{
        const data = await fetchDetailApi(endpoint);
        console.log(data)
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
                    dispatch(setSelectedMovie(movie));

                    const movieImages = imagesData.backdrops.map(backdrop => ({
                        file_path: backdrop.file_path,
                        aspect_ratio: backdrop.aspect_ratio,
                        height: backdrop.height,
                        width: backdrop.width,
                    }));
                    dispatch(setMovieImages(movieImages || []));
        
                    const movieCast =creditsData.cast.map(castMember => ({
                        profile: castMember.profile_path,
                        name: castMember.name,
                        gender: castMember.gender === 2 ? 'Male' : castMember.gender === 1 ? 'Female' : 'Other',
                        character: castMember.character
                    }));
                    dispatch(setMovieCast(movieCast || []));
        
                    const similer =  similarData.results.map(item => ({
                        id: item.id,
                        title: item.original_title,
                        poster: item.backdrop_path,
                        ratings:item.vote_average,
                    }));
                    dispatch(setSimilerMovies(similer || []));
        
                    const reviews =  reviewsData.results.map(review => ({
                        id: review.id,
                        author: review.author,
                        content: review.content,
                        rating: review.author_details.rating,
                        created_at: review.created_at
                    }));
                    dispatch(setReview(reviews || []));

                    const trailer = videosData.results.find(clip => clip.type === "Trailer");
                    if (trailer) dispatch(setVideo(trailer.key));
                    setFetchedData(true);
                }
            }catch(error){
                console.log("Error fetching data:",error);
            }
        }

        fetchMovieDetails()
    },[movieId,fetchedData,dispatch]);


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
                <div className="movie-details-container p-4">
                    <div className="movie-details-card row">
                        <div className="image-bg-container">
                            <div className="image-bg" style={{backgroundImage:`url(https://image.tmdb.org/t/p/original${selectedMovie.poster})`}}></div>
                        </div>
                        
                        <div className="movie-details p-4 col-3 my-3" >
                            <div className="movie-header">
                                <div className="movie-detail-poster">
                                    <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster}`} alt={selectedMovie.name} />
                                </div>
                            </div>
                        </div>
                        <div className="movie-details p-4 col-6 my-3">
                            <div className="movie-title d-inline">
                                    {selectedMovie.title}
                            </div>
                            <div className="movie-release ">
                                {selectedMovie.release_date}|
                                {selectedMovie.genres}|
                                {selectedMovie.runtime}m
                            </div>
                            <div className="ratings m-2 d-inline-flex">
                                <div className="progress p-2">
                                    <ProgressBar stars={selectedMovie.ratings}/>
                                </div>
                                <div className="watch-list p-2">
                                    <WatchList/>
                                </div>
                                <div className="favourite p-2">
                                    <Favourite/>
                                </div>
                            </div>
                            <div className="movie-overview my-3">
                                <p><strong>Overview :</strong>{selectedMovie.overview}</p>
                            </div>
                        </div>
                        <div className="movie-cast-container">
                            <h4>Cast</h4>
                            <MovieCast movieCast={movieCast}/>
                        </div>
                        <div className="my-5 py-5">
                            <h4>Movie Reviews</h4>
                            <div className="review-container">
                                {reviews}
                            </div>
                        </div>
                        <div className="details p-4 d-inline-flex">
                            <div className="movie-main-img col-6 ">
                                <YouTube videoId={video}/>
                            </div>
                            <div className="movie-main-img col-6 mx-4 my-2">
                                <MovieImages movieImages={movieImages}/>
                            </div>
                        </div>
                        <div className="more-movies">
                            <h4>More Like This</h4>
                            <div className="similer-movies-container">
                                <div className="similer-movie d-inline-flex my-4">
                                    <MovieSimilerCard similerMovies={similerMovies}/>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            )}
            {!selectedMovie && <p><Loading/></p>}
            
        </>
    );
};

export default MovieInfo;
