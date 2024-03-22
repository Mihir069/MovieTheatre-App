import {useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDetailApi } from "../../services";
import { useDispatch,useSelector } from "react-redux";
import { setSelectedMovie} from "../../reducers/movieInfoReducer";
import MovieImages from "../../components/movie-info/movie-Image";
import MovieCast from "../../components/movie-info/movie-cast";
import ProgressBar from "../../components/common/progress-bar";
import WatchList from "../../components/common/watch-list";
import Favourite from "../../components/common/favourite";
import MovieSimilerCard from "../../components/movie-info/movie-similer-card";
import Loading from "../../components/common/loader";
import Review from "../../components/movie-info/movie-review";
import Video from "../../components/movie-info/movie-video";
import "./style.css";

const MovieInfo = () => {

    const [fetchedData,setFetchedData] = useState(false);
    const selectedMovie = useSelector((state)=>state.movieInfo.selectedMovie);
    const dispatch = useDispatch();
    const {movieId} = useParams();


    useEffect(()=>{
        const fetchMovieDetails =  async () =>{

            
            try{
                if(!fetchedData){
                    const movieData= await fetchDetailApi(`movie/${movieId}`)
                    const movie = {
                        title: movieData.title,
                        backdrop:movieData.backdrop_path,
                        poster: movieData.poster_path,
                        release_date: movieData.release_date,
                        ratings: movieData.vote_average,
                        overview: movieData.overview,
                        runtime: movieData.runtime,
                        vote_count: movieData.vote_count
                    };
                    dispatch(setSelectedMovie(movie));
                    setFetchedData(true);
                }
            }catch(error){
                console.log("Error fetching data:",error);
            }
        }

        fetchMovieDetails()
    },[movieId,fetchedData,dispatch]);

    return (
        <>
            {selectedMovie && (
                <div className="movie-details-container p-4">
                    <div className="movie-details-card row">
                        <div className="image-bg-container">
                            <div className="image-bg" style={{backgroundImage:`url(https://image.tmdb.org/t/p/original${selectedMovie.backdrop})`}}></div>
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
                            <MovieCast />
                        </div>
                        <div className="my-5 py-5">
                            <h4>Movie Reviews</h4>
                            <div className="review-container">
                                <Review/>
                            </div>
                        </div>
                        <div className="details p-4 d-inline-flex">
                            <div className="movie-main-img col-6 ">
                                <Video/>
                            </div>
                            <div className="movie-main-img col-6 mx-4 my-2">
                                <MovieImages/>
                            </div>
                        </div>
                        <div className="more-movies">
                            <h4>More Like This</h4>
                            <div className="similer-movies-container">
                                <div className="similer-movie d-inline-flex my-4">
                                    <MovieSimilerCard />
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
