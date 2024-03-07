import { Link, useParams } from "react-router-dom";
import ProgressBar from "../progress-bar";
import { fetchDetailApi } from "../../../services";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSimilerMovies } from "../../../reducers/movieInfoReducer";
import "./style.css";

const MovieSimilerCard = () => {
    const similerMovies = useSelector((state)=>state.movieInfo.similerMovies);
    const {movieId} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSimilarMovies = async () => {
            try {
                const similarData = await fetchDetailApi(`movie/${movieId}/similar`);
                const similar = similarData.results.map(item => ({
                    id: item.id,
                    title: item.original_title,
                    poster: item.backdrop_path,
                    ratings: item.vote_average,
                }));
                dispatch(setSimilerMovies(similar || []))
            } catch (error) {
                console.log("Error fetching similar movies:", error);
            }
        };

        fetchSimilarMovies();
    }, [movieId,dispatch]);

    return (
        <div className="d-inline-flex">
            {similerMovies.map((movie) => (
                <div key={movie.id} className="similar-movie-poster mx-2">
                    <Link to={`/movie/${movie.id}`}>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster}`} alt={movie.title} />
                    </Link>
                    <div className="movie-ratings">
                        <ProgressBar stars={movie.ratings} />
                    </div>
                    <div className="movie-name m-3">
                        <h6>{movie.title}</h6>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MovieSimilerCard;
