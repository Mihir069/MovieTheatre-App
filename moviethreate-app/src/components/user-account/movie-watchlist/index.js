import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setWatchList } from "../../../reducers/movieWatchListReducer";
import { Link } from "react-router-dom";
import ProgressBar from "../../common/progress-bar";
import "./style.css";
import { fetchWatchListApi } from "../../../services";

const MovieWatchList = () =>{
    const watchListMovies = useSelector((state)=>state.movieWatchList.watchList);
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchwatchListMovies = async() =>{
            try{
                const WatchListMovieData = await fetchWatchListApi(`account/20960400/watchlist/movies`);
                dispatch(setWatchList(WatchListMovieData));
            }catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };
        fetchwatchListMovies();
    },[dispatch]);
    return(
        <div className="favorite-movies pt-4">
            <h4>Watch List</h4>
            <div className="row">
                {
                    watchListMovies.map((watchMovie,index)=>(
                        <div key={index} className="col-md-3 mb-4">
                            <div className="movie p-3">
                                <div className="movie-poster">
                                    <Link to={`/movie/${watchMovie.id}`}>
                                        <img src={`https://image.tmdb.org/t/p/w500${watchMovie.backdrop_path}`} alt={watchMovie.name} />
                                    </Link>
                                </div>
                                <div className="movie-ratings">
                                    <ProgressBar stars={watchMovie.vote_average}/>
                                </div>
                                <div className="movie-name mt-2">
                                    <h6>{watchMovie.title || watchMovie.original_title}</h6>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default MovieWatchList;